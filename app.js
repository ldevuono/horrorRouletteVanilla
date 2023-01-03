const horrorRoulette = {};

//api key
const key = "45f22f9138c47be66457a712c0db3872"
const form = document.querySelector("form");

// event listener to get user input (release year)
horrorRoulette.getYear = function () {
    form.addEventListener("change", function () {
        let year = document.getElementById("year").value;
        horrorRoulette.giveMeAMovie(year);
    })
}

//attach event listener to movie button
horrorRoulette.giveMeAMovie = function (year) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        horrorRoulette.getMovie(year);
    })
}

// method to call api
horrorRoulette.getMovie = function (year) {
    const horrorUrl = new URL(`https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=27&without_genres=10402,10751,35,16&include_adult=true&primary_release_year=${year}`)
    // vote_average = ${ userInput }
    //search params
    horrorRoulette.search = new URLSearchParams({
        api_key: key,
        primary_release_year: year,
        // vote_average: userInput,
        language: "en-US"
    });
    fetch(horrorUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (jsonRes) {
            const randomMovie = jsonRes.results[Math.floor(Math.random() * jsonRes.results.length)];
            horrorRoulette.displayMovies(randomMovie);
        });
}

//method to display movies on page
horrorRoulette.displayMovies = function (movie) {
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


// init method
horrorRoulette.init = function () {
    horrorRoulette.getYear()
};

horrorRoulette.init();