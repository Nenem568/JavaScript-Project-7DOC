import API_KEY from "./api.js"; // Api Key stored in a safe file

window.onload = hasSearched()

// Selects the checkbox on the DOM and wait for it to change
// then it clears the DOM and renders only the favorite movies
// or if checkbox unselected it returns to the original
// either trending page or search page
document.querySelector("input[type='checkbox']").addEventListener("change", (e) => {
    if (e.target.checked){
        moviesList.innerHTML = "";
        const movies = JSON.parse(localStorage.getItem("favoriteMovies"));
        if (movies.length === 0){
            const noFavoriteSelected = document.createElement("h1");
            noFavoriteSelected.innerText = "You have not marked anything as favorite";
            moviesList.appendChild(noFavoriteSelected);
        }
        movies.forEach(movie => {
            getSingleMovie(`https://api.themoviedb.org/3/movie/${movie}?api_key=${API_KEY}&language=en-US`)
        })
} else{
    moviesList.innerHTML = "";
    hasSearched()
}})

// ASYNC FUNCTIONS
    // Gets the movies array and calls for render function
    async function gettingMovies(link) {
        try {
            const fetchResponse = await fetch(link),
                data = await fetchResponse.json();
            if (data.results.length === 0) {
                renderMovie("no movie")
            } else { 
                data.results.forEach(movie => {
                    renderMovie(movie)
            })};
        } catch (error) {
            console.log({error});
        }
    }

    // Get the exact movie from the API and renders it
    async function getSingleMovie(link){
        try {
            const fetchResponse = await fetch(link);
            renderMovie(await fetchResponse.json())
        } catch (error) {
            console.log({error});
        }
    }

