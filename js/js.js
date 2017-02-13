$(document).ready(function () {
    var gameList = document.getElementById("gameList"),
        gameButton = document.getElementById("gameButton"),
        pageNum = 0,
        gameData = document.getElementById("gameData"),
        searchGame = document.getElementById("searchGame"),
        gamesUri = "https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&limit=10&offset={{page}}&order=release_dates.date%3Adesc&search=",
        gameDB = {};
    var eventHandler = function eventHandler(evnt){
        gameData.innerHTML = "";
        var gameId = evnt.currentTarget.id,
            game = gameDB[gameId],
            head3 = document.createElement("h3"),
            sumDiv = document.createElement("div");
            sumDiv.innerHTML = game.summary;
            head3.innerText = game.name;
            gameData.appendChild(head3);
            gameData.appendChild(sumDiv);
    };
    gameButton.addEventListener("click", function () {
        var uri = gamesUri.replace("{{page}}", pageNum*10);
        $.ajax({
            method: "GET",
            url: uri + searchGame.value,
            headers: {'X-Mashape-Key': 'rEBY1HLvaFmshm5i2THU9cOrtMYNp1PiP4yjsnbH2afPajCGqU', 'Accept': 'application/json'}
        })
            .done(function (gDat) {
                gameList.innerHTML = "";
                console.log(JSON.stringify(gDat));
                gDat.forEach(function(item){
                    gameDB[item.id] = item;
                    var listItem = document.createElement("li");
                    listItem.classList.add("list-group-item");
                    listItem.id = item.id;
                    listItem.innerText = item.name;
                    listItem.addEventListener("click", eventHandler);
                    gameList.appendChild(listItem);
                });
            });
    });
});