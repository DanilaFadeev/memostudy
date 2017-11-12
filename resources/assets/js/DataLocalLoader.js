import axios from 'axios';

export default class DataLocalLoader {
    constructor(setState) {
        this.setState = setState;
        this.complects = JSON.parse(localStorage.getItem('complects'));
        this.activeId = null;
    }

    getCollections() {
        if(!this.complects) {
            axios.get('api/default/collections')
                .then(({data}) => {
                    this.setState({ complects: data });
                    localStorage.setItem('complects', JSON.stringify(data));
                    this.complects = data;
                    return data;
                })
                .then(data => {
                    data.forEach(item => {
                        axios.get('api/default/collections/' + item.id).then(({data}) => {
                            localStorage.setItem('cards-' + item.id, JSON.stringify(data));
                        });
                    });
                });
        } else {
            this.setState({ complects: this.complects });
        }
    }

    getCards(id) {
        const cards = JSON.parse(localStorage.getItem('cards-' + id)) || [];
        this.setState({ cards: cards, active_id: id });
        this.activeId = id;
    }

    addCard(card, collection_id) {
        const cards = JSON.parse(localStorage.getItem('cards-' + collection_id)) || [];
        cards.push({ id: Date.now(), ...card, collection_id});
        localStorage.setItem('cards-' + collection_id, JSON.stringify(cards));
    }

    updateCard(card) {
        const cards = JSON.parse(localStorage.getItem('cards-' + card.collection_id));

        const updateIndex = cards.findIndex(item => item.id === card.id);
        cards[updateIndex] = card;

        localStorage.setItem('cards-' + card.collection_id, JSON.stringify(cards));
    }

    deleteCard(id) {
        const cards = JSON.parse(localStorage.getItem('cards-' + this.activeId));

        const deletedIndex = cards.findIndex(item => item.id === id);
        cards.splice(deletedIndex, 1);

        localStorage.setItem('cards-' + this.activeId, JSON.stringify(cards));
    }

    addCollection(complect, user_id) {
        this.complects.push({ id: Date.now(), ...complect, cards_count: 0});
        localStorage.setItem('complects', JSON.stringify(this.complects));
        this.getCollections();
    }

    updateCollection(complect) {
        const complects = JSON.parse(localStorage.getItem('complects'));

        const updateIndex = complects.findIndex(item => item.id === complect.id);
        complects[updateIndex] = complect;

        localStorage.setItem('complects', JSON.stringify(complects));
    }

    deleteCollection(id) {
        const complects = JSON.parse(localStorage.getItem('complects'));

        const removeIndex = complects.findIndex(item => item.id === id);
        complects.splice(removeIndex, 1);

        localStorage.setItem('complects', JSON.stringify(complects));
    }
}