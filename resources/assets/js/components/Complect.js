import React from 'react';

const Complect = ({ title, description, progress, cardsCount, isActive, setEdditing, changeActive}) => {
  return (
    <div className={isActive ? "card complect-active" : "card"}>
      <div className="card-content" onClick={changeActive}>
        <span className="card-title">
            { title }
            <span className="new badge" data-badge-caption="cards">{ cardsCount }</span>
        </span>
        <p>{ description }</p>
        <div className="card-category-progress">
          <div className="col s10">
            <div className="progress">
                <div className="determinate" style={ { width: progress + '%' } }></div>
            </div>
          </div>
          <div className="col s2">{ progress }%</div>
        </div>
      </div>
      <div className="card-action action-complect">
        {isActive ? <a className="waves-effect waves-light btn modal-trigger" href="#start">Start</a> : ""}
        <a className="btn-floating btn-small waves-effect waves-light red right modal-trigger" href="#modalAddComplect" onClick={setEdditing}>
            <i className="material-icons">mode_edit</i>
        </a>
      </div>
    </div>
  );
};

export default Complect;
