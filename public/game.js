const dialog = document.getElementById("myDialog");
const cartaCentrale = document.getElementById("cartacentrale");
let chosenColor = null;

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
    console.log(socket);
});

socket.on("data", (event) => {
    console.log(event.data);

    let obj = JSON.parse(event.data);

    if (obj["method"] === "setPlayerCards") {
        obj["cards"].forEach(card => {
            let img = new Image();
            img.src = "http://localhost:3000/" + card["urlImmagine"];
            img.setAttribute("colore", card["colore"]);

            if ("numero" in card) img.setAttribute("numero", card["numero"]);
            if ("tipo" in card) {
                img.setAttribute("tipo", card["tipo"]);
            } else {
                img.setAttribute("tipo", null);
            }
            if ("colore" in card) img.setAttribute("colore", card["colore"]);

            if (document.getElementById("cartegiocatore").childElementCount > 0) {
                img.className = "rest";
            }

            img.onclick = function () {
                console.log(this);
                if (puoiGiocareCarta(cartaCentrale, this)) {
                    playCard(this);
                    this.remove();
                }
            };
            // Add the image to the webpage
            document.getElementById("cartegiocatore").appendChild(img);
        });


    }
});

socket.on("disconnect", (event) => {
    console.log("Socket closed");
    socket.send(JSON.stringify({"method": "leaveRoom"}));
});

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

