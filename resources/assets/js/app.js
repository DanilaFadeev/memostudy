import './bootstrap';
import 'materialize-css/dist/css/materialize.min.css';

import $ from 'jquery';
import axios from 'axios';

import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

axios.get('user')
    .then(({data}) => {
        const api_token = data.api_token || null;
        const user_id = data.id || null;

        ReactDOM.render(
            <App
                api_token={api_token}
                user_id={user_id}
            />,
            document.getElementById('app')
        );

        $(".dropdown-button").dropdown();
        $('.modal').modal();

        if(api_token === null || user_id === null){
            $('#modalUnlogged').modal('open');
        }
    })
    .catch(error => console.log(error));