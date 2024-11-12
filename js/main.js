window.addEventListener("load", function () {
  const MAIN_DATA_URL = "/apis/main.json";

  fetch(MAIN_DATA_URL)
    .then(function (response) {
      const result = response.json();
      return result;
    })
    .then(function (result) {
      let mainSlideImg = "";

      for (let i = 0; result[i] != null; i++) {
        let obj = result[i];
        const tag = `
        <div class="swiper-slide">
                  <a href="${obj.url}" style="position: relative;">
                    <img src="./images/${obj.pic}" alt="${obj.title}" />
                  </a>
                  <div style="
                  position:absolute; bottom: 0; right: 0; color:#ffffff;
                   padding: 40px 40px; font-size: 40px; font-weight:700; text-align: right;">${obj.title}</div>
                </div>
        `;
        mainSlideImg += tag;
      }
      const mainTag = document.querySelector(".visual-slide .swiper-wrapper");
      //   console.log(mainSlideImg);

      mainTag.innerHTML = mainSlideImg;

      const tagRight = `
      <div class="card-slide" style="position: relative;object-fit: cover;">
        <a href="#" >
        <img src="./images/c3.png" alt="배너이미지"  sytle="object-fit: cover;"/>
        </a>
        <div style="
            position:absolute; bottom: 0; right: 0; color:#ffffff;
            padding: 40px 40px; font-size: 40px; font-weight:700; text-align: right;">
            영업 중
            </div>
      </div>
    `;
      const mainTagRight = document.querySelector(".right");
      mainTagRight.innerHTML = tagRight;
    })
    .catch();
});
