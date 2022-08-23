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
        started: false,
        finished: false,
        turns: 0,
        totalTime: {
            minutes: 0,
            seconds: 0
        }
    },
    created() {
        this.reset();
    },
    methods: {
        flipCard(card) {
            card.isFlipped = true;

            if (this.flippedCards.length < 2) {
                this.flippedCards = [...this.flippedCards, card];
            };
            if (this.flippedCards.length === 2) {
                this.match(card);
            };
            if(!this.started) {
                this.startGame();
            }
        },
        match(card) {
            this.turns++;
            if(this.flippedCards[0].name === this.flippedCards[1].name) {
                setTimeout(() => {
                    this.flippedCards = this.flippedCards.map(card => card.isMatched = true);
                    this.flippedCards = [];

                    // All cards matched?
                    if (this.memoryCards.every(card => card.isMatched === true)) {
                        clearInterval(this.inverval);
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
        startGame() {
            this.tick();
            this.inverval = setInterval(this.tick, 1000);
            this.started = true;
        },
        tick() {
            if (this.totalTime.seconds !== 59) {
                this.totalTime.seconds++;
                return;
            }

            this.totalTime.minutes++;
            this.totalTime.seconds = 0;
        },
        reset() {
            clearInterval(this.inverval);
            this.cards.forEach((card) => {
                Vue.set(card, 'isFlipped', false);
                Vue.set(card, 'isMatched', false);
            });

            setTimeout(() => {
                this.memoryCards = [];
                this.memoryCards = this.double(this.cards);
                this.memoryCards = this.shuffle(this.memoryCards);
                this.totalTime.minutes = 0;
                this.totalTime.seconds = 0;
                this.started = false;
                this.finished = false;
                this.turns = 0;
                this.flippedCards = [];
            }, 400);
        }
    },
    computed: {
        sec() {
            if (this.totalTime.seconds < 10) {
                return '0' + this.totalTime.seconds;
            }
            return this.totalTime.seconds;
        },
        min() {
            if (this.totalTime.minutes < 10) {
                return '0' + this.totalTime.minutes;
            }
            return this.totalTime.minutes;
        }
    }
});
