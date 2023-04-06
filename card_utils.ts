import { Carta } from "./classes";


export function generateDeck() {
    let cards: Carta[] = [];
    //generate cards
    //19 carte, da 0 a 9, di colore blu
    for (let i = 0; i <= 9; i++) {
        cards.push(new Carta("standard", "blue", `cards_images/b${i}.png`, i))
    }
    for (let i = 1; i <= 9; i++) {
        cards.push(new Carta("standard", "blue", `cards_images/b${i}.png`, i))
    }
    cards.push(new Carta("plustwo", "blue", `cards_images/bplustwo.png`, -1))
    cards.push(new Carta("plustwo", "blue", `cards_images/bplustwo.png`, -1))
    cards.push(new Carta("stop", "blue", `cards_images/bstop.png`, -1))
    cards.push(new Carta("stop", "blue", `cards_images/bstop.png`, -1))
    cards.push(new Carta("reverse", "blue", `cards_images/breverse.png`, -1))
    cards.push(new Carta("reverse", "blue", `cards_images/breverse.png`, -1))

    //19 carte, da 0 a 9, di colore verde
    for (let i = 0; i <= 9; i++) {
        cards.push(new Carta("standard", "green", `cards_images/g${i}.png`, i))
    }
    for (let i = 1; i <= 9; i++) {
        cards.push(new Carta("standard", "green", `cards_images/g${i}.png`, i))
    }
    cards.push(new Carta("plustwo", "green", `cards_images/gplustwo.png`, -1))
    cards.push(new Carta("plustwo", "green", `cards_images/gplustwo.png`, -1))
    cards.push(new Carta("stop", "green", `cards_images/gstop.png`,-1))
    cards.push(new Carta("stop", "green", `cards_images/gstop.png`, -1))
    cards.push(new Carta("reverse", "green", `cards_images/greverse.png`, -1))
    cards.push(new Carta("reverse", "green", `cards_images/greverse.png`, -1))

    //19 carte, da 0 a 9, di colore rosso
    for (let i = 0; i <= 9; i++) {
        cards.push(new Carta("standard", "red", `cards_images/r${i}.png`, i))
    }
    for (let i = 1; i <= 9; i++) {
        cards.push(new Carta("standard", "red", `cards_images/r${i}.png`, i))
    }
    cards.push(new Carta("plustwo", "red", `cards_images/rplustwo.png`, -1))
    cards.push(new Carta("plustwo", "red", `cards_images/rplustwo.png`, -1))
    cards.push(new Carta("stop", "red", `cards_images/rstop.png`, -1))
    cards.push(new Carta("stop", "red", `cards_images/rstop.png`, -1))
    cards.push(new Carta("reverse", "red", `cards_images/rreverse.png`, -1))
    cards.push(new Carta("reverse", "red", `cards_images/rreverse.png`, -1))

    //19 carte, da 0 a 9, di colore giallo
    for (let i = 0; i <= 9; i++) {
        cards.push(new Carta("standard", "yellow", `cards_images/y${i}.png`, i))
    }
    for (let i = 1; i <= 9; i++) {
        cards.push(new Carta("standard", "yellow", `cards_images/y${i}.png`, i))
    }
    cards.push(new Carta("plustwo", "yellow", `cards_images/yplustwo.png`, -1))
    cards.push(new Carta("plustwo", "yellow", `cards_images/yplustwo.png`, -1))
    cards.push(new Carta("stop", "yellow", `cards_images/ystop.png`, -1))
    cards.push(new Carta("stop", "yellow", `cards_images/ystop.png`, -1))
    cards.push(new Carta("reverse", "yellow", `cards_images/yreverse.png`, -1))
    cards.push(new Carta("reverse", "yellow", `cards_images/yreverse.png`, -1))

    //4 carte Jolly
    for (let i = 0; i < 4; i++) {
        cards.push(new Carta("chgcolor", "null", `cards_images/chgcolor.png`, -1))
    }
    //4 carte Jolly +4
    for (let i = 0; i < 4; i++) {
        cards.push(new Carta("plus4", "null", `cards_images/plus4.png`, -1))
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