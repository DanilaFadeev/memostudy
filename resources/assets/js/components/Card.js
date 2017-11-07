import React from 'react';

const Card = ({title, details, img, remove, setEditting}) => {
    return (
      <div className="col s3">
      <div className="card memo-card">
        <div className="card-image waves-effect waves-block waves-light">
          <img className="activator" src={img} alt="" />
        </div>
        <div className="card-content">
          <span className="card-title activator grey-text text-darken-4">{title}<i className="material-icons right">more_vert</i></span>
        </div>
        <div className="card-reveal">
          <span className="card-title grey-text text-darken-4">{title}<i className="material-icons right">close</i></span>
          <p>{details}</p>
          <div className="card-content-tools">
            <a className="btn waves-light blue modal-trigger" href="#modalAddCard" onClick={setEditting}><i className="material-icons">mode_edit</i></a>
            <a className="btn red right" onClick={remove}><i className="material-icons">delete</i></a>
          </div>
        </div>
      </div>
    </div>
    );
}
export default Card;
