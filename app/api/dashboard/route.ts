import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const META_TOKEN = process.env.META_ACCESS_TOKEN || "EAFeZAUddMeuQBQwE2yYK0ZCsuH6eiCdyEk6pt8vZA0h4XjDEAuJK9St7DG0ZA8k7chi6fhZAKXaYOTTNLSIZB9X7t5w6jqrv2KRd4dAZAiu3q84rRCVIZA4KcpOZBEVg1BDYi3nZBbvfOhOh11WBcJlQTqP6SZBUklIrhxKOtGEV0BNqEROT5pMB4J9M19Pxnvl8WHgZAgZDZD";
const AD_ACCOUNT = "act_1871029536941706";
const META = "https://graph.facebook.com/v21.0";
const SHEETS_URL = "https://script.google.com/macros/s/AKfycbw3aBcoWlv6iQPYSClCYbwVJFfqB3AN6eZbpLoJ0e0ejYYw1L96mDbYzy1eXbziASnJ/exec";
const SHEETS_KEY = "yuko_dash_2026";

const ADSET_LABELS: Record<string, string> = {
  "InKorea-Foreigners-EN": "InKorea (한국내 외국인)",
  "AdSet-JP-일본 (Japanese)": "Japan (일본)",
  "AdSet-CN-중국 (Chinese)": "China (중국)",
  "AdSet-US-영미권 (English)": "US/UK (영미권)",
};
const ADSET_COLORS: Record<string, string> = {
  "InKorea (한국내 외국인)": "#FF6B6B",
  "Japan (일본)": "#4ECDC4",
  "China (중국)": "#FFE66D",
  "US/UK (영미권)": "#6C5CE7",
};

type Action = { action_type: string; value: string };
type InsightRow = {
  impressions?: string; clicks?: string; spend?: string;
  cpc?: string; ctr?: string; actions?: Action[];
  adset_name?: string; ad_name?: string; date_start?: string;
};

function xact(actions: Action[] | undefined, t: string): number {
  return parseInt(actions?.find(a => a.action_type === t)?.value || "0");
}

async function metaGet(endpoint: string, params: Record<string, string> = {}) {
  params.access_token = META_TOKEN;
  const qs = new URLSearchParams(params).toString();
  const r = await fetch(`${META}/${endpoint}?${qs}`, { cache: "no-store" });
  return r.json();
}

const START_DATE = "2026-04-19"; // 본격 집행 시작일 — 이 날짜 이전 데이터는 집계에서 제외

function fixedRange() {
  const now = new Date();
  const untilStr = now.toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
  return JSON.stringify({ since: START_DATE, until: untilStr });
}

function daysSince(start: string): number {
  const now = new Date();
  const todayStr = now.toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" });
  const ms = new Date(todayStr + "T00:00:00Z").getTime() - new Date(start + "T00:00:00Z").getTime();
  return Math.max(1, Math.floor(ms / 86400000) + 1);
}

