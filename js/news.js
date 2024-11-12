window.addEventListener("load", function () {
  // api 주소 : /apis/news.json 리퀘스트 하세요.
  const NEWS_DATA_URL = "/apis/news.json";
  // 연산 처리 : html 만들기

  fetch(NEWS_DATA_URL)
    .then(function (response) {
      //   console.log("뉴스", response);
      const result = response.json();
      return result;
    })
    .then(function (result) {
      // console.log("뉴스 결과 : ", result);
      // html 만들기
      let htmlNews = "";
      for (let i = 0; i < 3; i++) {
        // 각 세부 html 글자 만들기
        let obj = result[i];
        const tag = `
        <a href="${obj.link}" class="thum">
            <div class="thum-img">
                <img src="./images/${obj.imgpath}" alt="${obj.category}" />
            </div>
            <div class="thum-cate">
                <img src="./images/icon/${obj.icon}" alt="${obj.category}" />
                <span style="color:${obj.txtcolor}">${obj.category}</span>
            </div>
            <h5 class="thum-title">${obj.title}</h5>
            <span class="thum-date">${obj.day}</span>
            </a>
            `;
        // console.log(tag);
        // 모든 html 글자 하나로 합치기
        htmlNews += tag;
      }
      //   console.log(htmlNews);
      //    html 출력하기
      const newsTog = document.querySelector("#news-api");
      //   console.log(newsTog);
      newsTog.innerHTML = htmlNews;
    })
    .catch(function () {});
});
