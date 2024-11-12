window.addEventListener("load", function () {
  const CARD_DATA_URL = "/apis/cards.json";

  fetch(CARD_DATA_URL)
    .then(function (response) {
      //   console.log(response);
      const result = response.json();
      return result;
    })
    .then(function (result) {
      //   console.log("카드 결과 : ", result);
      let htmlCard = "";
      for (let i = 0; i < 5; i++) {
        let obj = result[i];
        const tag = `
        <a href="${obj.link}" class="card-wrap">
            <div class="card-img">
                <img src="./images/${obj.imgpath}" alt="${obj.cardname}" />
            </div>

            <div class="card-info">
                <h5 class="card-cate">${obj.cardname}</h5>
                <span class="card-count">${obj.cardno}</span>
            </div>
            </a>
        `;
        // console.log(tag);
        htmlCard += tag;
      }
      //   console.log(htmlCard);
      const newsTog = document.querySelector(".list-card");
      newsTog.innerHTML = htmlCard;
    })
    .catch(function () {});
});
