import Link from "next/link";
import { Button, ContactBannerBg } from "@/styles/home/contactBanner.styles";

export default function ContactBanner() {
  return (
    <ContactBannerBg>
      주식회사 코코에이치는 <br />
      새로운 가치를 탐구합니다.
      <Link href="/contact">
        <Button>협력 & 문의</Button>
      </Link>
    </ContactBannerBg>
  );
}
