import {GameRoom} from "../classes";

const express = require(`express`);
import { gameRooms } from "../index";
import { v4 as uuidv4 } from "uuid";
function estraiPrimaCarta(gameroom: GameRoom) {
    let newCard = gameroom.deck.shift();
    while (newCard.tipo != "standard") {
        console.log("Estratta una carta non standard: " + newCard);
        gameroom.deck.push(newCard);
        newCard = gameroom.deck.shift();
    }
    return newCard;
}
module.exports = {
    base_route: `/newgameroom`,
    handler: () => {
        const route = express.Router({ caseSensitive: false });

        route.post(``, (req, res) => {

            let newUuid = uuidv4();
            console.log("Creating new gameroom requested by client with ID: "+newUuid);
            let newGameRoom = new GameRoom(newUuid, [], "waiting");
            newGameRoom.playedCards.push(estraiPrimaCarta(newGameRoom));
            gameRooms.push(newGameRoom);
            res.status(200).json({roomId: newUuid});
        });
        return route;
    }
}