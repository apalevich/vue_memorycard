let app = new Vue({
    el: '#app',
    data: {
        cards: [
            {
                name: 'Apple',
                img: 'apple.jpg',
            },
            {
                name: 'Banana',
                img: 'banana.jpg',
            },
            {
                name: 'Orange',
                img: 'orange.jpg',
            },
            {
                name: 'Pineapple',
                img: 'pineapple.jpg',
            },
            {
                name: 'Strawberry',
                img: 'strawberry.jpg',
            },
            {
                name: 'Watermelon',
                img: 'watermelon.jpg',
            },
        ],
        memoryCards: [],
        flippedCards: [],
        finished: false,
    },
    created() {
        this.cards.forEach(card => {
            Vue.set(card, 'isFlipped', false)
            Vue.set(card, 'isMatched', false);
        });

        this.memoryCards = this.double(this.cards);
        this.memoryCards = this.shuffle(this.memoryCards);
    },
    methods: {
        flipCard(card) {
            card.isFlipped = true;

            if (this.flippedCards.length < 2) {
                this.flippedCards = [...this.flippedCards, card];
            };
            console.log(this.flippedCards);
            if (this.flippedCards.length === 2) {
                this.match(card);
            };
        },
        match(card) {
            if(this.flippedCards[0].name === this.flippedCards[1].name) {
                setTimeout(() => {
                    this.flippedCards = this.flippedCards.map(card => card.isMatched = true);
                    this.flippedCards = [];

                    // All cards matched?
                    if (this.memoryCards.every(card => card.isMatched === true)) {
                        this.finished = true;
                    }
                }, 200);
            } else {
                setTimeout(() => {
                    this.flippedCards = this.flippedCards.map(card => card.isFlipped = false);
                    this.flippedCards = [];
                }, 400);
            }
        },
        double(cards) {
            return [...cards, ..._.cloneDeep(cards)]
        },
        shuffle(cards) {
            return [..._.shuffle(cards)];
        },
    },
});
