const accesskey = "thSZephTV8lUJdoKPL6in4QcfC66F5Zi0FipIfsfH78";

const formEl = document.querySelector("form");
const searchInput = document.getElementById('search-input');
const searchResults = document.querySelector('.search-results');
const showMoreButton = document.getElementById("show-more-button");

let inputData = "";
let page = 1;
async function searchImage() {
    inputData = searchInput.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;
    const response = await fetch(url);
    const data = await response.json();
    if (page === 1) {
        searchResults.innerHTML = "";
    }
    const results = data.results;
    console.log(results);
    results.map((result) => {
        const imageWeapper = document.createElement("div")
        imageWeapper.classList.add("search-result");
        const image = document.createElement("img")
        image.src = result.urls.small;
        image.alt = result.alt_description;
        const imagelink = document.createElement("a")
        imagelink.href = result.links.html;
        imagelink.target = "_blank";
        imagelink.textContent = result.alt_description;

        imageWeapper.appendChild(image);
        imageWeapper.appendChild(imagelink);
        searchResults.appendChild(imageWeapper);
    })
    page++;

    if (page > 1) {
        showMoreButton.style.display = "block";
    }
}

formEl.addEventListener('submit', (event) => {
    event.preventDefault();
    page = 1;
    searchImage();
});
showMoreButton.addEventListener("click", () => {
    searchImage();
});