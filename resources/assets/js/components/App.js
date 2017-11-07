import React, { Component } from 'react';
import axios from 'axios';

import Cards from './Cards';
import Complects from './Complects';
import Practice from './Practice';


class App extends Component {
  constructor(props) {
    super(props);

    this.loadCards = this.loadCards.bind(this);
    this.state = { complects: [], cards: [], active_id: null };
  }

  componentDidMount() {
    axios.get('/api/collections')
      .then( ({data}) => this.setState({ complects: data }) );
  }

  loadCards(active_id) {
    axios.get('/api/collections/' + active_id)
      .then( ({data}) => this.setState({ cards: data, active_id }) );
  }

  addCard(card) {
    const collection_id = this.state.active_id;
    axios.post('/api/cards', { ...card, collection_id })
        .catch(error => console.log(error));

    const complectIndex = this.state.complects.findIndex(item => item.id === collection_id);
    const complect = this.state.complects[complectIndex];
    complect['cards_count']++;

    this.setState({
        cards: [ ...this.state.cards, card ],
        complects: [
            ...this.state.complects.slice(0, complectIndex),
            complect,
            ...this.state.complects.slice(complectIndex + 1),
        ]
    });
  }

  editCard(card, id) {
      const collection_id = this.state.active_id;
      axios.put('/api/cards/' + id, { ...card, collection_id })
          .catch(error => console.log(error));

      const cardIndex = this.state.cards.findIndex(item => item.id === id);

      this.setState({
          cards: [
              ...this.state.cards.slice(0, cardIndex),
              card,
              ...this.state.cards.slice(cardIndex + 1),
          ]
      });
  }

  deleteCard(id) {
    axios.delete('/api/cards/' + id)
        .catch(error => console.log(error));

      const complectIndex = this.state.complects.findIndex(item => item.id === this.state.active_id);
      const complect = this.state.complects[complectIndex];
      complect['cards_count']--;

      const cardIndex = this.state.cards.findIndex(item => item.id === id);

      this.setState({
          cards: [ ...this.state.cards.slice(0, cardIndex), ...this.state.cards.slice(cardIndex + 1) ],
          complects: [
              ...this.state.complects.slice(0, complectIndex),
              complect,
              ...this.state.complects.slice(complectIndex + 1),
          ]
      });
  }

  addComplect(complect) {
      axios.post('/api/collections', {
          ...complect,
          user_id: 0 // set for logged user
      });
  }

  editComplect(complect) {
      axios.put('/api/collections/' + complect.id, complect)
          .catch(error => console.log(error));

      const complectIndex = this.state.complects.findIndex(item => item.id === complect.id);

      this.setState({
          complects: [
              ...this.state.complects.slice(0, complectIndex),
              complect,
              ...this.state.complects.slice(complectIndex + 1),
          ]
      })
  }

  deleteComplect() {
      axios.delete('/api/collections/' + this.state.active_id)
          .catch(error => console.log(error));

      const complectIndex = this.state.complects.findIndex(item => item.id === this.state.active_id);
      const newActiveIndex = complectIndex === 0 ? 1 : 0;

      this.loadCards(this.state.complects[newActiveIndex].id);

      this.setState({
          active_id: this.state.complects[newActiveIndex].id,
          complects: [
              ...this.state.complects.slice(0, complectIndex),
              ...this.state.complects.slice(complectIndex + 1),
          ]
      });
  }

  reverse() {
    this.setState({ cards: this.state.cards.sort(() => Math.random() - 0.5) });
  }

  render() {
    return (
      <div className="row app-container">
        <div className="col s3">
          <Complects
            complects={this.state.complects}
            activeId={this.state.active_id}
            loadCards={this.loadCards}
            addComplect={this.addComplect}
            editComplect={this.editComplect.bind(this)}
            deleteComplect={this.deleteComplect.bind(this)}
          />
        </div>
        <div className="col s9">
          <Cards
            cards={this.state.cards}
            addCard={this.addCard.bind(this)}
            editCard={this.editCard.bind(this)}
            deleteCard={this.deleteCard.bind(this)}
            reverse={this.reverse.bind(this)}
          />
        </div>
        <Practice cards={this.state.cards} reverse={this.reverse.bind(this)} />
      </div>
    );
  }
}

export default App;
