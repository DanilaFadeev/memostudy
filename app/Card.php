<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Card extends Model
{
    protected $fillable = ['title', 'details', 'img', 'collection_id'];
    public $timestamps = false;
}
