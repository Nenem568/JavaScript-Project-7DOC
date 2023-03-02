import { saveToLocalStorage, checkFavorite } from "./localStorage.js";
import { moviesList } from "./script.js";

// RENDER FUNCTION
    // Render function to render movies from an array to the site
    export function renderMovie(movie){
        // If search API gives out no result, it prints "Nothing FogetFavoriteMoviesund"
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
            moviePoster = "./img/nocontentfound.png"
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
        movieRatingIcon.src = "./img/Star.svg";
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
            heartIcon.src = "./img/Heart.svg"
            isFavorited = false
        } else {
            heartIcon.src = "./img/FilledHeart.svg";
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
                heartIcon.src = "./img/Heart.svg"
                isFavorited = false
                saveToLocalStorage(movieId)// Removing it from the favorite array
            } else {
                heartIcon.src = "./img/FilledHeart.svg"
                isFavorited = true
                saveToLocalStorage(movieId)// Adding it to the favorite array
        }})

        // Creating and giving the movie it's respective description
        const movieDescriptionP = document.createElement("span");
        movieDescriptionP.classList.add("movie-description");
        movieDescriptionP.appendChild(movieDescription);
        movieElement.appendChild(movieDescriptionP);
    }