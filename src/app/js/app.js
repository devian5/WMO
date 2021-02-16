
const url = 'http://api.themoviedb.org/3/movie/popular?api_key=c0b6dea31a9d647a6b7d1eafa59bacaa';

let promise = axios.get(url);

let movieArrayPromise = promise.then((response) => response.data.results);

const renderMovie = (movieCollection) => {
    
    const divMovieDomElement = document.getElementById('movie');
    
    movieCollection.map((movie) =>{

        const pathImg = 'https://image.tmdb.org/t/p/w500';

        const newMovieDomElement = document.createElement('div');

        const titleMovie = document.createElement('h4');
        
        const pictureMovie = document.createElement('img');


        divMovieDomElement.appendChild(newMovieDomElement);
        newMovieDomElement.appendChild(titleMovie);
        newMovieDomElement.appendChild(pictureMovie);
        newMovieDomElement.setAttribute('class', 'titlePicture');
        titleMovie.innerHTML = movie.title;
        pictureMovie.setAttribute('src', pathImg+movie.poster_path);
    });
}

movieArrayPromise.then(renderMovie);