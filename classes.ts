import { generateDeck, shuffleDeck} from "./card_utils";

export class Carta {
    urlImmagine: String;
    colore: String;
    tipo: String;
    numero: Number;

    constructor(tipo: String, colore: String,urlImmagine: String, numero: Number) {
        this.urlImmagine = urlImmagine;
        this.colore = colore;
        this.tipo = tipo;
        this.numero = numero;
    }
    get immagine() {
        return this.urlImmagine
    }
}

export class GameRoom {
    id: String;
    players: String[];
    status: String;
    deck: Carta[];
    playedCards: Carta[];
    playersCards: Map<String, Carta[]>;

    constructor(id: String, players: String[], status: String) {
        this.id = id;
        this.players = players;
        this.status = status;
        this.playedCards = [];
        this.playersCards = new Map<String, Carta[]>();
        this.deck = shuffleDeck(generateDeck());
    }
}