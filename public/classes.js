export class Carta {
    urlImmagine;
    constructor(urlImmagine) {
        this.urlImmagine = urlImmagine
    }
    get immagine() {
        return this.urlImmagine
    }
}

export class CartaSpeciale extends Carta {
    tipo;
    constructor(tipo, urlImmagine) {
        super(urlImmagine);
        this.tipo = tipo

    }
}

export class CartaColorata extends Carta {
    colore;
    constructor(colore, urlImmagine) {
        super(urlImmagine)
        this.colore = colore
    }
}

export class CartaColorataNonNumerata extends CartaColorata {
    tipo;
    constructor(tipo, colore, urlImmagine) {
        super(colore, urlImmagine);
        this.tipo = tipo
    }

}

export class CartaColorataNumerata extends CartaColorata {
    numero;
    constructor(numero, colore, urlImmagine) {
        super(colore, urlImmagine)
        this.numero = numero
    }
}