window.addEventListener("load", function () {
  // api 주소 : json 주소가 어디있는가?
  const LOGO_DATA_URL = "/apis/logodata.json";
  // API 를 통한 데이터 블러오기
  // ---- request : 리퀘스트
  // API 를 통해 불러들여진 결과물
  // ---- response : 리스판스

  fetch(LOGO_DATA_URL)
    .then(function (response) {
      const result = response.json();
      return result;
    })
    .then(function (result) {
      // console.log(result);
      // 1. json뜯기
      // 2. 반복해서 html 태그를 생성
      let logoHtml = "";
      for (let i = 0; i < 9; i++) {
        const data = `<div class="swiper-slide"><img src="/images/etc/${result[i].imgUrl}" alt="${result[i].desc}"/></div>`;

        logoHtml += data;
      }

      // console.log(logoHtml);

      // 3. 생성된 html 을 원하는 곳에 배치
      const headerLogoTag = document.querySelector(
        ".header-logo-motion .swiper-wrapper"
      );
      // console.log(headerLogoTag);
      headerLogoTag.innerHTML = logoHtml;
      // 4. swiper 생성 및 실행

      const headerLogo = new Swiper(".header-logo-motion", {
        loop: true,
        autoplay: {
          delay: 1500,
          disableOnInteraction: false,
        },
        effect: "fade",

        fadeEffect: {
          crossFade: true,
        },
        speed: 300,
      });
      headerLogo.autoplay.stop();

      const logoSlide = document.querySelector(".header-logo-motion");
      logoSlide.addEventListener("mouseenter", function () {
        headerLogo.autoplay.start();
      });
      logoSlide.addEventListener("mouseleave", function () {
        headerLogo.slideToLoop(0);

        headerLogo.autoplay.stop();
      });
    })
    .catch(function (error) {
      console.log(error);
    });
});
