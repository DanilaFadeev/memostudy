import './index.css';
import 'materialize-css/dist/css/materialize.min.css';
import $ from 'jquery';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(
  <App />,
  document.getElementById('app')
);

$( document ).ready(function() {
  $(".dropdown-button").dropdown();
  $('.modal').modal();
});
