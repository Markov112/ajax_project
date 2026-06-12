const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");
const button = document.getElementById("btn");

// TMDB public demo API (ei tarvitse omaa keytä)
const BASE_URL = "https://api.themoviedb.org/3/search/movie?api_key=demo&query=";

button.addEventListener("click", searchMovies);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMovies();
});

async function searchMovies() {
  const query = searchInput.value.trim();
  if (!query) return;

  try {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=demo&query=${query}`);
    const data = await res.json();

    console.log(data);

    if (data.results && data.results.length > 0) {
      renderMovies(data.results);
    } else {
      resultsDiv.innerHTML = "<p>No movies found</p>";
    }

  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = "<p>Error fetching data</p>";
  }
}

function renderMovies(movies) {
  resultsDiv.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("card");

    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "";

    card.innerHTML = `
      <img src="${poster}">
      <h3>${movie.title}</h3>
      <p>${movie.release_date || "Unknown year"}</p>
    `;

    resultsDiv.appendChild(card);
  });
}
