"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AboutItem } from "@/styles/about/layout.styles";

const ABOUT_MENU_ITEMS = [
  {
    name: "인사말",
    href: "/about",
    id: 1,
  },
  {
    name: "경영원칙",
    href: "/about/management",
    id: 2,
  },
  {
    name: "연혁",
    href: "/about/history",
    id: 3,
  },
];

export default function NavigationMenu() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-18">
      {ABOUT_MENU_ITEMS.map(item => (
        <AboutItem key={item.id} data-active={pathname === item.href}>
          <Link href={item.href}>{item.name}</Link>
        </AboutItem>
      ))}
    </ul>
  );
}
