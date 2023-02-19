import API_KEY from "./api.js";

const body = document.body,
    html = document.documentElement,
    moviesList = document.querySelector(".movies-list")// Selecting the parente list and section which will show every movie

function renderMovie(movie, title){
    // Creating the const of each movie property
    const movieName = document.createTextNode(title),
        moviePoster = "https://image.tmdb.org/t/p/w200" + movie.poster_path,
        movieRating = document.createTextNode(movie.vote_average.toPrecision(2)),
        movieFavorite = document.createTextNode("Favoritar"),
        movieDescription = document.createTextNode(movie.overview);

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
    movieRatingIcon.src = "./icons/Star.svg";
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
    heartIcon.src = "./icons/Heart.svg";
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

window.onload = async function gettingMovies() {
    try {
        const fetchResponse = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`),
            data = await fetchResponse.json();

        data.results.forEach(movie => {
            const name = movie.name,
                originalName = movie.original_name,
                title = movie.title,
                movieFinalTitle = (name, originalName, title) => {
                if (name){
                    return name
                }else if(originalName){
                    return originalName
                }else if(title){
                    return title
                }
            }
            renderMovie(movie, movieFinalTitle(name, originalName, title))
        });
    } catch (error) {
        console.log({error});
    }
}