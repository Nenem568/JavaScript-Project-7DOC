const body = document.body,
    html = document.documentElement,
    moviesList = document.querySelector(".movies-list")// Selecting the parente list and section which will show every movie

function renderMovie(movie){
    // Creating the const of each movie property
    const moviePoster = movie.image,
        movieName = document.createTextNode(movie.name),
        movieRating = document.createTextNode(movie.rating),
        movieFavorite = document.createTextNode("Favoritar"),
        movieDescription = document.createTextNode(movie.description);

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
    posterImg.alt = movie.name + " - Poster";
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

// List of dicts with all movies
let movies = [
    {name:"Batman (2022)",
    rating:"7.8",
    isFavorited:false,
    description:"Sinopse desconhecida",
    image:"https://i0.wp.com/br.nacaodamusica.com/wp-content/uploads/2022/03/the_batman-800x540.jpg"},

    {name:"Interstellar (2014)",
    rating:"8.6",
    isFavorited:true,
    description:"Uma equipe de exploradores viaja através de um buraco de minhoca no espaço, na tentativa de garantir a sobrevivência da humanidade.",
    image:"https://images.bauerhosting.com/legacy/empire-tmdb/films/157336/images/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg?format=jpg&quality=80&width=960&height=540&ratio=16-9&resize=aspectfill"
    },

    {name:"Avatar (2009)",
    rating:"7.9",
    isFavorited:false,
    description:"Um militar paraplégico despachado para a lua Pandora em uma missão única fica dividido entre seguir suas ordens e proteger o mundo que ele sente ser sua casa.",
    image:"https://s2.glbimg.com/T4CRp2Bwz6QyXh-3IfI-XzHjgvk=/e.glbimg.com/og/ed/f/original/2022/08/23/fa27tr6usaaajx1.jpg"
    },

    {name:"Avengers Endgame (2019)",
    rating:"8.4",
    isFavorited:true,
    description:"Após os eventos devastadores de Vingadores: Guerra Infinita , o universo está em ruínas, e com a ajuda de aliados os Vingadores se reúnem para desfazer as ações de Thanos e restaurar a ordem.",
    image:"https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg"
    },
]

// Rendering out each of the movies with in the movies array
movies.forEach(movie => {
    renderMovie(movie);
});














/* 2ND Way




Decided to test something and see if it would be easier. This is the second way to do this, in a very much simple way, faster but maybe cheating for some people, which you would need to create the HTML file first just like in the first way, but in this one you use the HTML inside `` so you can pass everything that should be written in the innerHTML and also changing what you would like to change:

const moviesList = document.querySelector(".movies-list")

function renderMovie(movie){
    moviesList.innerHTML += 
    `<div class="movie-container">
            <div class="poster-container">
                <img src="${movie.image}" alt="${movie.name} - Poster">
            </div>
            <div class="movie-info">
                <p class="movie-title">${movie.name}</p>
                <div class="rating-favorite">
                    <div class="rating">
                        <img src="./icons/Star.svg" alt="Star icon" class="star-icon">
                        <span>${movie.rating}</span>
                    </div>
                    <div class="favorite">
                        <a href="#favorite"><img src="./icons/Heart.svg" alt="Heart icon" class="heart-icon">
                        <span>Favoritar</span></a>
                    </div>
                </div>
            </div>
        <span class="movie-description">${movie.description}</span>
    </div>`
}

let movies = [
    {name:"Batman (2022)",
    rating:"7.8",
    isFavorited:false,
    description:"Sinopse desconhecida",
    image:"https://i0.wp.com/br.nacaodamusica.com/wp-content/uploads/2022/03/the_batman-800x540.jpg"},

    {name:"Interstellar (2014)",
    rating:"8.6",
    isFavorited:true,
    description:"Uma equipe de exploradores viaja através de um buraco de minhoca no espaço, na tentativa de garantir a sobrevivência da humanidade.",
    image:"https://images.bauerhosting.com/legacy/empire-tmdb/films/157336/images/xu9zaAevzQ5nnrsXN6JcahLnG4i.jpg?format=jpg&quality=80&width=960&height=540&ratio=16-9&resize=aspectfill"
    },

    {name:"Avatar (2009)",
    rating:"7.9",
    isFavorited:false,
    description:"Um militar paraplégico despachado para a lua Pandora em uma missão única fica dividido entre seguir suas ordens e proteger o mundo que ele sente ser sua casa.",
    image:"https://s2.glbimg.com/T4CRp2Bwz6QyXh-3IfI-XzHjgvk=/e.glbimg.com/og/ed/f/original/2022/08/23/fa27tr6usaaajx1.jpg"
    },

    {name:"Avengers Endgame (2019)",
    rating:"8.4",
    isFavorited:true,
    description:"Após os eventos devastadores de Vingadores: Guerra Infinita , o universo está em ruínas, e com a ajuda de aliados os Vingadores se reúnem para desfazer as ações de Thanos e restaurar a ordem.",
    image:"https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_.jpg"
    },
]

movies.forEach(movie => {
    renderMovie(movie)
}); */