import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy — YUKO",
  description: "How YUKO collects, uses, and protects your personal information.",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#0E0E12]">
      <div className="mx-auto max-w-3xl px-6 py-16 md:py-24">
        <Link
          href="/"
          className="inline-block text-sm uppercase tracking-widest text-neutral-500 hover:text-[#0E0E12] mb-10"
        >
          ← YUKO
        </Link>

        <h1 className="text-4xl md:text-5xl font-semibold tracking-tight mb-3">
          Privacy Policy
        </h1>
        <p className="text-sm text-neutral-500 mb-12">
          Effective date: April 29, 2026
        </p>

        <div className="prose prose-neutral max-w-none space-y-8 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. Who we are</h2>
            <p>
              YUKO ("we", "us", "our") is a cultural experience coordination
              service operated by YUKO-seoul, based in Seoul, South Korea. This
              policy explains how we handle personal information collected
              through{" "}
              <a href="https://yukoseoul.com" className="underline">
                yukoseoul.com
              </a>{" "}
              and our communication channels (Instagram DM, email, WhatsApp).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              2. Information we collect
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Application form data:</strong> name, email, Instagram
                handle, planned arrival window, group size, and the experience
                preferences you submit.
              </li>
              <li>
                <strong>Communication content:</strong> messages you send us via
                Instagram, email, or WhatsApp.
              </li>
              <li>
                <strong>Technical data:</strong> IP address, browser, device
                type, pages viewed, referral source, and UTM parameters,
                collected through cookies and similar technologies.
              </li>
              <li>
                <strong>Advertising data:</strong> events from Meta Pixel and
                the Conversions API (page views, form submissions) that help us
                measure ad performance. We do not collect payment card details
                on this site.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">3. How we use it</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To match you with a Korean buddy and plan your day.</li>
              <li>To respond to your inquiries and confirm bookings.</li>
              <li>
                To send service-related updates (we will not send marketing
                emails unless you opt in).
              </li>
              <li>
                To measure and improve our website and advertising
                effectiveness.
              </li>
              <li>To comply with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">4. Sharing</h2>
            <p>
              We share the minimum information required with the matched Korean
              buddy so they can plan your day (typically your name, arrival
              window, and stated preferences). We use the following processors
              under their own privacy terms:
            </p>
            <ul className="list-disc pl-5 mt-3 space-y-1">
              <li>
                Vercel — website hosting (
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  className="underline"
                >
                  policy
                </a>
                ).
              </li>
              <li>
                Google (Apps Script, Sheets) — form storage (
                <a
                  href="https://policies.google.com/privacy"
                  className="underline"
                >
                  policy
                </a>
                ).
              </li>
              <li>
                Meta — advertising and analytics via Pixel and Conversions API (
                <a
                  href="https://www.facebook.com/privacy/policy"
                  className="underline"
                >
                  policy
                </a>
                ).
              </li>
            </ul>
            <p className="mt-3">
              We do not sell or rent personal information.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">5. Cookies and tracking</h2>
            <p>
              We use cookies and pixels to remember UTM parameters across the
              session, prevent fraud, and measure conversion. You can disable
              cookies in your browser, but parts of the site may not work as
              expected. Meta uses your data per its own policy linked above.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Your choices</h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>Access, correct, or delete:</strong> email{" "}
                <a href="mailto:hello@yukoseoul.com" className="underline">
                  hello@yukoseoul.com
                </a>{" "}
                with your request.
              </li>
              <li>
                <strong>Withdraw consent:</strong> you can ask us to stop
                processing your information at any time. We will retain only
                what we need for legal or recordkeeping purposes.
              </li>
              <li>
                <strong>Ad personalization:</strong> opt out via your Meta /
                Instagram ad settings or browser controls.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Retention</h2>
            <p>
              We keep application data for up to 24 months after your last
              interaction, unless you ask us to delete it sooner or unless we
              are required to keep it longer for legal reasons (e.g., tax,
              dispute resolution).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. International transfers
            </h2>
            <p>
              YUKO operates from South Korea. If you contact us from outside
              South Korea, your information may be transferred to and stored on
              servers located in South Korea, the United States, or other
              countries where our processors operate.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">9. Children</h2>
            <p>
              YUKO is intended for adults aged 20 and over. We do not knowingly
              collect information from anyone under 20.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Changes</h2>
            <p>
              We may update this policy. The effective date at the top will
              change, and we will post material updates on this page.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">11. Contact</h2>
            <p>
              Questions or requests:{" "}
              <a href="mailto:hello@yukoseoul.com" className="underline">
                hello@yukoseoul.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-16 pt-8 border-t border-neutral-200 text-sm text-neutral-500 flex gap-6">
          <Link href="/" className="hover:text-[#0E0E12]">
            Home
          </Link>
          <Link href="/terms" className="hover:text-[#0E0E12]">
            Terms of Service
          </Link>
        </div>
      </div>
    </main>
  );
}
