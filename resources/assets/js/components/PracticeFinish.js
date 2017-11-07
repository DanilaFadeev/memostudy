import React from 'react';
import $ from 'jquery';

const PracticeFinish = ({ complited, cardsCount, progress, again, finish }) => {

  const finishPractice = () => {
    $('#start').modal('close');
    finish();
  };

  return (
    <div>
      <div className="modal-content" style={ {backgroundImage: `url('http://www.paddlinghome.com/wp-content/uploads/2015/09/Finish-1000x400.jpg')`} }>
        <div className="modal-card-word teal">
          <h4>The end!</h4>
        </div>
        <div>
          <div className="modal-card-desrc pink">
            <p>Your result is: {complited} from {cardsCount}</p>
          </div>
        </div>
      </div>
      <div className="modal-footer">
        <div className="col s6">
          <div className="progress">
              <div className="determinate" style={ { width: progress + '%' } }></div>
          </div>
        </div>
        <div className="col s6">
          <a href="#!" className="modal-action waves-effect waves-blue btn btn-flat" onClick={again}>Try again</a>
          <a href="#!" className="modal-action waves-effect waves-green btn btn-flat" onClick={finishPractice}>Finish</a>
        </div>
      </div>
    </div>
  );
}

export default PracticeFinish;
