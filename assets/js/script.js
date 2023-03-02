import API_KEY from "./api.js"; // Api Key stored in a safe file
// import { renderMovie } from "./renderMovie.js";
// import { saveToLocalStorage, getFavoriteMovies, checkFavorite, checkboxListener } from "./localStorage.js";
import { gettingMovies } from "./apiWork.js"; //getSingleMovie

window.onload = hasSearched()

// Default variables
export const body = document.body,
    html = document.documentElement,
    moviesList = document.querySelector(".movies-list");// Selecting the parent section which will show every movie

// Initiate the site, if there's a search, it searchs for that request
// If there wans't, it show the trending movies
export function hasSearched() {
    if (window.location.search) {
        const searchMovieName = window.location.search.replace("?search-movie=", "")
        gettingMovies(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&query=${searchMovieName}&page=1&include_adult=false`)
    } else {
        const popularMovies = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        gettingMovies(popularMovies);
    }
}

// If form is empty, don't make a search
document.querySelector("form").addEventListener("submit", (e)=>{
    if (!document.querySelector("#search").value){
        e.preventDefault()
    }
})


