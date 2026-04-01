import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "crb.ai",
  description: "AI + Data + Cloud Engineer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black text-zinc-100 antialiased">
        <div className="site-shell relative min-h-screen overflow-x-hidden">
          {/* Global holographic background for all pages */}
          <div className="site-bg" aria-hidden="true" />
          <div className="site-bg__veil" aria-hidden="true" />

          {/* ── NAVBAR ───────────────────────── */}
          <header className="sticky top-0 z-50 border-b border-white/5 bg-black/55 backdrop-blur-xl">
            <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-6">
              <Link
                href="/"
                className="text-sm font-semibold tracking-tight text-zinc-200 transition-colors hover:text-white"
              >
                crb.ai
              </Link>

              <nav className="flex items-center gap-6 text-sm text-zinc-500">
                <Link
                  href="/projects"
                  className="transition-colors hover:text-zinc-200"
                >
                  Projects
                </Link>
                <Link
                  href="/skills"
                  className="transition-colors hover:text-zinc-200"
                >
                  Skills
                </Link>
              </nav>
            </div>
          </header>

          {/* ── PAGE CONTENT ─────────────────── */}
          <main className="relative z-10">{children}</main>

          {/* ── FOOTER ───────────────────────── */}
          <footer className="relative z-10 mt-16 border-t border-white/5 bg-black/20 backdrop-blur-sm">
            <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-6 text-xs text-zinc-600">
              <p>© {new Date().getFullYear()} crb.ai</p>
              <p className="text-zinc-700">Built with Next.js</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
