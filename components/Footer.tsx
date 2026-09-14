import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { SITE_SETTINGS_QUERY } from "@/sanity/lib/queries";
import Image from "next/image";

type SocialLink = { platform?: string; url?: string };

export default async function Footer() {
  const settings = await client
    .fetch<{ socialLinks?: SocialLink[]; email?: string; footerNote?: string }>(
      SITE_SETTINGS_QUERY,
    )
    .catch(() => null);

  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black text-white">
      <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <Link href="/" className="flex items-center">
              <Image
                src="/navlogo.png"
                alt="PauseTV Logo"
                width={220}
                height={80}
                priority
                className="h-16 w-auto"
              />
            </Link>
            <p className="mt-3 max-w-xs text-sm text-white/60">
              {settings?.footerNote ??
                "Real talk, real laughs. New episodes every week."}
            </p>
          </div>

          <div className="flex gap-10">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-red">
                Explore
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>
                  <Link
                    href="/about"
                    className="hover:text-white transition-colors"
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    href="/shows"
                    className="hover:text-white transition-colors"
                  >
                    Shows
                  </Link>
                </li>
                <li>
                  <Link
                    href="/news"
                    className="hover:text-white transition-colors"
                  >
                    News
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="hover:text-white transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-red">
                Follow
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                {settings?.socialLinks?.length ? (
                  settings.socialLinks.map((link) => (
                    <li key={link.platform}>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="hover:text-white transition-colors"
                      >
                        {link.platform}
                      </a>
                    </li>
                  ))
                ) : (
                  <li className="text-white/40">Coming soon</li>
                )}
              </ul>
            </div>

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-brand-red">
                Legal
              </h3>
              <ul className="mt-3 space-y-2 text-sm text-white/70">
                <li>
                  <Link
                    href="/privacy"
                    className="hover:text-white transition-colors"
                  >
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link
                    href="/terms"
                    className="hover:text-white transition-colors"
                  >
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-2 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Pause TV News LTD. All rights reserved.</p>
          {settings?.email && <p>{settings.email}</p>}
        </div>
      </div>
    </footer>
  );
}
