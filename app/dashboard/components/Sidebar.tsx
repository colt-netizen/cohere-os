"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";

const navItems = [
  { href: "/dashboard", label: "Home", icon: "terminal" },
  { href: "/dashboard/tasks", label: "Tasks", icon: "kanban" },
  { href: "/dashboard/brain", label: "Brain", icon: "brain" },
  { href: "/dashboard/follow-ups", label: "Follow-ups", icon: "clock" },
  { href: "/dashboard/briefings", label: "Briefings", icon: "file" },
];

const icons: Record<string, React.ReactNode> = {
  terminal: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  ),
  kanban: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <line x1="9" y1="3" x2="9" y2="21" />
      <line x1="15" y1="3" x2="15" y2="21" />
    </svg>
  ),
  brain: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a7 7 0 0 1 7 7c0 2.38-1.19 4.47-3 5.74V17a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-2.26C6.19 13.47 5 11.38 5 9a7 7 0 0 1 7-7z" />
      <line x1="10" y1="22" x2="14" y2="22" />
      <line x1="9" y1="17" x2="15" y2="17" />
    </svg>
  ),
  clock: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  ),
  file: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  ),
};

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-[220px] h-screen fixed left-0 top-0 bg-panel border-r border-border flex-col z-50">
        <div className="px-4 py-4 border-b border-border-subtle">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
              <span className="text-xs font-[590] text-white leading-none">C</span>
            </div>
            <div>
              <h1 className="text-[13px] font-[510] text-text-primary tracking-tight">Cohere OS</h1>
              <p className="text-[11px] text-text-quaternary">Operations</p>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-2 py-2 space-y-px">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-2.5 py-[7px] rounded-md text-[13px] font-[510] transition-colors duration-150
                  ${isActive
                    ? "bg-[rgba(255,255,255,0.06)] text-text-primary"
                    : "text-text-tertiary hover:text-text-secondary hover:bg-[rgba(255,255,255,0.03)]"
                  }`}
              >
                <span className={isActive ? "text-accent-bright" : "text-text-quaternary"}>
                  {icons[item.icon]}
                </span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-4 py-3 border-t border-border-subtle">
          <button
            onClick={handleLogout}
            className="text-[11px] text-text-quaternary font-mono hover:text-text-secondary transition-colors cursor-pointer"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-50 bg-panel/95 backdrop-blur-md border-b border-border-subtle px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-accent flex items-center justify-center">
            <span className="text-xs font-[590] text-white leading-none">C</span>
          </div>
          <span className="text-[13px] font-[510] text-text-primary">Cohere OS</span>
        </Link>
        <button
          onClick={handleLogout}
          className="text-[11px] text-text-quaternary font-mono hover:text-text-secondary transition-colors"
        >
          Sign out
        </button>
      </header>

      {/* Mobile bottom nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-panel/95 backdrop-blur-md border-t border-border-subtle flex items-center justify-around px-1 py-2 safe-bottom">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-1 rounded-md transition-colors ${
                isActive ? "text-accent-bright" : "text-text-quaternary"
              }`}
            >
              {icons[item.icon]}
              <span className="text-[10px] font-[510]">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </>
  );
}
