const fetchParams = {
    method: 'GET',
    headers: {
        // 'X-API-KEY': '7c04814c-1b1b-48eb-bf10-e55c16764006',
        'X-API-KEY': '12d6b032-42f0-4b24-84bd-877453b84865',
        'Content-Type': 'application/json',
    },
};

async function fetchFilms() {
    const apiUrl = 'https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1';

    try {
        const response = await fetch(apiUrl, fetchParams);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        displayFilms(data.films);
    } catch (error) {
        console.error('Error fetching film details:', error);
    }
}

async function fetchFilmsDescription(filmId, descriptionDiv) {
    const detailsUrl = `https://kinopoiskapiunofficial.tech/api/v2.2/films/${filmId}`
    try {
        const response = await fetch(detailsUrl, descriptionDiv);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        const fullDescription = data.description || 'No description';
        const shortDescription = fullDescription.split('. ').slice(0, 2).join('. ') + '.';
        descriptionDiv.textContent = shortDescription;
    } catch (error) {
        console.error('Error fetching film details:', error);
        descriptionDiv.textContent = 'Failed to load description';
    }
}
function displayFilms(films) {
    const mainDiv = document.querySelector('.main');
    mainDiv.innerHTML = ''; // Очистка содержимого перед добавлением новых фильмов

    films.forEach(film => {
        const article = document.createElement('article');
        article.classList.add('article');
        article.style.backgroundImage = `linear-gradient(transparent 50%, black 90%), url(${film.posterUrlPreview})`;

        const genreDiv = document.createElement('div');
        genreDiv.classList.add('genre');
        genreDiv.textContent = film.genres.length > 0 ? film.genres[0].genre : 'Unknown Genre';

        const filmInfoDiv = document.createElement('div');
        filmInfoDiv.classList.add('film-info');
        const yearDiv = document.createElement('div');
        yearDiv.classList.add('year');
        yearDiv.textContent = film.year;

        const nameDiv = document.createElement('div');
        nameDiv.classList.add('name');
        nameDiv.textContent = film.nameRu;

        const descriptionDiv = document.createElement('div');
        descriptionDiv.classList.add('description');

        filmInfoDiv.appendChild(yearDiv);
        filmInfoDiv.appendChild(nameDiv);
        filmInfoDiv.appendChild(descriptionDiv);
        article.appendChild(genreDiv);
        article.appendChild(filmInfoDiv);

        mainDiv.appendChild(article);

        // Получение детальной информации о фильме по ID
        fetchFilmDescription(film.filmId, descriptionDiv);
    });
}

fetchFilms();