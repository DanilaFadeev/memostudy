import React, { Component } from 'react';
import Complect from './Complect';

import ComplectForm from './ComplectForm';

class Complects extends Component {

  constructor(props){
    super(props);

    this.state = { edittingItem: null };
  }

  changeActive(id) {
    this.props.loadCards(id);
  }

  setEditting(id) {
    this.setState({ edittingItem: this.props.complects.find(item => item.id === id) });
  }

  add(complect) {
    this.props.addComplect(complect);
  }

  edit(complect) {
      this.props.editComplect(complect);

      this.setState({ edittingItem: null });
  }

  delete() {
    this.props.deleteComplect(this.props.activeId);
  }

  render() {
    const activeComplect = this.props.complects.find(item => item.id === this.props.activeId);
    return (
      <div>
        <h4 className="header">Complects
          <a className="btn-floating btn-small waves-effect waves-light red modal-trigger" href="#modalAddComplect">
            <i className="material-icons">add</i>
          </a>
          <a className="btn-floating btn-small waves-effect waves-light red modal-trigger" href="#modalDeleteComplect">
            <i className="material-icons">delete</i>
          </a>
        </h4>
        {
          this.props.complects.map(cmpl =>
            <Complect
              key={cmpl.id}
              isActive={ cmpl.id === this.props.activeId ? true : false}
              changeActive={this.changeActive.bind(this, cmpl.id)}
              setEdditing={this.setEditting.bind(this, cmpl.id)}
              title={cmpl.title}
              description={cmpl.description}
              progress={cmpl.progress}
              cardsCount={cmpl.cards_count}
            />
          )
        }
        <ComplectForm addComplect={this.add.bind(this)} editComplect={this.edit.bind(this)} edittingItem={this.state.edittingItem} />

        <div id="modalDeleteComplect" className="modal">
          <div className="modal-content">
            <h4>Are you sure?</h4>
            <p>You want to delete the "{activeComplect ? activeComplect.title : null}" complect with {activeComplect ? activeComplect.cards_count : null} cards in it?</p>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-action modal-close waves-effect waves-green btn-flat" onClick={this.delete.bind(this)}>Agree</a>
            <a href="#!" className="modal-action modal-close waves-effect waves-red btn-flat">Cancel</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Complects;
