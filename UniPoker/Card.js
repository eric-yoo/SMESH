export class CardDeck
{
    constructor()
    {
        this.newDeck();
    }

    newDeck()
    {
        // Make a shallow copy of a new deck
        this._cards = CardDeck._newDeck.slice(0);
    }

    shuffle()
    {
        this.newDeck();

        for (let index = 52; index !== 0;) {
            // Select a random card
            let randomIndex = Math.floor(Math.random() * index);
            index--;

            // Swap the current card with the random card
            let tempCard = this._cards[index];
            this._cards[index] = this._cards[randomIndex];
            this._cards[randomIndex] = tempCard;
        }
    }

    dealOneCard()
    {
        return this._cards.shift();
    }

    static cardRank(card)
    {
        // This returns a numeric value for a card.
        // Ace is highest.

        let rankOfCard = card.codePointAt(0) & 0xf;
        if (rankOfCard == 0x1) // Make Aces higher than Kings
            rankOfCard = 0xf;

        return rankOfCard;
    }

    static cardName(card)
    {      
        if (typeof(card) == "string")
            card = card.codePointAt(0);
        return this._rankNames[card & 0xf];
    }
}

CardDeck._rankNames = [
    "", "Ace", "2", "3", "4", "5", "6", "7", "8", "9", "10", "Jack", "", "Queen", "King"
];

CardDeck._newDeck = [
    // Spades
    "\u{1f0a1}", "\u{1f0a2}",  "\u{1f0a3}",  "\u{1f0a4}",  "\u{1f0a5}",
    "\u{1f0a6}", "\u{1f0a7}",  "\u{1f0a8}",  "\u{1f0a9}",  "\u{1f0aa}",
    "\u{1f0ab}", "\u{1f0ad}",  "\u{1f0ae}",
    // Hearts
    "\u{1f0b1}", "\u{1f0b2}",  "\u{1f0b3}",  "\u{1f0b4}",  "\u{1f0b5}",
    "\u{1f0b6}", "\u{1f0b7}",  "\u{1f0b8}",  "\u{1f0b9}",  "\u{1f0ba}",
    "\u{1f0bb}", "\u{1f0bd}",  "\u{1f0be}",
    // Clubs
    "\u{1f0d1}", "\u{1f0d2}",  "\u{1f0d3}",  "\u{1f0d4}",  "\u{1f0d5}",
    "\u{1f0d6}", "\u{1f0d7}",  "\u{1f0d8}",  "\u{1f0d9}",  "\u{1f0da}",
    "\u{1f0db}", "\u{1f0dd}",  "\u{1f0de}",
    // Diamonds
    "\u{1f0c1}", "\u{1f0c2}",  "\u{1f0c3}",  "\u{1f0c4}",  "\u{1f0c5}",
    "\u{1f0c6}", "\u{1f0c7}",  "\u{1f0c8}",  "\u{1f0c9}",  "\u{1f0ca}",
    "\u{1f0cb}", "\u{1f0cd}",  "\u{1f0ce}"
];