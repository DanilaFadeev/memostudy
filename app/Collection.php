<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $fillable = ['title', 'description', 'user_id', 'progress'];

    public function cards() {
        return $this->hasMany('App\Card');
    }
}
