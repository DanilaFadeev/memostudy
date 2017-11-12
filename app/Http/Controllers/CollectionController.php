<?php

namespace App\Http\Controllers;

use App\CardDefault;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Collection;
use App\CollectionDefault;
use Illuminate\Support\Facades\DB;

class CollectionController extends Controller
{
    public function index(){
        $user_id = 0;

        if(Auth::user()) {
            $user_id = Auth::user()->id;
        }

        return Collection::withCount('cards')->where('user_id', $user_id)->get();
    }

    public function show($id) {
        return Collection::findOrFail($id)->cards->toJSON();
    }

    public static function copyDefaults($user_id) {
        $defaultCollections = CollectionDefault::all()->toArray();
        $defaultCards = CardDefault::all()->toArray();

        $collections = [];
        foreach ($defaultCollections as $collection) {
            $collection['user_id'] = $user_id;
            $collection['progress'] = 0;
            unset($collection['id']);
            array_push($collections, $collection);
        }

        $start_id = DB::table('collections')->insertGetId($collections[0]);
        if(count($collections) > 1) {
            unset($collections[0]);
            DB::table('collections')->insert($collections);
        }

        $cards = [];
        foreach ($defaultCards as $card) {
            $card['collection_id'] = $start_id + $card['collection_default_id'] - 1;
            unset($card['id']);
            unset($card['collection_default_id']);
            array_push($cards, $card);
        }


        DB::table('cards')->insert($cards);
    }

    public function store(Request $request) {
        return Collection::create($request->all());
    }

    public function update(Request $request, $id) {
        $collection = Collection::findOrFail($id);
        $collection->update($request->all());
        return $collection;
    }

    public function delete(Request $request, $id) {
        Collection::find($id)->cards()->delete();
        Collection::find($id)->delete();
        return 204;
    }

    public function getDefaultAll() {
        return CollectionDefault::withCount('cards')->get();
    }

    public function getDefault(Request $request, $id) {
        return CollectionDefault::findOrFail($id)->cards->all();
    }
}
