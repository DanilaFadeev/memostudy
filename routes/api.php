<?php

use Illuminate\Http\Request;
use App\Collection;
use App\Card;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('collections', function() {
    return Collection::withCount('cards')->get();
});

Route::post('collections', function(Request $request) {
    Collection::create($request->all());
    return 201;
});

Route::get('collections/{id}', function($id) {
    return Collection::find($id)->cards->toJSON();
});

Route::delete('collections/{id}', function(Request $request, $id) {
    Collection::find($id)->cards()->delete();
    Collection::find($id)->delete();
    return 204;
});

Route::put('collections/{id}', function(Request $request, $id) {
    $collection = Collection::findOrFail($id);
    $collection->update($request->all());
    return $collection;
});


Route::post('cards', function(Request $request) {
    Card::create($request->all());
    return 201;
});

Route::put('cards/{id}', function(Request $request, $id) {
    $card = Card::findOrFail($id);
    $card->update($request->all());
    return $card;
});

Route::delete('cards/{id}', function(Request $request, $id) {
    Card::find($id)->delete();
    return 204;
});