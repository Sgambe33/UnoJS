export class Carta {
    urlImmagine: String;
    constructor(urlImmagine: String) {
        this.urlImmagine = urlImmagine
    }
    get immagine() {
        return this.urlImmagine
    }
}

export class CartaSpeciale extends Carta {
    tipo: String;
    constructor(tipo: String, urlImmagine: String) {
        super(urlImmagine);
        this.tipo = tipo

    }
}

export class CartaColorata extends Carta {
    colore: String;
    constructor(colore: String, urlImmagine: String) {
        super(urlImmagine)
        this.colore = colore
    }
}

export class CartaColorataNonNumerata extends CartaColorata {
    tipo: String;
    constructor(tipo: String, colore: String, urlImmagine: String) {
        super(colore, urlImmagine);
        this.tipo = tipo
    }

}

export class CartaColorataNumerata extends CartaColorata {
    numero: Number;
    constructor(numero: Number, colore: String, urlImmagine: String) {
        super(colore, urlImmagine)
        this.numero = numero
    }
}

export class GameRoom {
    id: String;
    players: String[];
    status: String;

    constructor(id: String, players: String[], status: String) {
        this.id = id;
        this.players = players;
        this.status = status;
    }

    toJsonObject() {
        return {
            id: this.id,
            players: this.players,
            status: this.status
        }
    }

}