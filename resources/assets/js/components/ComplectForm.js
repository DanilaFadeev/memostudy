import React, { Component } from 'react';
import $ from 'jquery';
import Materialize from 'materialize-css';

class ComplectForm extends Component {

    addComplect(event) {
        event.preventDefault();

        const title = this.refs.title.value;
        const description = this.refs.description.value;

        this.refs.title.value = '';
        this.refs.description.value = '';

        if (this.props.edittingItem === null) {
            if (title.length > 0 && description.length > 0) {
                this.props.addComplect({ title, description });
            } else {
                Materialize.toast(`You have to set name and description fields!`, 8000);
            }
        } else {
            if (title.length > 0 && description.length > 0) {
                const newComplect = this.props.edittingItem;
                newComplect.title = title;
                newComplect.description = description;

                this.props.editComplect(newComplect);
            } else {
                Materialize.toast(`You have to set name and description fields!`, 8000);
            }
        }

        $('#modalAddComplect').modal('close');
    }

    render() {
        if (this.props.edittingItem != null) {
            this.refs.description.value = this.props.edittingItem.description;
            this.refs.description.focus();
            this.refs.title.value = this.props.edittingItem.title;
            this.refs.title.focus();
        }

        return (
            <div id="modalAddComplect" className="modal modal-add-card">
                <form onSubmit={this.addComplect.bind(this)}>
                    <div className="modal-content">
                        <div className="row">
                            <h4 className="center">{ this.props.edittingItem != null ? 'Edit complect' : 'New complect' }</h4>
                            <div className="col s12">
                                <div className="row">
                                    <div className="input-field col s6 offset-s3">
                                        <input id="complect_name" type="text" ref="title" />
                                        <label htmlFor="complect_name">Complect name</label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="input-field col s10 offset-s1">
                                        <input id="complect_description" type="text" ref="description" />
                                        <label htmlFor="complect_description">Description</label>
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

export default ComplectForm;
