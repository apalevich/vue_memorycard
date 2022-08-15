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
    },
    created() {
        this.cards.forEach(card => {
            Vue.set(card, 'isFlipped', false)
        });

        this.memoryCards = this.double(this.cards);
        this.memoryCards = this.shuffle(this.memoryCards);
    },
    methods: {
        flipCard(card) {
            card.isFlipped = !card.isFlipped;
        },
        double(cards) {
            return [...cards, ..._.cloneDeep(cards)]
        },
        shuffle(cards) {
            return [..._.shuffle(cards)];
        }
    },
});

console.log(app);