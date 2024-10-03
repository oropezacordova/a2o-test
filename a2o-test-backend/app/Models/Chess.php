<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Chess extends Model
{
    use HasFactory;

    protected $fillable = [
        'n', //number of rows and columns
        'k', //number of obstacles
        'rq', //row number of the queen's position
        'cq', //column number of the queen's position
        'obstacles' //matrix of obstacles
    ];
}
