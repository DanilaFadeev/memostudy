<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    protected $fillable = ['title', 'description', 'user_id'];

    public function cards() {
        return $this->hasMany('App\Card');
    }
}
