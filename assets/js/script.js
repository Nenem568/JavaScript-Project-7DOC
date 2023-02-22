import API_KEY from "./api.js"; // Api Key stored in a safe file

// Initiate the site, if there's a search, it searchs for that request
// If there wans't it show the trending movies
if (window.location.search) {
    const searchMovieName = window.location.search.replace("?search-movie=", "")
    window.onload = gettingMovies(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchMovieName}&page=1&include_adult=false`)
} else {
    const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    window.onload = gettingMovies(popularMovies);
}

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

// Default variables
const body = document.body,
    html = document.documentElement,
    moviesList = document.querySelector(".movies-list")// Selecting the parent list and section which will show every movie

// Render function to render movies from an array to the site
function renderMovie(movie){
    if (movie === "no movie"){
        const noMovie = document.createElement("h1")
        noMovie.textContent = "Nothing found"
        document.querySelector(".movies-list").appendChild(noMovie)
    }

    // Creating the const of each movie property
    const movieName = document.createTextNode(movie.title),
        moviePoster = "https://image.tmdb.org/t/p/w200" + movie.poster_path,
        movieRating = document.createTextNode(movie.vote_average.toPrecision(2)),
        movieFavorite = document.createTextNode("Favorite"),
        movieDescription = document.createTextNode(movie.overview),
        isFavorited = false;

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
    favoriteAction.href = "#favorite";
    favorite.appendChild(favoriteAction);
    const heartIcon = new Image;//Favorite icon
    heartIcon.src = "../icons/Heart.svg";
    heartIcon.alt = "Heart icon";
    heartIcon.classList.add("heart-icon");
    favoriteAction.appendChild(heartIcon);
    const favoriteSpan = document.createElement("span");//Favorite Span "Favoritar"
    favoriteSpan.appendChild(movieFavorite);
    favoriteAction.appendChild(favoriteSpan);

    // Creating and giving the movie it's respective description
    const movieDescriptionP = document.createElement("span");
    movieDescriptionP.classList.add("movie-description");
    movieDescriptionP.appendChild(movieDescription);
    movieElement.appendChild(movieDescriptionP);
}