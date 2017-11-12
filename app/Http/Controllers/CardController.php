<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Card;

class CardController extends Controller
{
    public function store(Request $request) {
        return Card::create($request->all());
    }

    public function update(Request $request, $id) {
        $card = Card::findOrFail($id);
        $card->update($request->all());
        return $card;
    }

    public function delete(Request $request, $id) {
        Card::findOrFail($id)->delete();
        return 204;
    }
}
