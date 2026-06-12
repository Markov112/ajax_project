// TMDB API avain (sinun oma key)
const API_KEY = "6fb2bc7e1fc053410f21c3e3b0627ab0";

// API:n perusosoite
const BASE_URL = "https://api.themoviedb.org/3";

// Haetaan HTML-elementit
const searchInput = document.getElementById("search");
const resultsDiv = document.getElementById("results");
const button = document.getElementById("btn");

// ---------------------------
// EVENT LISTENERS
// ---------------------------

// Klikkaus hakee elokuvia
button.addEventListener("click", searchMovies);

// Enter-näppäin tekee haun
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchMovies();
});

// ---------------------------
// SIVUN LATAUS: POPULAR MOVIES
// ---------------------------

// Kun sivu aukeaa → näytetään suositut elokuvat
window.addEventListener("load", loadPopularMovies);

// Haetaan suosituimmat elokuvat API:sta
async function loadPopularMovies() {
  try {
    resultsDiv.innerHTML = "<p>🎬 Loading popular movies...</p>";

    const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
    const data = await res.json();

    // Renderöidään elokuvat ruudulle
    renderMovies(data.results);

  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = "<p>Error loading movies</p>";
  }
}

// ---------------------------
// HAKUTOIMINTO
// ---------------------------

async function searchMovies() {
  const query = searchInput.value.trim();

  // Jos hakukenttä tyhjä → näytä popular uudestaan
  if (!query) {
    loadPopularMovies();
    return;
  }

  try {
    resultsDiv.innerHTML = "<p>🔍 Searching...</p>";

    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
    );

    const data = await res.json();

    // Jos ei tuloksia
    if (!data.results || data.results.length === 0) {
      resultsDiv.innerHTML = "<p>No movies found</p>";
      return;
    }

    // Näytetään tulokset
    renderMovies(data.results);

  } catch (err) {
    console.error(err);
    resultsDiv.innerHTML = "<p>Error fetching data</p>";
  }
}

// ---------------------------
// ELOKUVIEN RENDERÖINTI
// ---------------------------

function renderMovies(movies) {
  // Tyhjennetään vanhat tulokset
  resultsDiv.innerHTML = "";

  // Käydään kaikki elokuvat läpi
  movies.forEach(movie => {

    // Luodaan kortti
    const card = document.createElement("div");
    card.classList.add("card");

    // Elokuvan kuva (tai placeholder jos puuttuu)
    const poster = movie.poster_path
      ? `https://image.tmdb.org/t/p/w300${movie.poster_path}`
      : "https://via.placeholder.com/300x450?text=No+Image";

    // Vuosi
    const year = movie.release_date
      ? movie.release_date.split("-")[0]
      : "Unknown";

    // Kortin sisältö
    card.innerHTML = `
      <img src="${poster}" alt="poster">
      <h3>${movie.title}</h3>
      <p>${year}</p>
    `;

    // Lisätään kortti sivulle
    resultsDiv.appendChild(card);
  });
}
