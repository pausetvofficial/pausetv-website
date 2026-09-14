import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Privacy Policy — PauseTV",
  description:
    "Privacy Policy for PauseTV. Learn how we collect, use, and protect your personal information.",
  robots: "index, follow",
};

export default function PrivacyPage() {
  const lastUpdated = "September 2026";

  return (
    <>
      <section className="bg-black pt-32 pb-20 text-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeading eyebrow="Legal" title="Privacy Policy" light />
          <p className="mt-4 text-sm text-white/60">
            Last updated: {lastUpdated}
          </p>

          <div className="prose prose-invert mt-10 max-w-none space-y-6 text-white/80">
            <section>
              <h2 className="text-2xl font-bold text-white">Introduction</h2>
              <p>
                PauseTV ("we," "us," "our," or "Company") operates the
                pausetv.com website (the "Site"). We are committed to protecting
                your privacy. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you visit our
                Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">
                1. Information We Collect
              </h2>
              <p>
                We may collect information about you in a variety of ways. The
                information we may collect on the Site includes:
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li>
                  <strong>Personal Data</strong>: Email address when you
                  subscribe to our newsletter or contact us.
                </li>
                <li>
                  <strong>Device Information</strong>: Browser type, IP address,
                  and operating system.
                </li>
                <li>
                  <strong>Usage Data</strong>: Pages visited, time spent on
                  pages, and interactions with content.
                </li>
                <li>
                  <strong>Cookies</strong>: We use cookies to enhance your
                  experience.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">
                2. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="list-inside list-disc space-y-2">
                <li>Provide, maintain, and improve our Site and services</li>
                <li>
                  Send you newsletters, updates, and promotional materials
                </li>
                <li>Respond to your inquiries and customer support requests</li>
                <li>Analyze usage patterns to improve user experience</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">
                3. Sharing Your Information
              </h2>
              <p>
                We do not sell, trade, or rent your personal information to
                third parties. We may share your information with:
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li>Service providers who assist us in operating our Site</li>
                <li>Legal authorities when required by law</li>
                <li>Business partners with your consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">
                4. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures
                to protect your personal information against unauthorized
                access, alteration, disclosure, or destruction. However, no
                method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">
                5. Cookies and Tracking
              </h2>
              <p>
                We use cookies and similar tracking technologies to enhance your
                experience. You can control cookie settings through your
                browser. We also use Google Analytics to understand how you use
                our Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">
                6. Third-Party Links
              </h2>
              <p>
                Our Site may contain links to third-party websites. We are not
                responsible for the privacy practices of these external sites.
                We encourage you to review their privacy policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">7. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-inside list-disc space-y-2">
                <li>Access your personal information</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">
                8. Children's Privacy
              </h2>
              <p>
                Our Site is not intended for children under 13. We do not
                knowingly collect personal information from children under 13.
                If we become aware of such collection, we will delete the
                information promptly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">
                9. Changes to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of significant changes by updating the "Last updated"
                date at the top of this page.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">10. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact
                us at:
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:privacy@pausetv.com"
                  className="text-brand-red hover:underline"
                >
                  privacy@pausetv.com
                </a>
              </p>
            </section>
          </div>

          <div className="mt-10 border-t border-white/10 pt-6">
            <Link
              href="/"
              className="text-brand-red hover:text-white transition-colors"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
