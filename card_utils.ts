import { Carta, CartaColorataNonNumerata, CartaColorataNumerata, CartaSpeciale } from "./classes";


export function generateDeck() {
    let cards: Carta[] = [];
    //generate cards
    //19 carte, da 0 a 9, di colore blu
    for (let i = 0; i <= 9; i++) {
        cards.push(new CartaColorataNumerata(i, "blue", `./cards_images/b${i}.png`))
    }
    for (let i = 1; i <= 9; i++) {
        cards.push(new CartaColorataNumerata(i, "blue", `./cards_images/b${i}.png`))
    }
    cards.push(new CartaColorataNonNumerata("plustwo", "blue", `./cards_images/bplustwo.png`))
    cards.push(new CartaColorataNonNumerata("plustwo", "blue", `./cards_images/bplustwo.png`))
    cards.push(new CartaColorataNonNumerata("stop", "blue", `./cards_images/bstop.png`))
    cards.push(new CartaColorataNonNumerata("stop", "blue", `./cards_images/bstop.png`))
    cards.push(new CartaColorataNonNumerata("reverse", "blue", `./cards_images/breverse.png`))
    cards.push(new CartaColorataNonNumerata("reverse", "blue", `./cards_images/breverse.png`))

    //19 carte, da 0 a 9, di colore verde
    for (let i = 0; i <= 9; i++) {
        cards.push(new CartaColorataNumerata(i, "green", `./cards_images/g${i}.png`))
    }
    for (let i = 1; i <= 9; i++) {
        cards.push(new CartaColorataNumerata(i, "green", `./cards_images/g${i}.png`))
    }
    cards.push(new CartaColorataNonNumerata("plustwo", "green", `./cards_images/gplustwo.png`))
    cards.push(new CartaColorataNonNumerata("plustwo", "green", `./cards_images/gplustwo.png`))
    cards.push(new CartaColorataNonNumerata("stop", "green", `./cards_images/gstop.png`))
    cards.push(new CartaColorataNonNumerata("stop", "green", `./cards_images/gstop.png`))
    cards.push(new CartaColorataNonNumerata("reverse", "green", `./cards_images/greverse.png`))
    cards.push(new CartaColorataNonNumerata("reverse", "green", `./cards_images/greverse.png`))

    //19 carte, da 0 a 9, di colore rosso
    for (let i = 0; i <= 9; i++) {
        cards.push(new CartaColorataNumerata(i, "red", `./cards_images/r${i}.png`))
    }
    for (let i = 1; i <= 9; i++) {
        cards.push(new CartaColorataNumerata(i, "red", `./cards_images/r${i}.png`))
    }
    cards.push(new CartaColorataNonNumerata("plustwo", "red", `./cards_images/rplustwo.png`))
    cards.push(new CartaColorataNonNumerata("plustwo", "red", `./cards_images/rplustwo.png`))
    cards.push(new CartaColorataNonNumerata("stop", "red", `./cards_images/rstop.png`))
    cards.push(new CartaColorataNonNumerata("stop", "red", `./cards_images/rstop.png`))
    cards.push(new CartaColorataNonNumerata("reverse", "red", `./cards_images/rreverse.png`))
    cards.push(new CartaColorataNonNumerata("reverse", "red", `./cards_images/rreverse.png`))

    //19 carte, da 0 a 9, di colore giallo
    for (let i = 0; i <= 9; i++) {
        cards.push(new CartaColorataNumerata(i, "yellow", `./cards_images/y${i}.png`))
    }
    for (let i = 1; i <= 9; i++) {
        cards.push(new CartaColorataNumerata(i, "yellow", `./cards_images/y${i}.png`))
    }
    cards.push(new CartaColorataNonNumerata("plustwo", "yellow", `./cards_images/yplustwo.png`))
    cards.push(new CartaColorataNonNumerata("plustwo", "yellow", `./cards_images/yplustwo.png`))
    cards.push(new CartaColorataNonNumerata("stop", "yellow", `./cards_images/ystop.png`))
    cards.push(new CartaColorataNonNumerata("stop", "yellow", `./cards_images/ystop.png`))
    cards.push(new CartaColorataNonNumerata("reverse", "yellow", `./cards_images/yreverse.png`))
    cards.push(new CartaColorataNonNumerata("reverse", "yellow", `./cards_images/yreverse.png`))

    //4 carte Jolly
    for (let i = 0; i < 4; i++) {
        cards.push(new CartaSpeciale("chgcolor", `./cards_images/chgcolor.png`))
    }
    //4 carte Jolly +4
    for (let i = 0; i < 4; i++) {
        cards.push(new CartaSpeciale("plus4", `./cards_images/plus4.png`))
    }
    return cards;
}

export function shuffleDeck(deck: Carta[]) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}