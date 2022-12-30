const horrorRoulette = {};

//api key
const key = "45f22f9138c47be66457a712c0db3872"
const year = 2022

// method to call api
horrorRoulette.getMovie = function () {
    const horrorUrl = new URL(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=27&without_genres=10402,10751,35,16&primary_release_year=${year}`)

    //search params
    horrorRoulette.search = new URLSearchParams({
        api_key: key,
        primary_release_year: year,
        language: "en-US"
    });

    fetch(horrorUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (jsonRes) {
            console.log(jsonRes.results);
            const randomMovie = jsonRes.results[Math.floor(Math.random() * jsonRes.results.length)];
            horrorRoulette.displayMovies(randomMovie);
            console.log(randomMovie)
        });
}

//method to display movies on page
horrorRoulette.displayMovies = function (movie) {
    // movies.forEach(function (movie) {
    //     const movieTitle = document.createElement("h3");
    //     movieTitle.innerHTML = movie.original_title;
    //     const movieList = document.querySelector("ul")
    //     movieList.appendChild(movieTitle);
    // })
    document.querySelector("ul").innerHTML = " ";
    const movieTitle = document.createElement("h3");
    movieTitle.innerHTML = movie.title;
    const movieDesc = document.createElement("p");
    movieDesc.innerHTML = movie.overview;
    const movieList = document.querySelector("ul")
    const poster = document.createElement("img");
    poster.src = `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    movieList.appendChild(movieTitle);
    movieList.appendChild(poster);
    movieList.appendChild(movieDesc);


}

// event listener to trigger api call
horrorRoulette.movieButton = function () {
    document.querySelector("button").addEventListener("click", function (e) {
        horrorRoulette.getMovie();
    })
}

// init method
horrorRoulette.init = function () {
    horrorRoulette.movieButton()
};

horrorRoulette.init();