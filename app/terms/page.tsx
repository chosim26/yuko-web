import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service — YUKO",
  description: "The terms that govern your use of YUKO.",
};

export default function TermsOfService() {
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
          Terms of Service
        </h1>
        <p className="text-sm text-neutral-500 mb-12">
          Effective date: April 29, 2026
        </p>

        <div className="prose prose-neutral max-w-none space-y-8 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold mb-3">1. The service</h2>
            <p>
              YUKO is a cultural experience coordination service. We connect
              visitors and residents in Seoul with verified Korean friends
              ("buddies") who design a personalized day around your interests.
              YUKO does not operate as a tour operator, travel agency, or
              guiding company. Buddies are independent individuals who agree to
              spend time with you under YUKO&apos;s coordination.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">2. Eligibility</h2>
            <p>
              You must be at least 20 years old to apply. By submitting an
              application, you confirm that the information you provide is
              accurate and that you are using YUKO for personal,
              non-commercial purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              3. Application and matching
            </h2>
            <p>
              Applications go through manual review. We may decline a match for
              any reason, including limited availability, mismatch with our
              buddy roster, or safety concerns. Acceptance is confirmed by us
              in writing (Instagram DM, email, or WhatsApp).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              4. Pricing and payment
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                Half-day from US$129 / Full-day from US$219 / 2-day from
                US$349 (per group, up to 2 people; final price confirmed in
                writing before payment).
              </li>
              <li>
                We collect payment after a match is confirmed and before the
                experience date, via the payment link we send you.
              </li>
              <li>
                Out-of-pocket costs during the day (food, drinks, tickets,
                transit, etc.) are split equally between you and your buddy
                ("Pure Dutch"). YUKO does not include those costs in the
                base price.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              5. Cancellation and refunds
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <strong>By you, more than 7 days before:</strong> full refund
                minus any payment-processor fee.
              </li>
              <li>
                <strong>By you, 3–7 days before:</strong> 50% refund.
              </li>
              <li>
                <strong>By you, less than 3 days before:</strong> no refund.
              </li>
              <li>
                <strong>By us:</strong> if we cannot fulfill the match (e.g.,
                buddy emergency), we will reschedule or refund in full.
              </li>
              <li>
                Force majeure events (severe weather, government order,
                emergencies) will be handled in good faith and may result in
                rescheduling rather than refund.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">6. Conduct</h2>
            <p>
              You agree to behave respectfully and lawfully. You will not ask
              your buddy to engage in unlawful, unsafe, or sexual activities.
              YUKO can end the experience early without refund if you breach
              this clause, and may report serious incidents to authorities.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">7. Buddies</h2>
            <p>
              Buddies are independent individuals, not YUKO employees. We
              verify identity and conduct light background checks, but we do
              not guarantee the personality fit, language fluency, or
              specific recommendations a buddy makes. You are responsible for
              your own decisions during the experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              8. Intellectual property
            </h2>
            <p>
              The YUKO name, logo, website content, and photographs belong to
              us. You may share screenshots and photos for personal use. For
              commercial use, contact us first.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              9. Limitation of liability
            </h2>
            <p>
              YUKO&apos;s total liability for any claim arising from the
              service is capped at the amount you paid for that booking. We
              are not liable for indirect, incidental, or consequential
              damages, or for events outside our reasonable control. Nothing
              in these terms excludes liability that cannot be excluded under
              applicable law.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">10. Insurance</h2>
            <p>
              We strongly recommend that you carry travel and personal
              accident insurance. YUKO does not provide insurance coverage to
              clients.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">
              11. Governing law and disputes
            </h2>
            <p>
              These terms are governed by the laws of the Republic of Korea.
              Disputes will be handled in good faith first; unresolved
              disputes go to the Seoul Central District Court.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">12. Changes</h2>
            <p>
              We may update these terms. The effective date at the top will
              change, and material updates will be posted on this page. Your
              continued use of YUKO after a change means you accept the new
              terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold mb-3">13. Contact</h2>
            <p>
              Questions:{" "}
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
          <Link href="/privacy" className="hover:text-[#0E0E12]">
            Privacy Policy
          </Link>
        </div>
      </div>
    </main>
  );
}
