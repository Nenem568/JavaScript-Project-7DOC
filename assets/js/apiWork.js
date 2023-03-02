import { renderMovie } from "./renderMovie.js";

// ASYNC FUNCTIONS
    // Gets the movies array and calls for render function
    export async function gettingMovies(link) {
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
    export async function getSingleMovie(link){
        try {
            const fetchResponse = await fetch(link);
            renderMovie(await fetchResponse.json())
        } catch (error) {
            console.log({error});
        }
    }