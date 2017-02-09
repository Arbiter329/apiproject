$(document).ready(function () {
    var gameList = document.getElementById("gameList"),
        gameButton = document.getElementById("gameButton"),
        searchGame = document.getElementById("searchGame"),
        gamesUri = "https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name&limit=10&offset=0&order=release_dates.date%3Adesc&search=";

    gameButton.addEventListener("click", function () {
        $.ajax({
            method: "GET",
            url: gamesUri + searchGame.value,
            headers: {'X-Mashape-Key': 'rEBY1HLvaFmshm5i2THU9cOrtMYNp1PiP4yjsnbH2afPajCGqU', 'Accept': 'application/json'}
        })
            .done(function (msg) {
                alert("Data Saved: " + msg);
            });
    });
});