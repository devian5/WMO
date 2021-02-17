const apiKey = 'c0b6dea31a9d647a6b7d1eafa59bacaa'

const baseUrl = 'https://api.themoviedb.org/3'

const endPoint = 'movie'

const multi = 'multi'

const param = 'search'

const explore = document.getElementById('search');

const exploreId = document.getElementById('searchId');

const url = `${baseUrl}/${endPoint}/popular?api_key=${apiKey}`;

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

const renderSearch = async (renderCollection) => {
    //Proceso para el pintado HTML de las películas
    const divMovieElement = document.getElementById("pepe");
    
    // console.log(renderCollection);
    if (Array.isArray(renderCollection)) {
        console.log(renderCollection);
        renderCollection.forEach(movie => {
            divMovieElement.innerHTML += `<div id='movies'>
            <img src='https://image.tmdb.org/t/p/w500${movie.poster_path}'></img></div>
            <div id='text'><h2>${movie.title}</h2>
            <p>${movie.overview}</p>
            </div>`
        });
    }
    
    if (renderCollection.original_title){
        divMovieElement.innerHTML += `<div class='movies'>
            <img src='https://image.tmdb.org/t/p/w500${renderCollection.poster_path}' width='200px' class='picture'>
            </img></div><div class='infoPelis'><h2>${renderCollection.original_title}</h2><p>${renderCollection.overview}</p></div>`
        
    }
    return;
};



const callPromise = async (url) => {
    let response = await axios.get(url);
    
    if (response.data.results){
        return response.data.results;

    }
    
    if (response.data.title){
        return response.data;
    }
};

const search = async () => {
    if (event.keyCode === 13) {
        let query = explore.value;

        const url = `${baseUrl}/${param}/${endPoint}?api_key=${apiKey}&query=${query}`;

        let movie = await callPromise(url);

        renderSearch(movie);
        
        screenChange('mainScreen', 'front2');
    }
};

const searchId = async () => {
    
        let query = exploreId.value;

        const urlId = `${baseUrl}/${endPoint}/${query}?api_key=${apiKey}`;
        
        let movie = await callPromise(urlId);

        renderMovie(movie);
    
};


const screenChange = (present, future) => {
    let screenPresent = document.getElementById(present);
    let screenFuture = document.getElementById(future);

    screenPresent.style.display = 'none';
    screenFuture.style.display = 'grid';

};

//  const enter = () => {
//     let input = document.getElementById('search');

//     input.addEventListener('keyup', (event) => {
//       if (event.keyCode === 13) {
//        event.preventDefault();
//        document.getElementById("button").click();
//       }
//     })  
//     // if (e.keyCode === 13 && !e.shiftKey) {
//     //     let boton = document.getElementById("search");
//     // }
// }


movieArrayPromise.then(renderMovie);