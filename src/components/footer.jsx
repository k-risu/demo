import {
  CompanyInfoWrapper,
  Container,
  FooterWrapper,
} from "@/styles/footer.styles";

export default function Footer() {
  return (
    <FooterWrapper>
      <Container>Corporat.CoCo.H</Container>
      <CompanyInfoWrapper>
        <span>주식회사 코코에이치</span>
        <span>대구시 동구 동대구로465 대구스케일업허브 8층 812호 42160</span>
        <span>대표이사 : 탁진학 | 703-88-02575</span>
      </CompanyInfoWrapper>
    </FooterWrapper>
  );
}
