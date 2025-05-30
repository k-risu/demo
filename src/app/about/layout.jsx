import NavigationMenu from "@/components/about/NavigationMenu";

export default function AboutLayout({ children }) {
  return (
    <div className="mt-10">
      <div className="ml-20">
        <h1 className="text-[35px] font-[900] text-[#18244D] mb-5 text-shadow-[4px_4px_4px_rgba(0,4,4,0.25)]">
          기업소개
        </h1>
        <NavigationMenu />
      </div>
      {children}
    </div>
  );
}
