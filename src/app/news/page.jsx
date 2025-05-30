import {
  NewsAuthor,
  NewsCompany,
  NewsDate,
  NewsLayout,
} from "@/styles/new/new.styles";

export default function News() {
  const news = [
    {
      id: 1,
      title: "",
      content: "뉴스 & 소식",
    },
  ];
  return (
    <NewsLayout>
      <h1>뉴스 & 소식</h1>
      <ul>
        <li>
          <h2>
            대구공업대학교 헤어디자인과 <br /> 코코에이치와 MOU 체결
          </h2>
          <div className="flex justify-between">
            <NewsCompany>대구경북뉴스</NewsCompany>
            <NewsAuthor>이준호 기자</NewsAuthor>
          </div>
          <NewsDate>2024년 5월 17일</NewsDate>
        </li>
      </ul>
    </NewsLayout>
  );
}
