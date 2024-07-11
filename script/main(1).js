const fetchParams = {
    method: 'GET',
    headers: {
        'X-API-KEY': '1be6749b-dbf1-4f49-814f-8b1bf84b0931',
        'Content-Type': 'application/json',
    },
};

const fetchResult = async () => {
    try {
        const response = await fetch('https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=1', fetchParams);

        const bodyData = await response.json();
        const filmIds = bodyData.films.map(film => film.filmId);
        console.log(filmIds);

        const filmsData = await Promise.all(
            filmIds.map(async (element) => {
                const filmResponse = await fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${element}`, fetchParams);
                return await filmResponse.json();
            })
        );

        const mainElement = document.querySelector('main');
        mainElement.innerHTML ='';

        filmsData.forEach(film => {
            const article = document.createElement('article');
            article.classList.add('block');

            const topDiv = document.createElement('div');
            topDiv.classList.add('top');

            const yearDiv = document.createElement('div');
            yearDiv.classList.add('year');
            yearDiv.textContent = film.year;

            const nameDiv = document.createElement('div');
            nameDiv.classList.add('name');
            nameDiv.textContent = film.nameRu;

            const descriptionDiv = document.createElement('div');
            descriptionDiv.classList.add('description');
            descriptionDiv.textContent = film.description;

            topDiv.append(yearDiv, nameDiv, descriptionDiv);

            const genreDiv = document.createElement('div');
            genreDiv.classList.add('genre');
            genreDiv.textContent = film.genres[0].genre;

            article.append(topDiv, genreDiv);
            article.style.backgroundImage = `linear-gradient(transparent 50%, black 100%), url(${film.posterUrl})`;

            mainElement.append(article);

        })

    } catch (error) {
        console.error('Error fetching films data:', error);
    }
}
fetchResult();