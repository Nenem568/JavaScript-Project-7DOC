import API_KEY from "./api.js"; // Api Key stored in a safe file
import { getSingleMovie } from "./apiWork.js";
import { moviesList, hasSearched } from "./script.js";

// FUNCTIONS
    // If the movie isn't in the local storage, adds it to the array and sets to the local storage :if
    // if it already is, it deletes it :else
    // :favoriteMovies - localStorage key
    export function saveToLocalStorage(movie){
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
    export function checkFavorite(movie){
        const movies = getFavoriteMovies()
        if (movies.indexOf(movie) === -1){
            return false
        }else{
            return true
        }
    }


// Selects the checkbox on the DOM and wait for it to change
// then it clears the DOM and renders only the favorite movies
// or if checkbox unselected it returns to the original
// either trending page or search page
export const checkboxListener = document.querySelector("input[type='checkbox']").addEventListener("change", (e) => {
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