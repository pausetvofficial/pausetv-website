import type { Metadata } from "next";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";

export const metadata: Metadata = {
  title: "Terms & Conditions — PauseTV",
  description:
    "Terms and Conditions for PauseTV. Read our legal terms and conditions for using the site.",
  robots: "index, follow",
};

export default function TermsPage() {
  const lastUpdated = "September 2026";

  return (
    <>
      <section className="bg-black pt-32 pb-20 text-white">
        <div className="mx-auto max-w-3xl px-5 sm:px-8">
          <SectionHeading eyebrow="Legal" title="Terms & Conditions" light />
          <p className="mt-4 text-sm text-white/60">
            Last updated: {lastUpdated}
          </p>

          <div className="prose prose-invert mt-10 max-w-none space-y-6 text-white/80">
            <section>
              <h2 className="text-2xl font-bold text-white">
                Agreement to Terms
              </h2>
              <p>
                These Terms and Conditions ("Terms") constitute a legal
                agreement between you and PauseTV ("Company," "we," "us," or
                "our"). By accessing and using this Site, you accept and agree
                to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">1. Use License</h2>
              <p>
                Permission is granted to temporarily download one copy of the
                materials (information or software) on PauseTV's Site for
                personal, non-commercial transitory viewing only. This is the
                grant of a license, not a transfer of title, and under this
                license you may not:
              </p>
              <ul className="list-inside list-disc space-y-2">
                <li>Modify or copy the materials</li>
                <li>
                  Use the materials for any commercial purpose or for any public
                  display
                </li>
                <li>
                  Attempt to decompile or reverse engineer any software
                  contained on the Site
                </li>
                <li>Remove any copyright or other proprietary notations</li>
                <li>
                  Transfer the materials to another person or "mirror" the
                  materials on any other server
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">2. Disclaimer</h2>
              <p>
                The materials on PauseTV's Site are provided on an 'as is'
                basis. PauseTV makes no warranties, expressed or implied, and
                hereby disclaims and negates all other warranties including,
                without limitation, implied warranties or conditions of
                merchantability, fitness for a particular purpose, or
                non-infringement of intellectual property or other violation of
                rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">3. Limitations</h2>
              <p>
                In no event shall PauseTV or its suppliers be liable for any
                damages (including, without limitation, damages for loss of data
                or profit, or due to business interruption) arising out of the
                use or inability to use the materials on PauseTV's Site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">
                4. Accuracy of Materials
              </h2>
              <p>
                The materials appearing on PauseTV's Site could include
                technical, typographical, or photographic errors. PauseTV does
                not warrant that any of the materials on its Site are accurate,
                complete, or current. PauseTV may make changes to the materials
                contained on its Site at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">
                5. Materials and Content
              </h2>
              <p>
                All content on PauseTV, including but not limited to text,
                graphics, logos, images, and software, is the property of
                PauseTV or its content suppliers and protected by international
                copyright laws. Unauthorized use of this content is prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">6. Links</h2>
              <p>
                PauseTV has not reviewed all of the sites linked to its Site and
                is not responsible for the contents of any such linked site. The
                inclusion of any link does not imply endorsement by PauseTV of
                the site. Use of any such linked website is at the user's own
                risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">
                7. Modifications
              </h2>
              <p>
                PauseTV may revise these Terms and Conditions for its Site at
                any time without notice. By using this Site, you are agreeing to
                be bound by the then current version of these Terms and
                Conditions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">
                8. User Submissions
              </h2>
              <p>
                If you submit any comments, suggestions, or ideas to PauseTV,
                you grant PauseTV the right to use such submissions for any
                purpose without compensation or attribution to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">
                9. Prohibited Conduct
              </h2>
              <p>You agree that you will not:</p>
              <ul className="list-inside list-disc space-y-2">
                <li>
                  Use this Site for any illegal or unauthorized purpose or in
                  violation of any applicable laws
                </li>
                <li>Harass or cause distress or inconvenience to any person</li>
                <li>Offend, abuse, or disparage others</li>
                <li>Interfere with the normal operation of the Site</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">
                10. Governing Law
              </h2>
              <p>
                These Terms and Conditions are governed by and construed in
                accordance with the laws of the jurisdiction in which PauseTV
                operates, and you irrevocably submit to the exclusive
                jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white">
                11. Contact Information
              </h2>
              <p>
                If you have any questions about these Terms and Conditions,
                please contact us at:
              </p>
              <p>
                Email:{" "}
                <a
                  href="mailto:legal@pausetv.com"
                  className="text-brand-red hover:underline"
                >
                  legal@pausetv.com
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
