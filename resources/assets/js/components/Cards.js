import React, { Component } from 'react';
import Card from './Card';
import CardForm from './CardForm';

import Materialize from 'materialize-css';

class Cards extends Component {
  constructor(props) {
    super(props);
    this.state = { cards: props.cards, editting: null };
  }

  add(card) {
    this.props.addCard(card);
  }

  edit(card, id) {
    const oldCard = this.props.cards.find(item => item.id === id);
    this.props.editCard(card, id);

    this.setState({editting: null});

    Materialize.toast(`"${oldCard.title}" was changed`, 10000);
  }

  remove(id) {
    const card = this.props.cards.find(item => item.id === id);
    this.props.deleteCard(id);

    Materialize.toast(`"${card.title}" was removed`, 10000);
  }

  setEditting(id) {
    this.setState({editting: {...this.props.cards.find(item => item.id === id), id: id}});
  }

  cardsRows(cards) {
    let rows = [], cols = [];

    for (let index = 0; index < cards.length; index++) {
        cols.push(
          <Card
            key={index}
            remove={this.remove.bind(this, cards[index].id)}
            setEditting={this.setEditting.bind(this, cards[index].id)}
            title={cards[index].title}
            details={cards[index].details}
            img={cards[index].img}
          />
        );

        if ((index + 1) % 4 === 0 || index + 1 === cards.length) {
            rows.push(
                <div className="row" key={index}>
                    {cols}
                </div>
            )
            cols = [];
        }
    }

    return <div>{rows}</div>;
  }

  render() {
    return (
      <div className="row">
        <h4 className="header">
          Cards
          <a className="btn-floating btn-small waves-effect waves-light pink" onClick={this.props.reverse}>
            <i className="material-icons">autorenew</i>
          </a>
          <a className="btn-floating btn-small waves-effect waves-light red modal-trigger" href="#modalAddCard">
            <i className="material-icons">add</i>
          </a>
        </h4>

        { this.cardsRows(this.props.cards) }

        <CardForm addCard={this.add.bind(this)} editCard={this.edit.bind(this)} edittingItem={this.state.editting} />
      </div>
    );
  }
}

export default Cards;
