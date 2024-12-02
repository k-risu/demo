window.addEventListener("load", function () {
  // api 주소 : /apis/news.json 리퀘스트 하세요.
  const CREW_DATA_URL = "/apis/crew.json";
  // 연산 처리 : html 만들기

  fetch(CREW_DATA_URL)
    .then(function (response) {
      //   console.log("뉴스", response);
      const result = response.json();

      return result;
    })
    .then(function (result) {
      //   console.log("뉴스 결과 : ", result);
      // html 만들기
      let crewNews = "";
      //   let i = 0;
      //   let listStarted = false;
      for (let i = 0; ; i++) {
        if (i % 3 == 0 && i > 0) {
          crewNews += `</div>`;
        }

        if (i % 3 == 0) {
          crewNews += `<div class="list">`;
          //listStarted = true;
        }
        if (result[i] != null) {
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
          crewNews += tag;
          //   i++;
        } else {
          //   if (listStarted) {
          crewNews += `</div>`; // 마지막 리스트 닫기
          //   }
          break;
        }
      }
      //   console.log(crewNews);
      //    html 출력하기
      const crewTog = document.querySelector("#crew");
      //   console.log(crewTog);
      crewTog.innerHTML = crewNews;
    })
    .catch(function () {});
});
