async function fetchData() {
    const response = await fetch('your_server_endpoint'); 
    const data = await response.json();
    return data;
  }
  
  function filterMovies(data, category) {
    return data.filter(movie => movie.category === category);
  }
  
  function renderMovies(movies) {
    const movieSection = document.querySelector('main section');
    movieSection.innerHTML = ''; 
  
    movies.forEach(movie => {
      const article = document.createElement('article');
      article.innerHTML = `
        <a href="movie.html" class="movie_poster">
          <img src="${movie.poster}" alt="${movie.title} poster">${movie.title}
        </a>
        <div class="rating">
          <a href="${movie.imdbLink}">
            <img src="Images/imdb_icon.png" alt="imdb rating">${movie.imdbRating}
          </a>
          <a href="${movie.rottenTomatoesLink}">
            <img src="Images/rotten_tomatos_icon.png" alt="rotten tomato rating">${movie.rottenTomatoesRating}
          </a>
        </div>
      `;
  
      movieSection.appendChild(article);
    });
  }
  
  async function onPageLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
  
    const data = await fetchData();
  
    if (category) {
      const filteredMovies = filterMovies(data, category);
      renderMovies(filteredMovies);
    } else {
      renderMovies(data);
    }
  }
  
  document.addEventListener('DOMContentLoaded', onPageLoad);

async function onPageLoad() {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');
  
    const data = await fetchData();
  
    if (category) {
      const filteredMovies = filterMovies(data, category);
      renderMovies(filteredMovies);
  

      const categoryLinks = document.querySelectorAll('#category-links a');
      categoryLinks.forEach(link => {
        const linkCategory = link.getAttribute('href').split('=')[1];
        if (linkCategory === category) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    } else {
      renderMovies(data);
    }
  }