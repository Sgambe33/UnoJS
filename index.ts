import { generateDeck, shuffleDeck } from './card_utils';
import { CartaColorataNumerata, Carta, CartaColorataNonNumerata, CartaSpeciale } from './classes';
const fs = require('fs');

//create websocket server
import * as WebSocket from 'ws';
const server = new WebSocket.Server({ port: 8080 });


let sockets: WebSocket[] = [];

let deck: Carta[] = generateDeck();
deck = shuffleDeck(deck);

server.on('connection', function(socket: WebSocket) {

  sockets.push(socket);
  console.log('Connected: ' + sockets.length + ' sockets(s) connected');
  deck = shuffleDeck(deck);

  for(let i = 0; i < sockets.length; i++){
    //send file to client
    for( let j = 0; j < 7; j++){
      console.log(deck[j].immagine);
      var image = fs.readFileSync(deck[j].immagine);
      sockets[i].send(image, {binary: true});
    }
  }

  // When you receive a message, send that message to every socket.
  socket.on('message', function(msg: String) {
    sockets.forEach(s => s.send(msg));
  });

  // When a socket closes, or disconnects, remove it from the array.
  socket.on('close', function() {
    sockets = sockets.filter(s => s !== socket);
  });
});
