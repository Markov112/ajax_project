const API_KEY = "YOUR_KEY";
const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");

document.getElementById("btn").addEventListener("click", searchMovies);

async function searchMovies() {
  const query = searchInput.value;

  const res = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
  const data = await res.json();

  renderMovies(data.Search);
}

function renderMovies(movies) {
  resultsDiv.innerHTML = "";

  movies.forEach(movie => {
    const div = document.createElement("div");

    div.innerHTML = `
      <img src="${movie.Poster}" width="120">
      <h3>${movie.Title}</h3>
      <p>${movie.Year}</p>
    `;

    resultsDiv.appendChild(div);
  });
}
