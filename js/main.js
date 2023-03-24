const country = "IN";
const container = document.getElementById("container");
const options_container = document.getElementById("options-container");
const options = [
  "General",
  "Entertainment",
  "Health",
  "Science",
  "Sports",
  "Technology",
];
let requestURL;

const generateUI = (articles) => {
  for (let item of articles) {
    let card = document.createElement("div");
    card.classList.add("news-card");
    card.innerHTML = `
        <div class="news-image-container">
        ${
          item.urlToImage
            ? `<img src=${item.urlToImage} alt='' />`
            : `<p class="error">Failed to download image</p>`
        }    
        </div>
        <div class="news-content">
            <div class="news-title">
                ${item.title}
            </div>
            <div class="news-description">
                ${item.description || item.content || ""}
            </div>
            <a href="${
              item.url
            }" target="_blank" class="view-button">Read more</a>
        </div>
    `;
    container.appendChild(card);
  }
};

const getNews = async () => {
  container.innerHTML = "";
  const res = await fetch(requestURL);
  if (!res.ok) {
    alert("Data unavailable");
    console.error("Fetching data failed");
    return false;
  }
  const data = await res.json();
  console.log(data);
  generateUI(data.articles);
};

const selectCategory = (e, category) => {
  let options = document.querySelectorAll(".option");
  options.forEach((element) => {
    element.classList.remove("active");
  });
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=${api_key}`;
  e.target.classList.add("active");
  getNews();
};

const createOptions = () => {
  for (let i of options) {
    options_container.innerHTML += `
        <button class="option ${
          i == "general" ? "active" : ""
        }" onclick="selectCategory(event, '${i}')">${i}</button>
    `;
  }
};

const init = () => {
  options_container.innerHTML = "";
  getNews();
  createOptions();
};

window.onload = () => {
  requestURL = `https://newsapi.org/v2/top-headlines?country=${country}&category=general&apiKey=${api_key}`;
  init();
};
