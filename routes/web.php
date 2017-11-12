<?php

use Illuminate\Support\Facades\Auth;

Auth::routes();

Route::get('user', function() {
    if(Auth::user()) {
        return Auth::user()->toJSON();
    }

    return response()->json(['error' => 'Unauthenticated']);
});

Route::get('/', function () {
    return view('application');
});

