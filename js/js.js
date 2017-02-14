$(document).ready(function () {
    var gameList = document.getElementById("gameList"),
        gameButton = document.getElementById("gameButton"),
        pageNum = 0,
        prevButton = document.getElementById("previous"),
        nextButton = document.getElementById("next"),
        gameData = document.getElementById("gameData"),
        searchGame = document.getElementById("searchGame"),
        gamesUri = "https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=*&limit=10&offset={{page}}&order=release_dates.date%3Adesc&search=",
        youtubeTemp = "<iframe class=\"embed-responsive-item\" src=\"https://www.youtube.com/embed/{{youtubeID}}\" frameborder=\"0\" allowfullscreen></iframe>";
        gameDB = {};
    var eventHandler = function eventHandler(evnt){
        gameData.innerHTML = "";
        var gameId = evnt.currentTarget.id,
            game = gameDB[gameId],
            head3 = document.createElement("h3"),
            sumDiv = document.createElement("div"),
            coverImg = document.createElement("img"),
            linkButton = document.createElement("a"),
            releaseDates = game.release_dates,
            gameVideos = game.videos;

            sumDiv.innerHTML = game.summary || "No Summary Found.";
            head3.innerText = game.name;
            linkButton.href = game.url;
            linkButton.innerText = "IGDB Page";
            linkButton.classList.add("btn");
            linkButton.classList.add("btn-success");

            if(game.cover){
                coverImg.src = game.cover.url;
            };

            if(releaseDates){
                var dateHead = document.createElement("h3");
                dateHead.innerText = "Release Date(s):";
                sumDiv.appendChild(dateHead);
                 releaseDates.forEach(function(date){
                var head4 = document.createElement("h4");

                head4.innerText = date.human;
                sumDiv.appendChild(head4);
                });
            };

            if(gameVideos){
                gameVideos.forEach(function(video){
                    var videoDiv = document.createElement("div");

                    videoDiv.classList.add("embed-responsive");
                    videoDiv.classList.add("embed-responsive-16by9");
                    videoDiv.innerHTML = youtubeTemp.replace("{{youtubeID}}", video.video_id);

                    sumDiv.appendChild(videoDiv);
                });
            }


           
            gameData.appendChild(head3);
            gameData.appendChild(sumDiv);
            gameData.appendChild(coverImg);
            gameData.appendChild(linkButton);
    };

    var searchFunction = function searchFunction(){
        var uri = gamesUri.replace("{{page}}", pageNum*10);
        $.ajax({
            method: "GET",
            url: uri + searchGame.value,
            headers: {'X-Mashape-Key': 'rEBY1HLvaFmshm5i2THU9cOrtMYNp1PiP4yjsnbH2afPajCGqU', 'Accept': 'application/json'}
        })
            .done(function (gDat) {
                gameList.innerHTML = "";
                gameDB = {};
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
    }

    gameButton.addEventListener("click", searchFunction);
    nextButton.addEventListener("click", function(){
        gameCount = Object.keys(gameDB).length;
        if(gameCount == 10){
            pageNum++;
            searchFunction();
        };
    });
    prevButton.addEventListener("click", function(){
        if(pageNum > 0){
            pageNum--;
            searchFunction();
        };
    });
});