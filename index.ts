import { generateDeck, shuffleDeck } from './card_utils';
import {Carta, GameRoom} from './classes';
import {v4 as uuidv4} from 'uuid';
import * as WebSocket from 'ws';


const cors= require('cors');
const fs = require('fs');
const path = require('path');
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, `public`)));
app.use("/cards_images", express.static(path.join(__dirname, `cards_images`)))

var module_files = fs.readdirSync(path.resolve(__dirname, `routes`), {
  withFileTypes: true,
});
module_files.forEach((file) => {
  if (!file.name.endsWith(`.ts`)) {
    return;
  }
  let handler_file = require(path.join(__dirname, `routes`, file.name).replace(`.ts`, ``));
  let route = handler_file.base_route;
  console.log(handler_file)
  let handler = handler_file.handler();

  app.use(`/api${route}`, cors(), handler);
});

server.listen(3000, function() {
  console.log('Listening on : http://localhost:3000');
});


/////////////////////////////////////////////////////////////////////////////////

export let gameRooms: GameRoom[] = [];

//Use socket.io
io.on('connection', (socket: any) => {

  socket.on("message", (msg: any) => {

    let decodedMsg = JSON.parse(msg);

    switch (decodedMsg.method) {
        case "joinRoom":
          if(gameRooms.some((room) => room.id == decodedMsg.roomId)) {
            socket.join(decodedMsg.roomId);
            console.log("A user joined room: " + decodedMsg.roomId);
            let index = gameRooms.findIndex((room) => room.id == decodedMsg.roomId);
            if (index != -1) {
              gameRooms[index].players.push(socket.id);
            }
            let payload = {
                "method": "setCentralCard",
                "card": gameRooms[index].playedCards[0]
            }
            socket.send(JSON.stringify(payload));
          } else {
            console.log("A user tried to join an unexisting room: " + decodedMsg.roomId);
            socket.disconnect();
          }
          break;
        case "requestCards":
            let room = gameRooms.find((room) => room.players.includes(socket.id));

            if(room){

                let cards = room.deck.splice(0, 7);
                console.log("Sending "+ cards.length +" cards to player "+socket.id + " in room "+room.id);
                let payload = {
                    "method": "setPlayerCards",
                    "cards": cards
                }
                socket.send(JSON.stringify(payload));
                room.playersCards.set(socket.id, cards);
            }
            break;
        case "playCard":
            let roomToPlay = gameRooms.find((room) => room.players.includes(socket.id));
            let playedCard = new Carta(decodedMsg.card.tipo, decodedMsg.card.colore, decodedMsg.card.urlImmagine, decodedMsg.card.numero);
            let playerHasPlayedCard: boolean = roomToPlay.playersCards.get(socket.id).some((card) => {
                return card.tipo == playedCard.tipo && card.colore == playedCard.colore && card.numero == playedCard.numero;
            });

            console.log(roomToPlay.playersCards.get(socket.id).length);

            if(playerHasPlayedCard) {
                console.log("A user played a card in room "+roomToPlay.id);
                console.log(roomToPlay.playedCards[roomToPlay.playedCards.length-1]);
                if(canCardBePlayed(playedCard, roomToPlay.playedCards[roomToPlay.playedCards.length-1])) {
                    console.log("A user played a valid card");
                }
            } else {
                console.log("LISTEN HERE YOU LITTLE SHIT, DON'T CHEAT")
            }
            break;



      default:
        console.log(decodedMsg);
    }
  });
  function canCardBePlayed(card: Carta, centralCard: Carta): boolean{
      if (card.colore != "null" && card.colore == centralCard.colore) {
          return true;
      } else if (card.numero != -1 && card.numero == centralCard.numero) {
          return true;
      } else if (card.tipo != "standard" && card.tipo == centralCard.tipo) {
          return true;
      } else return card.colore == "null";
  }
  socket.on("disconnect", () => {
    //Search the user in every room
    gameRooms.forEach((room) => {

        if(room.players.includes(socket.id)){
            room.players.splice(room.players.indexOf(socket.id), 1);
            console.log("A user disconnected from room "+room.id);
            // if(room.players.length == 0){
            //   gameRooms.splice(gameRooms.indexOf(room), 1);
            //   console.log("Empty room deleted (room "+room.id+")");
            // } Commented for testing purposes
            return;
        }
    });
  });

});
let sockets = new Map<string, WebSocket>();






























//server.on('connection', function(socket: WebSocket) {
//  let playedCards: Carta[] = [];
//  let playersCards = new Map<string, Carta[]>();
//  let uuid = uuidv4();
//
//  sockets.set(uuid, socket);
//  playersCards.set(uuid, []);
//
//  console.log('Connected: ' + sockets.size + ' sockets(s) connected');
//  deck = shuffleDeck(deck);
//
//  let cards = deck.splice(0, 7);
//  let payload = {
//    "method": "setPlayerCards",
//    "cards": cards
//  }
//  playersCards.set(uuid, cards);
//
//  sockets.get(uuid).send(JSON.stringify(payload));
//
//  // When you receive a message, send that message to eve1\y socket.
//  socket.on('message', function(msg: string) {
//    console.log('Message Received: ' + msg);
//    let decodedMsg = JSON.parse(msg);
//    switch (decodedMsg.method) {
//        case "playCard":
//          break;
//        case "drawCard":
//          break;
//      case "joinRoom":
//        gameRooms[0].players.push(uuid);
//        sockets.get(uuid).send(JSON.stringify({"Success": true}));
//        break;
//      default:
//        console.log(decodedMsg);
//        break;
//    }
//  });
//
//  // When a socket closes, or disconnects, remove it from the array.
//  socket.on('close', function() {
//    sockets.values()
//
//  });
//});
