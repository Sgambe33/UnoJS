let gameRooms = document.getElementById('gamerooms');

fetch('/api/getgamerooms').then((response) => {
    response.json().then((data) => {
        data.forEach((room) => {
            gameRooms.innerHTML += `<li><a href="game.html?room=${room.id}">STANZA 1</a> ${room.players.length} Giocatori</li>`;
        });
    });
});

function createGameRoom(){
    //switch page
    fetch('/api/newgameroom', {
        method: 'POST',
    }).then((response) => {
        response.json().then((data) => {
            window.location.href = "game.html?room=" + data.roomId;
        });
    });
    window.location.href = "game.html?room=" + 1;
}