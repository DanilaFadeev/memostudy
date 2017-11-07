import React, { Component } from 'react';

import PracticeCard from './PracticeCard';
import PracticeFinish from './PracticeFinish';

class Practice extends Component {
  constructor(props) {
    super(props);

    this.props.reverse();

    this.state = {
      currentCardIndex: 0,
      progress: Math.round(((1 / props.cards.length) * 100)),
      complited: 0,
      isDetails: false,
      isEnd: false
    };
  }

  nextCard() {
    if (this.state.currentCardIndex + 1 === this.props.cards.length) {
      this.setState({
        isEnd: true,
        complited: this.state.isDetails ? this.state.complited : this.state.complited + 1,
      });
      return;
    }

    this.setState({
      currentCardIndex: this.state.currentCardIndex + 1,
      progress: Math.round(((this.state.currentCardIndex + 2) / this.props.cards.length) * 100),
      complited: this.state.isDetails ? this.state.complited : this.state.complited + 1,
      isDetails: false
    });
  }

  remind() {
    this.setState({ isDetails: true });
  }

  again() {
    this.props.reverse();

    this.setState({
      currentCardIndex: 0,
      progress: Math.round(((1 / this.props.cards.length) * 100)),
      complited: 0,
      isDetails: false,
      isEnd: false
    });
  }

  finish() {
    this.again();
    // save the result for complects
  }

  practiceCard() {
    const index = this.state.currentCardIndex;
    const isDetails = this.state.isDetails;

    return (
      <PracticeCard
        title={this.props.cards[index].title}
        details={isDetails ? this.props.cards[index].details : null}
        img={this.props.cards[index].img}
        progress={this.state.progress}
        nextCard={this.nextCard.bind(this)}
        remind={this.remind.bind(this)}
      />
    );
  }

  practiceFinish() {
    return (
      <PracticeFinish
        progress={this.state.progress}
        complited={this.state.complited}
        cardsCount={this.props.cards.length}
        again={this.again.bind(this)}
        finish={this.finish.bind(this)}
      />
    );
  }

  render() {
    const isEnd = this.state.isEnd;

    if (this.props.cards.length === 0)
      return <div id="start" className="modal modal-fixed-footer"></div>;

    return (
      <div id="start" className="modal modal-fixed-footer">
        { isEnd ? this.practiceFinish() : this.practiceCard() }
      </div>
    );
  }
}

export default Practice;
