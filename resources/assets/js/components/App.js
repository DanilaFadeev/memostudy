import React, { Component } from 'react';
import axios from 'axios';
import $ from 'jquery';

import Cards from './Cards';
import Complects from './Complects';
import Practice from './Practice';

import DataServerLoader from './../DataServerLoader';
import DataLocalLoader from './../DataLocalLoader';

class App extends Component {
  constructor(props) {
    super(props);

    this.loadCards = this.loadCards.bind(this);
    this.state = { complects: [], cards: [], active_id: null };

    if(this.props.api_token && this.props.user_id) {
        this.dataLoader = new DataServerLoader(this.props.api_token, this.setState.bind(this));
    } else {
        this.dataLoader = new DataLocalLoader(this.setState.bind(this));
    }

  }

  componentDidMount() {
    this.dataLoader.getCollections();
  }

  loadCards(active_id) {
    this.dataLoader.getCards(active_id);
  }

  addCard(card) {
    const collection_id = this.state.active_id;
    this.dataLoader.addCard(card, collection_id);

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

  editCard(card) {
      this.dataLoader.updateCard(card);

      const cardIndex = this.state.cards.findIndex(item => item.id === card.id);
      this.setState({
          cards: [
              ...this.state.cards.slice(0, cardIndex),
              card,
              ...this.state.cards.slice(cardIndex + 1),
          ]
      });
  }

  deleteCard(id) {
      this.dataLoader.deleteCard(id);

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
      this.dataLoader.addCollection(complect, this.props.user_id);
  }

  editComplect(complect) {
      this.dataLoader.updateCollection(complect);

      const complectIndex = this.state.complects.findIndex(item => item.id === complect.id);

      this.setState({
          complects: [
              ...this.state.complects.slice(0, complectIndex),
              complect,
              ...this.state.complects.slice(complectIndex + 1),
          ]
      });
  }

  deleteComplect() {
      this.dataLoader.deleteCollection(this.state.active_id);

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
            loadCards={this.loadCards.bind(this)}
            addComplect={this.addComplect.bind(this)}
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
        <Practice
            cards={this.state.cards}
            reverse={this.reverse.bind(this)}
            complect={this.state.complects.find(item => item.id === this.state.active_id)}
            editComplect={this.editComplect.bind(this)}
        />
      </div>
    );
  }
}

export default App;
