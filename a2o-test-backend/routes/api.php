<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ChessController;
use App\Http\Controllers\StringValueController;

Route::post('problem-1', [ChessController::class, 'queensAttack']);

Route::post('problem-2', [StringValueController::class, 'stringValue']);
