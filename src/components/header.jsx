import Image from "next/image";
import Link from "next/link";
import { HEADER_MENU_ITEMS } from "@/constants/navigation";
import { HeaderContainer, MenuItem, MenuList } from "@/styles/header.styles";

export default function Header() {
  return (
    <header>
      <HeaderContainer>
        <Link href="/">
          <Image
            src="/images/logo/main_header_logo.svg"
            alt="logo"
            width={176}
            height={40}
            priority
          />
        </Link>
        <MenuList>
          {HEADER_MENU_ITEMS.map(item => (
            <MenuItem key={item.name}>
              <Link href={item.href}>
                <span className="cursor-pointer">{item.name}</span>
              </Link>
            </MenuItem>
          ))}
        </MenuList>
      </HeaderContainer>
    </header>
  );
}
