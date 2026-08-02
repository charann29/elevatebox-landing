"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

// ponytail: the only client component on the page — active-link highlighting
// needs the current path. Everything else stays server-rendered.

export function NavLink({
  href,
  children,
  className = "",
  activeClassName = "text-brand-soft",
  idleClassName = "text-ink-muted hover:text-brand",
  exact,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  activeClassName?: string;
  idleClassName?: string;
  exact?: boolean;
}) {
  const path = usePathname();
  const active = exact ? path === href : path === href || path.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`${className} ${active ? activeClassName : idleClassName}`}
    >
      {children}
    </Link>
  );
}