export async function GET() {
  const days = daysSince(START_DATE);
  const now = new Date();
  const nowStr = now.toLocaleString("ko-KR", { timeZone: "Asia/Seoul" });
  const todayStr = now.toLocaleDateString("en-CA", { timeZone: "Asia/Seoul" }); // YYYY-MM-DD

  // Fetch all data in parallel
  const [todayMeta, adsets, adsData, dailyData, dailyAdset, sheetsSummary, sheetsLeads] = await Promise.all([
    metaGet(`${AD_ACCOUNT}/insights`, { fields: "impressions,clicks,spend,cpc,ctr,actions", date_preset: "today" }),
    metaGet(`${AD_ACCOUNT}/insights`, { fields: "adset_name,impressions,clicks,spend,cpc,ctr,actions", level: "adset", time_range: fixedRange() }),
    metaGet(`${AD_ACCOUNT}/insights`, { fields: "ad_name,adset_name,impressions,clicks,spend,cpc,ctr,actions", level: "ad", time_range: fixedRange(), limit: "50" }),
    metaGet(`${AD_ACCOUNT}/insights`, { fields: "impressions,clicks,spend,cpc,ctr,actions", time_increment: "1", time_range: fixedRange() }),
    metaGet(`${AD_ACCOUNT}/insights`, { fields: "adset_name,impressions,clicks,spend,cpc,ctr,actions", level: "adset", time_increment: "1", time_range: fixedRange(), limit: "200" }),
    fetch(`${SHEETS_URL}?key=${SHEETS_KEY}&action=summary`, { cache: "no-store" }).then(r => r.json()).catch(() => ({ total_leads: 0, by_date: {}, by_vibe: {}, by_contact_method: {}, by_utm_source: {}, by_utm_campaign: {} })),
    fetch(`${SHEETS_URL}?key=${SHEETS_KEY}&action=leads`, { cache: "no-store" }).then(r => r.json()).catch(() => ({ leads: [] })),
  ]);

  // Today
  const t: InsightRow = todayMeta?.data?.[0] || {};
  const tImp = parseInt(t.impressions || "0");
  const tClk = parseInt(t.clicks || "0");
  const tSpend = parseInt(String(parseFloat(t.spend || "0")));
  const tCtr = parseFloat(t.ctr || "0");
  const tLc = xact(t.actions, "link_click");
  const tLpv = xact(t.actions, "landing_page_view");

  // Sheets — START_DATE 이전 데이터는 모두 제외
  const rawLeadsByDate: Record<string, number> = sheetsSummary.by_date || {};
  const leadsByDate: Record<string, number> = Object.fromEntries(
    Object.entries(rawLeadsByDate).filter(([k]) => k >= START_DATE)
  );

  // leadList: date 필드가 Korean locale (예: "2026. 4. 21. 오전 7:02:28"). YYYY-MM-DD로 변환 후 필터.
  const parseLeadDate = (d: string): string => {
    const m = d.match(/(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})/);
    if (!m) return "";
    return `${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`;
  };
  const rawLeadList = sheetsLeads.leads || [];
  const leadList = rawLeadList.filter((l: { date: string }) => {
    const d = parseLeadDate(l.date);
    return d && d >= START_DATE;
  });

  // 필터된 리스트로 집계 재계산
  const totalLeads = leadList.length;
  const leadsByVibe: Record<string, number> = {};
  const leadsByContact: Record<string, number> = {};
  const leadsByUtmSource: Record<string, number> = {};
  for (const l of leadList as Array<{ vibes?: string; contact_method?: string; utm_source?: string }>) {
    for (const v of (l.vibes || "").split(",").map(x => x.trim()).filter(Boolean)) {
      leadsByVibe[v] = (leadsByVibe[v] || 0) + 1;
    }
    const cm = (l.contact_method || "").trim();
    if (cm) leadsByContact[cm] = (leadsByContact[cm] || 0) + 1;
    const us = (l.utm_source || "").trim() || "직접/미확인";
    leadsByUtmSource[us] = (leadsByUtmSource[us] || 0) + 1;
  }
  const sortedLeadDates = Object.keys(leadsByDate).sort();
  const firstLead = sortedLeadDates[0] || "—";
  const lastLead = sortedLeadDates[sortedLeadDates.length - 1] || "—";
  const todayLeads = leadsByDate[todayStr] || 0;

  // AdSet rows
  const adsetRows = (adsets?.data || []).map((r: InsightRow) => ({
    name: ADSET_LABELS[r.adset_name || ""] || r.adset_name,
    impressions: parseInt(r.impressions || "0"),
    clicks: parseInt(r.clicks || "0"),
    linkClicks: xact(r.actions, "link_click"),
    lpv: xact(r.actions, "landing_page_view"),
    spend: parseInt(String(parseFloat(r.spend || "0"))),
    cpc: parseFloat(r.cpc || "0"),
    ctr: parseFloat(r.ctr || "0"),
  })).sort((a: { spend: number }, b: { spend: number }) => b.spend - a.spend);

  const totalImp = adsetRows.reduce((s: number, r: { impressions: number }) => s + r.impressions, 0);
  const totalLc = adsetRows.reduce((s: number, r: { linkClicks: number }) => s + r.linkClicks, 0);
  const totalLpv = adsetRows.reduce((s: number, r: { lpv: number }) => s + r.lpv, 0);
  const totalSpend = adsetRows.reduce((s: number, r: { spend: number }) => s + r.spend, 0);
  const totalClicks = adsetRows.reduce((s: number, r: { clicks: number }) => s + r.clicks, 0);
  const totalCtr = totalImp ? (totalClicks / totalImp * 100) : 0;
  const totalCpc = totalLc ? (totalSpend / totalLc) : 0;
  const realCac = totalLeads ? (totalSpend / totalLeads) : 0;

  // Ad rows
  const adRows = (adsData?.data || []).map((r: InsightRow) => ({
    name: r.ad_name,
    adset: ADSET_LABELS[r.adset_name || ""] || r.adset_name,
    impressions: parseInt(r.impressions || "0"),
    linkClicks: xact(r.actions, "link_click"),
    spend: parseInt(String(parseFloat(r.spend || "0"))),
    ctr: parseFloat(r.ctr || "0"),
    cpc: parseFloat(r.cpc || "0"),
  })).sort((a: { ctr: number }, b: { ctr: number }) => b.ctr - a.ctr);

  // Daily
  const sortedDaily = (dailyData?.data || []).sort((a: InsightRow, b: InsightRow) => (a.date_start || "").localeCompare(b.date_start || ""));
  const dailyDates = sortedDaily.map((r: InsightRow) => (r.date_start || "").slice(5));
  const dailySpends = sortedDaily.map((r: InsightRow) => parseInt(String(parseFloat(r.spend || "0"))));
  const dailyClicks = sortedDaily.map((r: InsightRow) => parseInt(r.clicks || "0"));
  const dailyCtrs = sortedDaily.map((r: InsightRow) => parseFloat(parseFloat(r.ctr || "0").toFixed(1)));
  const dailyLeadsArr = sortedDaily.map((r: InsightRow) => leadsByDate[r.date_start || ""] || 0);

  // Daily adset stacked
  const adsetDaily: Record<string, Record<string, number>> = {};
  for (const r of (dailyAdset?.data || [])) {
    const name = ADSET_LABELS[r.adset_name] || r.adset_name;
    const date = (r.date_start || "").slice(5);
    if (!adsetDaily[name]) adsetDaily[name] = {};
    adsetDaily[name][date] = parseInt(String(parseFloat(r.spend || "0")));
  }
  const adsetDatasetsJs = Object.entries(adsetDaily).map(([name, dates]) => {
    const color = ADSET_COLORS[name] || "#999";
    const values = dailyDates.map((d: string) => dates[d] || 0);
    return `{label:'${name}',data:${JSON.stringify(values)},backgroundColor:'${color}'}`;
  }).join(",\n");

  // Funnel rates
  const fCr1 = totalImp ? (totalLc / totalImp * 100) : 0;
  const fCr2 = totalLc ? (totalLpv / totalLc * 100) : 0;
  const fCr3 = totalLpv ? (totalLeads / totalLpv * 100) : 0;

  // Vibe data
  const vibeLabels = JSON.stringify(Object.keys(leadsByVibe));
  const vibeValues = JSON.stringify(Object.values(leadsByVibe));
  const contactLabels = JSON.stringify(Object.keys(leadsByContact));
  const contactValues = JSON.stringify(Object.values(leadsByContact));
  const utmLabels = JSON.stringify(Object.keys(leadsByUtmSource));
  const utmValues = JSON.stringify(Object.values(leadsByUtmSource));

  const cacColor = realCac === 0 ? "#f87171" : (realCac < 30000 ? "#4ade80" : "#fbbf24");

  // AdSet table
  const adsetTable = adsetRows.map((r: { name: string; impressions: number; linkClicks: number; lpv: number; spend: number; cpc: number; ctr: number }) => {
    const bw = totalSpend ? (r.spend / totalSpend * 100) : 0;
    const badge = r.ctr >= 3 ? "good" : (r.ctr < 1.5 ? "bad" : "ok");
    return `<tr><td><strong>${r.name}</strong></td><td>${r.impressions.toLocaleString()}</td><td>${r.linkClicks}</td><td>${r.lpv}</td><td>${r.spend.toLocaleString()}원</td><td>${r.cpc.toFixed(0)}원</td><td><span class="badge ${badge}">${r.ctr.toFixed(1)}%</span></td><td><div class="bar-bg"><div class="bar-fill" style="width:${bw.toFixed(0)}%"></div></div></td></tr>`;
  }).join("");

  // Ad table
  const adTable = adRows.map((r: { name: string; adset: string; impressions: number; linkClicks: number; spend: number; ctr: number; cpc: number }) => {
    const badge = r.ctr >= 3 ? "good" : (r.ctr < 1.5 ? "bad" : "ok");
    return `<tr><td>${r.name}</td><td class="dim">${r.adset}</td><td>${r.impressions.toLocaleString()}</td><td>${r.linkClicks}</td><td>${r.spend.toLocaleString()}원</td><td><span class="badge ${badge}">${r.ctr.toFixed(1)}%</span></td><td>${r.cpc.toFixed(0)}원</td></tr>`;
  }).join("");

  // Lead table
  const leadTable = [...leadList].reverse().slice(0, 20).map((l: { date: string; name: string; contact_method: string; vibes: string; utm_source: string; utm_campaign: string }) => {
    const src = l.utm_source || "직접/미확인";
    return `<tr><td>${l.date}</td><td>${l.name}</td><td>${l.contact_method}</td><td>${l.vibes}</td><td>${src}</td></tr>`;
  }).join("");

  const leadDateLabels = JSON.stringify(Object.keys(leadsByDate).sort());
  const leadDateValues = JSON.stringify(Object.keys(leadsByDate).sort().map(k => leadsByDate[k]));

  // Daily log table
  let runningSpend = 0;
  let runningLeads = 0;
  const dailyLogTable = sortedDaily.map((r: InsightRow) => {
    const date = r.date_start || "";
    const imp = parseInt(r.impressions || "0");
    const clk = parseInt(r.clicks || "0");
    const lc = xact(r.actions, "link_click");
    const lpv = xact(r.actions, "landing_page_view");
    const spend = parseInt(String(parseFloat(r.spend || "0")));
    const ctr = parseFloat(r.ctr || "0");
    const cpc = lc ? (spend / lc) : 0;
    const leads = leadsByDate[date] || 0;
    const dayCac = leads ? (spend / leads) : 0;
    runningSpend += spend;
    runningLeads += leads;
    const cumCac = runningLeads ? (runningSpend / runningLeads) : 0;
    const ctrBadge = ctr >= 3 ? "good" : (ctr < 1.5 ? "bad" : "ok");
    const leadCell = leads > 0 ? `<span style="color:#4ade80;font-weight:700">${leads}</span>` : `<span style="color:#555">0</span>`;
    return `<tr>
      <td><strong>${date.slice(5)}</strong></td>
      <td>${imp.toLocaleString()}</td>
      <td>${lc}</td>
      <td>${lpv}</td>
      <td>${spend.toLocaleString()}원</td>
      <td><span class="badge ${ctrBadge}">${ctr.toFixed(1)}%</span></td>
      <td>${cpc ? cpc.toFixed(0) + "원" : "-"}</td>
      <td>${leadCell}</td>
      <td>${dayCac ? dayCac.toLocaleString(undefined, {maximumFractionDigits:0}) + "원" : "-"}</td>
      <td style="color:#888">${runningSpend.toLocaleString()}원</td>
      <td style="color:#888">${runningLeads}</td>
      <td style="color:${cumCac && cumCac < 30000 ? '#4ade80' : '#fbbf24'}">${cumCac ? cumCac.toLocaleString(undefined, {maximumFractionDigits:0}) + "원" : "∞"}</td>
    </tr>`;
  }).join("");

  const html = `<!DOCTYPE html>
<html lang="ko">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>YUKO 대시보드</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.0/dist/chart.umd.min.js"></script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0a0a0a;color:#e0e0e0;padding:24px}
.hdr{display:flex;justify-content:space-between;align-items:center;margin-bottom:32px}
.hdr h1{font-size:28px;color:#F3F31A}
.hdr .meta{color:#888;font-size:13px}
.grid{display:grid;gap:16px;margin-bottom:32px}
.g8{grid-template-columns:repeat(auto-fit,minmax(150px,1fr))}
.g2{grid-template-columns:1fr 1fr}
.card{background:#161616;border:1px solid #2a2a2a;border-radius:12px;padding:20px}
.card .lbl{font-size:11px;color:#888;text-transform:uppercase;letter-spacing:1px;margin-bottom:4px}
.card .val{font-size:26px;font-weight:700;color:#fff}
.card .desc{font-size:10px;color:#555;margin-top:4px;line-height:1.4}
.card.hi{border-color:#F3F31A33}.card.hi .val{color:#F3F31A}
.card.green{border-color:#4ade8033}.card.green .val{color:#4ade80}
.section{margin-bottom:36px}
.section h2{font-size:18px;margin-bottom:16px;color:#ccc;border-bottom:1px solid #222;padding-bottom:8px}
.chart-box{background:#161616;border:1px solid #2a2a2a;border-radius:12px;padding:20px}
.chart-box h3{font-size:13px;color:#888;margin-bottom:12px}
.chart-box canvas{width:100%!important;height:250px!important}
table{width:100%;border-collapse:collapse;font-size:13px}
th{text-align:left;padding:10px 12px;color:#888;border-bottom:2px solid #222;font-size:11px}
td{padding:10px 12px;border-bottom:1px solid #1a1a1a}
tr:hover{background:#1a1a1a}
.badge{padding:3px 8px;border-radius:4px;font-weight:600;font-size:12px}
.badge.good{background:#1a3a2a;color:#4ade80}.badge.ok{background:#3a3a1a;color:#fbbf24}.badge.bad{background:#3a1a1a;color:#f87171}
.dim{color:#666}
.bar-bg{background:#222;border-radius:4px;height:8px;width:100px}.bar-fill{background:#F3F31A;border-radius:4px;height:8px;min-width:2px}
.funnel{display:flex;align-items:center;gap:0;justify-content:center;flex-wrap:wrap;margin:20px 0}
.funnel-step{text-align:center;padding:16px 20px;background:#161616;border:1px solid #2a2a2a;min-width:100px}
.funnel-step:first-child{border-radius:12px 0 0 12px}.funnel-step:last-child{border-radius:0 12px 12px 0}
.funnel-step .num{font-size:22px;font-weight:700;color:#fff}.funnel-step .fn{font-size:10px;color:#888;margin-top:4px}
.arrow{color:#444;font-size:18px;padding:0 2px}.arrow .rate{font-size:10px;color:#F3F31A;display:block;margin-top:-6px}
.cac-box{background:linear-gradient(135deg,#1a0a0a,#0a0a0a);border:1px solid ${cacColor}33;border-radius:12px;padding:24px;text-align:center;margin-top:16px}
.cac-box .val{font-size:40px;font-weight:700;color:${cacColor}}.cac-box .lbl{font-size:12px;color:#888;margin-top:4px}
.today{background:linear-gradient(135deg,#1a1a00,#0a0a0a);border:1px solid #F3F31A33;border-radius:12px;padding:20px;margin-bottom:32px}
.today h2{color:#F3F31A;font-size:16px;margin-bottom:12px}
.today-row{display:flex;gap:32px;flex-wrap:wrap}
.today-kpi .v{font-size:22px;font-weight:700;color:#fff}.today-kpi .l{font-size:11px;color:#888}
.lead-strip{background:linear-gradient(135deg,#0a1a0a,#0a0a0a);border:1px solid #4ade8033;border-radius:12px;padding:20px;margin-bottom:32px}
.lead-strip h2{color:#4ade80;font-size:16px;margin-bottom:12px}
.refresh-note{text-align:center;color:#555;font-size:12px;margin-bottom:24px}
@media(max-width:768px){.g2{grid-template-columns:1fr}.g8{grid-template-columns:repeat(2,1fr)}}
</style>
</head>
<body>

<div class="hdr">
    <h1>yuko. 대시보드</h1>
    <div class="meta">${nowStr} 기준 · ${START_DATE} ~ ${todayStr} (${days}일) · 새로고침하면 업데이트</div>
</div>
<div class="refresh-note">이 페이지를 새로고침(F5)하면 항상 최신 데이터로 업데이트됩니다</div>

<!-- 오늘 -->
<div class="today">
    <h2>오늘 실시간</h2>
    <div class="today-row">
        <div class="today-kpi"><div class="v">${tImp.toLocaleString()}</div><div class="l">노출수</div></div>
        <div class="today-kpi"><div class="v">${tClk}</div><div class="l">클릭수</div></div>
        <div class="today-kpi"><div class="v">${tLc}</div><div class="l">링크 클릭</div></div>
        <div class="today-kpi"><div class="v">${tLpv}</div><div class="l">랜딩 도착<br><span style="font-size:9px;color:#555">페이지 로드 완료</span></div></div>
        <div class="today-kpi"><div class="v">${tSpend.toLocaleString()}원</div><div class="l">지출</div></div>
        <div class="today-kpi"><div class="v">${tCtr.toFixed(1)}%</div><div class="l">CTR (클릭률)</div></div>
        <div class="today-kpi" style="border-left:2px solid #4ade80;padding-left:16px"><div class="v" style="color:#4ade80">${todayLeads}</div><div class="l">오늘 신청자</div></div>
    </div>
</div>

<!-- 실제 신청자 -->
<div class="lead-strip">
    <h2>실제 폼 신청자 (Google Sheets)</h2>
    <div class="today-row">
        <div class="today-kpi"><div class="v" style="color:#4ade80">${totalLeads}</div><div class="l">총 신청자 수</div></div>
        <div class="today-kpi"><div class="v">${firstLead}</div><div class="l">첫 신청</div></div>
        <div class="today-kpi"><div class="v">${lastLead}</div><div class="l">최근 신청</div></div>
        <div class="today-kpi"><div class="v">${realCac ? realCac.toLocaleString(undefined, { maximumFractionDigits: 0 }) + "원" : "∞"}</div><div class="l">실제 CAC<br><span style="font-size:9px;color:#555">총지출÷신청자수</span></div></div>
    </div>
</div>

<!-- 핵심 지표 -->
<div class="grid g8">
    <div class="card hi"><div class="lbl">총 지출</div><div class="val">${totalSpend.toLocaleString()}원</div><div class="desc">${START_DATE} 이후 광고비 합계 (${days}일)</div></div>
    <div class="card"><div class="lbl">노출수</div><div class="val">${totalImp.toLocaleString()}</div><div class="desc">광고가 화면에 보인 횟수</div></div>
    <div class="card"><div class="lbl">링크 클릭</div><div class="val">${totalLc.toLocaleString()}</div><div class="desc">광고 눌러서 사이트로 온 수</div></div>
    <div class="card"><div class="lbl">랜딩 도착</div><div class="val">${totalLpv.toLocaleString()}</div><div class="desc">사이트 페이지 로드 완료</div></div>
    <div class="card"><div class="lbl">클릭당 비용</div><div class="val">${totalCpc.toFixed(0)}원</div><div class="desc">1클릭에 드는 광고비</div></div>
    <div class="card"><div class="lbl">클릭률 (CTR)</div><div class="val">${totalCtr.toFixed(1)}%</div><div class="desc">본 사람 중 클릭한 비율. 3%+면 좋음</div></div>
    <div class="card green"><div class="lbl">실제 신청자</div><div class="val">${totalLeads}</div><div class="desc">폼 제출 완료한 사람 수</div></div>
    <div class="card hi"><div class="lbl">실제 CAC</div><div class="val">${realCac ? realCac.toLocaleString(undefined, { maximumFractionDigits: 0 }) + "원" : "∞"}</div><div class="desc">신청자 1명 데려오는 비용</div></div>
</div>

<!-- 전환 퍼널 -->
<div class="section">
    <h2>전환 퍼널 — 광고 노출부터 실제 신청까지</h2>
    <p style="color:#666;font-size:12px;margin-bottom:12px">각 단계에서 몇 %가 다음 단계로 넘어가는지 보여줍니다</p>
    <div class="funnel">
        <div class="funnel-step"><div class="num">${totalImp.toLocaleString()}</div><div class="fn">노출</div></div>
        <div class="arrow">→<span class="rate">${fCr1.toFixed(1)}%</span></div>
        <div class="funnel-step"><div class="num">${totalLc.toLocaleString()}</div><div class="fn">링크 클릭</div></div>
        <div class="arrow">→<span class="rate">${fCr2.toFixed(1)}%</span></div>
        <div class="funnel-step"><div class="num">${totalLpv.toLocaleString()}</div><div class="fn">랜딩 도착</div></div>
        <div class="arrow">→<span class="rate">${fCr3.toFixed(1)}%</span></div>
        <div class="funnel-step" style="border-color:#4ade8055"><div class="num" style="color:#4ade80">${totalLeads}</div><div class="fn">실제 신청</div></div>
    </div>
    <div class="cac-box">
        <div class="val">${realCac ? realCac.toLocaleString(undefined, { maximumFractionDigits: 0 }) + "원" : "∞"}</div>
        <div class="lbl">실제 CAC (총 광고비 ÷ 실제 폼 신청자 수)</div>
    </div>
</div>

<!-- 차트 1행 -->
<div class="grid g2">
    <div class="chart-box"><h3>일별 지출 + 신청자 수</h3><canvas id="spendLeadChart"></canvas></div>
    <div class="chart-box"><h3>일별 클릭률 (CTR)</h3><canvas id="ctrChart"></canvas></div>
</div>

<!-- 차트 2행 -->
<div class="grid g2" style="margin-top:16px">
    <div class="chart-box"><h3>마켓별 지출 비중</h3><canvas id="stackedChart"></canvas></div>
    <div class="chart-box"><h3>신청자 관심사 (Vibes)</h3><canvas id="vibeChart"></canvas></div>
</div>

<!-- 차트 3행 -->
<div class="grid g2" style="margin-top:16px">
    <div class="chart-box"><h3>연락 방법</h3><canvas id="contactChart"></canvas></div>
    <div class="chart-box"><h3>유입 경로 (UTM)</h3><canvas id="utmChart"></canvas></div>
</div>

<!-- 일별 핵심지표 로그 -->
<div class="section" style="margin-top:32px">
    <h2>일별 핵심지표 로그</h2>
    <p style="color:#666;font-size:12px;margin-bottom:12px">매일 쌓이는 광고 성과 + 실제 신청자 데이터. 누적 CAC 트렌드를 봐야 합니다.</p>
    <div style="overflow-x:auto">
    <table>
        <tr>
            <th>날짜</th><th>노출</th><th>링크클릭</th><th>랜딩도착</th><th>지출</th>
            <th>클릭률</th><th>클릭당비용</th><th>신청자</th><th>당일CAC</th>
            <th style="color:#666">누적지출</th><th style="color:#666">누적신청</th><th style="color:#666">누적CAC</th>
        </tr>
        ${dailyLogTable}
        <tr style="border-top:2px solid #F3F31A33;font-weight:700;background:#1a1a00">
            <td>합계</td>
            <td>${totalImp.toLocaleString()}</td>
            <td>${totalLc}</td>
            <td>${totalLpv}</td>
            <td>${totalSpend.toLocaleString()}원</td>
            <td>${totalCtr.toFixed(1)}%</td>
            <td>${totalCpc.toFixed(0)}원</td>
            <td style="color:#4ade80">${totalLeads}</td>
            <td></td>
            <td></td>
            <td></td>
            <td style="color:${cacColor}">${realCac ? realCac.toLocaleString(undefined, {maximumFractionDigits:0}) + "원" : "∞"}</td>
        </tr>
    </table>
    </div>
</div>

<!-- 마켓별 성과 -->
<div class="section" style="margin-top:32px">
    <h2>마켓별 성과</h2>
    <p style="color:#666;font-size:12px;margin-bottom:12px">어느 나라/세그먼트가 효율이 좋은지 비교</p>
    <table>
        <tr><th>마켓</th><th>노출</th><th>링크클릭</th><th>랜딩도착</th><th>지출</th><th>클릭당비용</th><th>클릭률</th><th>비중</th></tr>
        ${adsetTable}
        <tr style="border-top:2px solid #333;font-weight:700"><td>합계</td><td>${totalImp.toLocaleString()}</td><td>${totalLc}</td><td>${totalLpv}</td><td>${totalSpend.toLocaleString()}원</td><td>${totalCpc.toFixed(0)}원</td><td>${totalCtr.toFixed(1)}%</td><td></td></tr>
    </table>
</div>

<!-- 광고별 성과 -->
<div class="section">
    <h2>광고 소재별 성과</h2>
    <p style="color:#666;font-size:12px;margin-bottom:12px">어떤 소재가 클릭률이 높은지 — 높을수록 좋은 소재</p>
    <table>
        <tr><th>광고명</th><th>마켓</th><th>노출</th><th>링크클릭</th><th>지출</th><th>클릭률</th><th>클릭당비용</th></tr>
        ${adTable}
    </table>
</div>

<!-- 최근 신청자 -->
<div class="section">
    <h2>최근 신청자 (이름 가림)</h2>
    <table>
        <tr><th>날짜</th><th>이름</th><th>연락방법</th><th>관심사</th><th>유입경로</th></tr>
        ${leadTable}
    </table>
</div>

<div style="text-align:center;color:#444;font-size:11px;margin-top:40px;padding:20px">
    YUKO 대시보드 v2 · Meta Ads API + Google Sheets · ${nowStr}
</div>

<script>
const dates=${JSON.stringify(dailyDates)};
const spends=${JSON.stringify(dailySpends)};
const ctrs=${JSON.stringify(dailyCtrs)};
const dLeads=${JSON.stringify(dailyLeadsArr)};

const base={responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{x:{ticks:{color:'#666'},grid:{color:'#1a1a1a'}},y:{ticks:{color:'#666'},grid:{color:'#1a1a1a'}}}};

new Chart(document.getElementById('spendLeadChart'),{type:'bar',data:{labels:dates,datasets:[
  {label:'지출(원)',data:spends,backgroundColor:'#F3F31A88',borderRadius:4,yAxisID:'y'},
  {label:'신청자',data:dLeads,type:'line',borderColor:'#4ade80',backgroundColor:'#4ade8022',pointRadius:5,pointBackgroundColor:'#4ade80',yAxisID:'y1',tension:0.3}
]},options:{...base,plugins:{legend:{display:true,labels:{color:'#888',font:{size:11}}}},scales:{x:{ticks:{color:'#666'},grid:{color:'#1a1a1a'}},y:{position:'left',ticks:{color:'#666'},grid:{color:'#1a1a1a'}},y1:{position:'right',ticks:{color:'#4ade80'},grid:{drawOnChartArea:false}}}}});

new Chart(document.getElementById('ctrChart'),{type:'line',data:{labels:dates,datasets:[{data:ctrs,borderColor:'#4ECDC4',backgroundColor:'#4ECDC422',fill:true,tension:0.3}]},options:base});

new Chart(document.getElementById('stackedChart'),{type:'bar',data:{labels:dates,datasets:[${adsetDatasetsJs}]},options:{...base,plugins:{legend:{display:true,labels:{color:'#888',font:{size:11}}}},scales:{x:{stacked:true,ticks:{color:'#666'},grid:{color:'#1a1a1a'}},y:{stacked:true,ticks:{color:'#666'},grid:{color:'#1a1a1a'}}}}});

new Chart(document.getElementById('vibeChart'),{type:'doughnut',data:{labels:${vibeLabels},datasets:[{data:${vibeValues},backgroundColor:['#FF6B6B','#4ECDC4','#FFE66D','#6C5CE7','#A8E6CF','#FF8B94','#FFDAC1','#B5EAD7']}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:true,position:'right',labels:{color:'#ccc',font:{size:11}}}}}});

new Chart(document.getElementById('contactChart'),{type:'bar',data:{labels:${contactLabels},datasets:[{data:${contactValues},backgroundColor:['#6C5CE7','#FF6B6B','#4ECDC4','#FFE66D'],borderRadius:8}]},options:base});

new Chart(document.getElementById('utmChart'),{type:'bar',data:{labels:${utmLabels},datasets:[{data:${utmValues},backgroundColor:['#F3F31A','#4ECDC4','#FF6B6B','#6C5CE7'],borderRadius:8}]},options:base});
</script>
</body>
</html>`;

  return new NextResponse(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
