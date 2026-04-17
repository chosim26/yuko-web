# YUKO Web

> **YUKO. Your friend is here.**
> A Korean friend who plans your custom trip.

## 개발 실행

```bash
npm install
npm run dev
# → http://localhost:3000
```

## 프로덕션 빌드

```bash
npm run build
npm start
```

## Vercel 배포

### 1. GitHub push
```bash
git init
git add .
git commit -m "Initial YUKO landing"
git branch -M main
git remote add origin https://github.com/chosim26/yuko.git
git push -u origin main
```

### 2. Vercel 연결
1. https://vercel.com → New Project
2. Import `chosim26/yuko` repo
3. Framework 자동 감지: Next.js
4. Deploy → `yuko.vercel.app` 자동 생성
5. 나중에 커스텀 도메인 Project Settings → Domains에서 추가

## 브랜드 시스템

- **Name**: YUKO (Your + Korea 함축. 친구 이름처럼)
- **Tagline**: Your friend is here.
- **Colors**: P4 Obsidian & Neon
  - Obsidian `#0E0E12` (배경)
  - Neon Yellow `#F3F31A` (악센트)
  - Off-white `#F7F5F0` (텍스트)
  - Warm Grey `#5C5852` (서브)
- **Typography**:
  - Caveat (hero, 브랜드명)
  - Inter (본문, CTA)

## 다음 할 일

- [ ] Formspree 웹훅 URL 교체 (`app/page.tsx` 에서 `YOUR_ID`)
- [ ] Buddy 추가 프로필 채우기 (현재 Founder 1명 + Coming Soon 4)
- [ ] 창업자 스토리 본문 확장
- [ ] GA4·Meta·TikTok Pixel 삽입
- [ ] Vercel 배포
- [ ] 커스텀 도메인 연결 (나중)