// FUNCTIONS
    // If the movie isn't in the local storage, adds it to the array and sets to the local storage :if
    // if it already is, it deletes it :else
    // :favoriteMovies - localStorage key
    function saveToLocalStorage(movie){
        const movies = getFavoriteMovies()
        if (movies.indexOf(movie) === -1 || undefined){
            movies.push(movie)
            localStorage.setItem("favoriteMovies", JSON.stringify(movies))
        }else{
            const movieIndex = movies.indexOf(movie)
            movies.splice(movieIndex, 1)
            localStorage.setItem("favoriteMovies", JSON.stringify(movies))
        }
    }
    // Gets the localStorage key or creates it when there isn't one
    function getFavoriteMovies(){
        if(!localStorage.getItem("favoriteMovies")){
            localStorage.setItem("favoriteMovies", JSON.stringify([]))
            return localStorage.getItem("favoriteMovies")
        } else{
            return JSON.parse(localStorage.getItem("favoriteMovies"))
    }}
    // Checks if the movie is favorited on refresh and returns its value
    function checkFavorite(movie){
        const movies = getFavoriteMovies()
        if (movies.indexOf(movie) === -1){
            return false
        }else{
            return true
        }
    }

    // Initiate the site, if there's a search, it searchs for that request
    // If there wans't, it show the trending movies
    function hasSearched() {
        if (window.location.search) {
            const searchMovieName = window.location.search.replace("?search-movie=", "")
            gettingMovies(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchMovieName}&page=1&include_adult=false`)
        } else {
            const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
            gettingMovies(popularMovies);
        }
    }

// Default variables
const body = document.body,
    html = document.documentElement,
    moviesList = document.querySelector(".movies-list");// Selecting the parent section which will show every movie

// RENDER FUNCTION
    // Render function to render movies from an array to the site
    function renderMovie(movie){
        // If search API gives out no result, it prints "Nothing Found"
        if (movie === "no movie"){
            const noMovie = document.createElement("h1")
            noMovie.textContent = "Nothing found"
            moviesList.appendChild(noMovie)
        }

        // Creating the const of each movie property
        const movieName = document.createTextNode(movie.title),
            movieRating = document.createTextNode(movie.vote_average.toPrecision(2)),
            movieFavorite = document.createTextNode("Favorite"),
            movieId = movie.id;
        let moviePoster = "https://image.tmdb.org/t/p/w500" + movie.poster_path,
            movieDescription = document.createTextNode(movie.overview),
            isFavorited = false;

        // If it hasn't a poster
        // If it hasn't a description
        if (movie.poster_path == null) {
            moviePoster = "../icons/nocontentfound.png"
        }
        if (movie.overview === ""){
            movieDescription = document.createTextNode("THIS CONTENT HAS NO DESCRIPTION."
        )}
        
        // Creating the element who is parent to it all
        const movieElement = document.createElement("div");
        movieElement.classList.add("movie-container");
        moviesList.appendChild(movieElement);

        // Creating the movie container
        const movieInfo = document.createElement("div");
        movieInfo.classList.add("movie-info");
        movieElement.appendChild(movieInfo);

        // Creating the movie poster container and setting it's respective image
        const posterContainer = document.createElement("div");
        posterContainer.classList.add("poster-container");
        movieElement.appendChild(posterContainer);
        const posterImg = new Image;
        posterImg.src = moviePoster;
        posterImg.alt = movieName + " - Poster";
        posterContainer.appendChild(posterImg);

        // Creating and giving the movie it's respective title
        const movieTitle = document.createElement("p");
        movieTitle.classList.add("movie-title");
        movieTitle.appendChild(movieName);
        movieInfo.appendChild(movieTitle);

        // Creating the div for Rating and Favorite
        const ratingFavorite = document.createElement("div");
        ratingFavorite.classList.add("rating-favorite");
        movieInfo.appendChild(ratingFavorite);

        // Creating and giving the movie it's respective rating note
        const rating = document.createElement("div");//Rating div
        rating.classList.add("rating");
        ratingFavorite.appendChild(rating);
        const movieRatingIcon = new Image;//Rating icon
        movieRatingIcon.src = "../icons/Star.svg";
        movieRatingIcon.alt = "Star icon";
        movieRatingIcon.classList.add("star-icon");
        rating.appendChild(movieRatingIcon);
        const ratingSpan = document.createElement("span");//Rating note
        ratingSpan.appendChild(movieRating);
        rating.appendChild(ratingSpan);

        // Creating and giving the movie the favorite option
        const favorite = document.createElement("div");//Favorite div
        favorite.classList.add("favorite");
        ratingFavorite.appendChild(favorite);
        const favoriteAction = document.createElement("a");//Making movie favorite Action
        favoriteAction.name = "favoriteOption";
        favorite.appendChild(favoriteAction);
        const heartIcon = new Image;//Favorite icon
        // If it's already in the favoriteMovies array, give it the
        // filled Heart icon, if it isn't, gives it the normal one 
        if (!checkFavorite(movieId)){
            heartIcon.src = "../icons/Heart.svg"
            isFavorited = false
        } else {
            heartIcon.src = "../icons/FilledHeart.svg";
            isFavorited = true;
        }
        heartIcon.alt = "Heart icon";
        heartIcon.classList.add("heart-icon");
        favoriteAction.appendChild(heartIcon);
        const favoriteSpan = document.createElement("span");//Favorite Span "Favoritar"
        favoriteSpan.appendChild(movieFavorite);
        favoriteAction.appendChild(favoriteSpan);
        // Making movie favorite or unfavorite (using its ID) with click Event Listener
        favoriteAction.addEventListener("click", () => {
            if (isFavorited){
                heartIcon.src = "../icons/Heart.svg"
                isFavorited = false
                saveToLocalStorage(movieId)// Removing it from the favorite array
            } else {
                heartIcon.src = "../icons/FilledHeart.svg"
                isFavorited = true
                saveToLocalStorage(movieId)// Adding it to the favorite array
        }})

        // Creating and giving the movie it's respective description
        const movieDescriptionP = document.createElement("span");
        movieDescriptionP.classList.add("movie-description");
        movieDescriptionP.appendChild(movieDescription);
        movieElement.appendChild(movieDescriptionP);
    }