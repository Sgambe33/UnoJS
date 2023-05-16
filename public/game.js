const dialog = document.getElementById("myDialog");
const cartaCentrale = document.getElementById("cartacentrale");
let chosenColor = null;
let carteGiocatore = document.getElementById("cartegiocatore1");
console.log("ROOM ID:" + location.search.replace("?room=", ""));

const socket = io();

socket.on("connect", () => {
    console.log(socket.id); // x8WIv7-mJelg7on_ALbx
    let payload = {
        "method": "joinRoom",
        "roomId": location.search.replace("?room=", "")
    }
    console.log("Joining room");
    socket.send(JSON.stringify(payload), (err) => {
        console.log(err);
    });
    socket.send(JSON.stringify({"method": "requestCards"}), (err) => {
        console.log(err);
    });

});

socket.on("message", (event) => {
    console.log(event);

    let answer = JSON.parse(event);

    switch (answer.method) {
        case "setPlayerCards":
            console.log(answer.cards);
            answer.cards.forEach(card => {
                let img = new Image();
                img.src = "http://localhost:3000/" + card.urlImmagine;
                img.setAttribute("colore", card.colore);
                img.setAttribute("numero", card.numero);
                img.setAttribute("tipo", card.tipo);
                if (carteGiocatore.childElementCount > 0) {
                    img.className = "rest";
                }
                img.addEventListener("click", (event) => {
                    giocaCarta(img);
                });
                document.getElementById("cartegiocatore1").appendChild(img.cloneNode(true));
                document.getElementById("cartegiocatore2").appendChild(img.cloneNode(true));
                document.getElementById("cartegiocatore3").appendChild(img.cloneNode(true));
                document.getElementById("cartegiocatore4").appendChild(img.cloneNode(true));
            });
            break;

        case "setCentralCard":
            console.log("Setting central card to " + answer.card);
            cartaCentrale.src = "http://localhost:3000/" + answer.card.urlImmagine;
            cartaCentrale.setAttribute("colore", answer.card.colore);
            cartaCentrale.setAttribute("numero", answer.card.numero.toString());
            cartaCentrale.setAttribute("tipo", answer.card.tipo);
            break;
    }
});

socket.on("disconnect", (event) => {
    console.log("Socket closed");
    socket.send(JSON.stringify({"method": "leaveRoom"}));
});

function giocaCarta(carta) {
    let payload = {
        "method": "playCard",
        "card": {
            "colore": carta.getAttribute("colore"),
            "numero": parseInt(carta.getAttribute("numero")),
            "tipo": carta.getAttribute("tipo"),
            "urlImmagine": carta.src.replace("http://localhost:3000/", "")
        }
    }
    socket.send(JSON.stringify(payload), (err) => {
        console.log(err);
    });
}
function puoiGiocareCarta(cartaCentrale, cartaGiocatore) {
    if (cartaGiocatore.getAttribute("colore") != "null" && cartaGiocatore.getAttribute("colore") == cartaCentrale.getAttribute("colore")) {
        return true;
    } else if (cartaGiocatore.getAttribute("numero") != "null" && cartaGiocatore.getAttribute("numero") == cartaCentrale.getAttribute("numero")) {
        return true;
    } else if (cartaGiocatore.getAttribute("tipo") != "null" && cartaGiocatore.getAttribute("tipo") == cartaCentrale.getAttribute("tipo")) {
        return true;
    } else if (cartaGiocatore.getAttribute("colore") == "undefined") {
        return true;
    } else {
        return false;
    }
}

