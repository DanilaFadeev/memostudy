<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class CollectionDefault extends Model
{
    protected $table = 'collections_default';

    public function cards() {
        return $this->hasMany('App\CardDefault');
    }
}
