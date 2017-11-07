import React, { Component } from 'react';
import $ from 'jquery';
import Materialize from 'materialize-css';

class CardForm extends Component {

  addCard(event) {
    event.preventDefault();

    const title = this.refs.title.value;
    const details = this.refs.details.value;
    const img = this.refs.img.value;

    this.refs.title.value = '';
    this.refs.details.value = '';
    this.refs.img.value = '';

    if (this.props.edittingItem === null) {
      if (title.length > 0 && details.length > 0) {
        this.props.addCard({ title, details, img });
      } else {
        Materialize.toast(`You have to set title and details fields!`, 8000);
      }
    } else {
      if (title.length > 0 && details.length > 0) {
        this.props.editCard({ title: title, details, img }, this.props.edittingItem.id);
      } else {
        Materialize.toast(`You have to set title and details fields!`, 8000);
      }
    }

    $('#modalAddCard').modal('close');
  }

  render() {
    if (this.props.edittingItem != null) {
      this.refs.details.value = this.props.edittingItem.details;
      this.refs.details.focus();
      this.refs.img.value = this.props.edittingItem.img;
      this.refs.img.focus();
      this.refs.title.value = this.props.edittingItem.title;
      this.refs.title.focus();
    }

    return (
      <div id="modalAddCard" className="modal modal-add-card">
        <form onSubmit={this.addCard.bind(this)}>
          <div className="modal-content">
            <div className="row">
              <h4 className="center">{ this.props.edittingItem != null ? 'Edit card' : 'New card' }</h4>
              <div className="col s12">
                <div className="row">
                  <div className="input-field col s6 offset-s3">
                    <input id="card_title" type="text" ref="title" />
                    <label htmlFor="card_title">Card title</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s10 offset-s1">
                    <input id="card_details" type="text" ref="details" />
                    <label htmlFor="card_details">Details</label>
                  </div>
                </div>
                <div className="row">
                  <div className="input-field col s10 offset-s1">
                    <input id="card_img" type="text" ref="img" />
                    <label htmlFor="card_img">Image url</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <div className="row">
              <div className="col s12">
                <button className="btn waves-effect waves-light" type="submit" name="action">
                  { this.props.edittingItem != null ? 'Save' : 'Add' }
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    );
  }

}

export default CardForm;
