@extends('layouts.app')

@section('content')
    <div id="app"></div>
    <div id="modalUnlogged" class="modal">
        <div class="modal-content">
            <h4 class="center">Attention!</h4>
            <p>You should register or log in to save the complects!</p>
            <p>Right now everything are hosting in localstorage of your browser.</p>
        </div>
        <div class="modal-footer">
            <a href="#!" class="modal-action modal-close waves-effect waves-green btn-flat">I see</a>
        </div>
    </div>
@endsection