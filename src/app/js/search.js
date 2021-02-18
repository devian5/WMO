
const renderSearch = async (renderCollection) => {

    const divMovieElement = document.getElementById("searchMovie");
    
    divMovieElement.innerHTML = '';

    if (Array.isArray(renderCollection)) {
        console.log(renderCollection);
        renderCollection.map((movie) => {
            divMovieElement.innerHTML += `
                <div id='movies'>
                    <img src='https://image.tmdb.org/t/p/w400${movie.poster_path}'></img></div>
                    <div id='text'><h2>${movie.title}</h2>
                    <p>${movie.overview}</p>
                </div>
            `
        });
    }
    
    if (renderCollection.original_title){
        divMovieElement.innerHTML += `
            <div class='movies'>
                <img src='https://image.tmdb.org/t/p/w400${renderCollection.poster_path}' width='400px' class='picture'>
                </img></div><div class='movieInfo'><h2>${renderCollection.original_title}</h2><p>${renderCollection.overview}</p>
            </div>
        `   
    }
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

        // https://api.themoviedb.org/3/search/movie?api_key=c0b6dea31a9d647a6b7d1eafa59bacaa

        const url = `${baseUrl}/${param}/${endPoint}?api_key=${apiKey}&query=${query}`;

        const movie = await callPromise(url);

        renderSearch(movie);
        
        screenChange('mainScreen', 'front2');
    }
};

const searchId = async () => {
    if (event.keyCode === 13) {
        let query = exploreId.value;

        const urlId = `${baseUrl}/${endPoint}/${query}?api_key=${apiKey}`;
        
        const movie = await callPromise(urlId);

        renderSearch(movie);

        screenChange('mainScreen', 'front2');
    }
};

const screenChange = (present, future) => {
    let screenPresent = document.getElementById(present);
    let screenFuture = document.getElementById(future);

    screenPresent.style.display = 'none';
    screenFuture.style.display = 'grid';
};