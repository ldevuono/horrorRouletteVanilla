const horrorRoulette = {};

//api key
const key = "45f22f9138c47be66457a712c0db3872"

// method to call api
horrorRoulette.getMovie = function () {
    const horrorUrl = new URL(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=27&sort_by=vote_average.desc&vote_count.gte=10`)

    //search params
    horrorRoulette.search = new URLSearchParams({
        api_key: key,
        with_genres: "horror"
    });

    fetch(horrorUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (jsonRes) {
            console.log(jsonRes.results);
            horrorRoulette.displayMovies(jsonRes.results);
        });
}

//method to display movies on page
horrorRoulette.displayMovies = function (movies) {
    movies.forEach(function (movie) {
        const movieTitle = document.createElement("h3");
        movieTitle.innerHTML = movie.original_title;
        const movieList = document.querySelector("ul")
        movieList.appendChild(movieTitle);
    })
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