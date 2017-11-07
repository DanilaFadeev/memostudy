import React from 'react';

const PracticeCard = ({ title, details, img, progress, remind, nextCard}) => {
  return (
    <div>
      <div className="modal-content" style={ img.length > 0 ? {backgroundImage: `url('${img}')`} : {} }>
        <div className="modal-card-word teal">
          <h4>{ title }</h4>
        </div>
        <div>
        {
          details ? <div className="modal-card-desrc pink">
            <p>{ details }</p>
          </div> : ''
        }
        </div>
      </div>
      <div className="modal-footer">
        <div className="col s6">
          <div className="progress">
              <div className="determinate" style={ { width: progress + '%' } }></div>
          </div>
        </div>
        <div className="col s6">
          <a href="#!" className="modal-action waves-effect waves-red btn btn-flat" onClick={remind}>Remind Me</a>
          <a href="#!" className="modal-action waves-effect waves-green btn btn-flat" onClick={nextCard}>Next</a>
        </div>
      </div>
    </div>
  );
}

export default PracticeCard;
