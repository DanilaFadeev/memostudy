<?php

Route::get('default/collections', 'CollectionController@getDefaultAll');
Route::get('default/collections/{id}', 'CollectionController@getDefault');

Route::group(['middleware' => 'auth:api'], function() {
    Route::get('collections', 'CollectionController@index');
    Route::get('collections/{id}', 'CollectionController@show');
    Route::post('collections', 'CollectionController@store');
    Route::put('collections/{id}', 'CollectionController@update');
    Route::delete('collections/{id}', 'CollectionController@delete');

    Route::post('cards', 'CardController@store');
    Route::put('cards/{id}', 'CardController@update');
    Route::delete('cards/{id}', 'CardController@delete');
});
