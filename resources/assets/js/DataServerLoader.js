import axios from 'axios';

export default class DataServerLoader {
    constructor(token, setState) {
        this.setState = setState;
        this.axios = axios.create({
            baseURL: '/api/',
            params: {
                'api_token': token
            }
        });
    }

    getCollections() {
        this.axios.get('collections')
            .then( ({data}) => this.setState({ complects: data }) );
    }

    getCards(id) {
        this.axios.get('collections/' + id)
            .then( ({data}) => this.setState({ cards: data, active_id: id }) );
    }

    addCard(card, collection_id) {
        this.axios.post('cards', { ...card, collection_id })
            .catch(error => console.log(error));
    }

    updateCard(card) {
        this.axios.put('cards/' + card.id, card)
            .catch(error => console.log(error));
    }

    deleteCard(id) {
        this.axios.delete('cards/' + id)
            .catch(error => console.log(error));
    }

    addCollection(complect, user_id) {
        this.axios.post('collections', {
            ...complect,
            user_id
        })
        .then(() => {
            this.getCollections();
        });
    }

    updateCollection(complect) {
        this.axios.put('collections/' + complect.id, complect)
            .catch(error => console.log(error));
    }

    deleteCollection(id) {
        this.axios.delete('collections/' + id)
            .catch(error => console.log(error));
    }
}