import { Main } from "@/styles/layout.styles";
import "./globals.css";
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata = {
  title: "주식회사 코코에이치",
  description: "기술로 연결하고, 혁신으로 성장하다",
  openGraph: {
    title: "주식회사 코코에이치",
    description: "기술로 연결하고, 혁신으로 성장하다",
    images: [{ url: "/thumbnail.png" }],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body
        className={`${pretendard.variable} flex justify-center min-h-screen w-[1920px] mx-auto`}
      >
        {/* <LayoutWrapper>
          <Header />
          <GradientBar /> */}
        <Main>{children}</Main>
        {/* <Footer />
        </LayoutWrapper> */}
      </body>
    </html>
  );
}
