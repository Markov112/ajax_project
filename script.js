const API_KEY = "6fb2bc7e1fc053410f21c3e3b0627ab0";
const BASE_URL = "https://api.themoviedb.org/3";

const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");
const button = document.getElementById("btn");

// ------------------------------
// EVENT LISTENERS
// ------------------------------
button.addEventListener("click", searchMovies);

searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMovies();
});

// ------------------------------
// LOAD POPULAR MOVIES ON START
// ------------------------------
window.addEventListener("load", loadPopularMovies);

async function loadPopularMovies() {
  try {
    resultsDiv.innerHTML = "<p>🎬 Loading popular movies...</p>";

    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await res.json();

    if (!data.results) {
      resultsDiv.innerHTML = "<p>No data found</p>";
      return;
    }

    renderMovies(data.results);

  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = "<p>Error loading movies</p>";
  }
}

// ------------------------------
// SEARCH MOVIES
// ------------------------------
async function searchMovies() {
  const query = searchInput.value.trim();

  if (!query) {
    loadPopularMovies();
    return;
  }

  try {
    resultsDiv.innerHTML = "<p>🔍 Searching...</p>";

    const url = `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`;
    const res = await fetch(url);
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      resultsDiv.innerHTML = "<p>No movies found.</p>";
      return;
    }

    renderMovies(data.results);

  } catch (error) {
    console.error(error);
    resultsDiv.innerHTML = "<p>Error fetching data</p>";
  }
}

// ------------------------------
// RENDER MOVIES
// ------------------------------
function renderMovies(movies) {
  resultsDiv.innerHTML = "";

  movies.forEach(movie => {
    const card = document.createElement("div");
    card.classList.add("card");

    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    const year = movie.release_date
      ? movie.release_date.split("-")[0]
      : "Unknown";

    card.innerHTML = `
      <img src="${poster}" alt="poster">
      <h3>${movie.title}</h3>
      <p>${year}</p>
    `;

    resultsDiv.appendChild(card);
  });
}
