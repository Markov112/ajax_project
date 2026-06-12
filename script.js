const API_KEY = "YOUR_API_KEY_HERE";

const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");
const button = document.getElementById("btn");

button.addEventListener("click", searchMovies);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMovies();
});

async function searchMovies() {
  const query = searchInput.value.trim();

  if (!query) return;

  const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
  const data = await res.json();

  if (data.Response === "True") {
    renderMovies(data.Search);
  } else {
    resultsDiv.innerHTML = "<p>No results found</p>";
  }
}

function renderMovies(movies) {
  resultsDiv.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${movie.Poster !== "N/A" ? movie.Poster : ""}">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    resultsDiv.appendChild(card);
  });
}
