document.addEventListener("DOMContentLoaded", () => {
    loadNews();
});

function addNews() {
    const title = document.getElementById("newsTitle").value;
    const content = document.getElementById("newsContent").value;
    const image = document.getElementById("newsImage").value;

    if (title.trim() === "" || content.trim() === "") {
        alert("Title and content are required!");
        return;
    }

    const newsItem = { title, content, image };
    let newsList = JSON.parse(localStorage.getItem("news")) || [];
    newsList.push(newsItem);
    localStorage.setItem("news", JSON.stringify(newsList));

    document.getElementById("newsTitle").value = "";
    document.getElementById("newsContent").value = "";
    document.getElementById("newsImage").value = "";

    loadNews();
}

function loadNews() {
    const newsContainer = document.getElementById("newsContainer");
    newsContainer.innerHTML = "";
    let newsList = JSON.parse(localStorage.getItem("news")) || [];
    
    newsList.forEach((news, index) => {
        const newsElement = document.createElement("div");
        newsElement.classList.add("news-item");
        newsElement.innerHTML = `
            <h3>${news.title}</h3>
            <p>${news.content}</p>
            ${news.image ? `<img src="${news.image}" alt="News Image">` : ""}
           
        `;
        newsContainer.appendChild(newsElement);
    });
}

