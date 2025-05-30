import Image from "next/image";
import { Title } from "@/styles/Commom.styles";
import { BusinessBar } from "@/styles/home/business";

const BUSINESS_IMAGES = [
  {
    id: 1,
    src: "/images/main/main_busrinss_hairbar.png",
    alt: "business",
  },
  {
    id: 2,
    src: "/images/main/main_busrinss_mirror_motion.png",
    alt: "business",
  },
  {
    id: 3,
    src: "/images/main/main_busrinss_hset.png",
    alt: "business",
  },
];

export default function Business() {
  return (
    <div className="mt-142">
      <Title>사업 분야</Title>
      <BusinessBar>
        {BUSINESS_IMAGES.map(image => (
          <Image
            key={image.id}
            src={image.src}
            alt={image.alt}
            width={285}
            height={266}
          />
        ))}
      </BusinessBar>
    </div>
  );
}
