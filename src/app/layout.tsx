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
        <div className="relative min-h-screen">
          {/* Background glow */}
          <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.08),transparent_28%),radial-gradient(circle_at_bottom,rgba(255,255,255,0.03),transparent_18%)]" />

          {/* ── NAVBAR ───────────────────────── */}
          <header className="sticky top-0 z-50 border-b border-zinc-900 bg-black/80 backdrop-blur-xl">
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
          <main className="relative">{children}</main>

          {/* ── FOOTER ───────────────────────── */}
          <footer className="mt-16 border-t border-zinc-900">
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
