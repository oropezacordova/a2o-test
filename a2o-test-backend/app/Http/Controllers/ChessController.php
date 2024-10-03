<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Chess;
use Illuminate\Support\Facades\Validator;

class ChessController extends Controller
{
    public function queensAttack(Request $request) // main function
    {
        $validator = Validator::make($request->all(), [
            'n' => 'required|integer|min:1',
            'k' => 'required|integer',
            'rq' => 'required|integer|min:1',
            'cq' => 'required|integer|min:1',
            'obstacles' => 'array',
        ]);
        if ($validator->fails()) {
            return $this->jsonErrorResponse($validator->errors(), 400);
        }
        $n = $request->n;
        $k = $request->k;
        $rq = $request->rq - 1;
        $cq = $request->cq - 1;
        $obstacles = $request->obstacles? $request->obstacles : [];
        $matrix = array_fill(0, $n, array_fill(0, $n, 0)); // initialize matrix
        $matrix[$rq][$cq] = 2; //set queen
        if ($k != count($obstacles)) { // check if the number of obstacles is equal to the number of obstacles
            return $this->jsonErrorResponse(['k' => 'k must be equal to the number of obstacles'], 400);
        }
        if ($rq >= $n || $cq >= $n) { // check if the queen's position is within the matrix bounds
            return $this->jsonErrorResponse(['queen' => 'Queen must be within the matrix bounds'], 400);
        }
        foreach ($obstacles as $obstacle) { // set obstacles
            if (!$this->isValidPosition($obstacle, $n)) { // check if the obstacle is within the matrix bounds
                return $this->jsonErrorResponse(['obstacles' => 'Obstacles must be within the matrix bounds'], 400);
            }
            if ($matrix[$obstacle[0] - 1][$obstacle[1] - 1] == 2) { // check if the position is already occupied by the queen
                return $this->jsonErrorResponse(['obstacles' => 'That position is already occupied by the queen'], 400);
            }
            $matrix[$obstacle[0] - 1][$obstacle[1] - 1] = 3;
        }
        $matrix = $this->initializeMatrix($matrix, $n, $rq, $cq);
        $response = $this->countQueensAttack($matrix);
        return response()->json([
            'matrix' => $matrix,
            'response' => $response,
        ], 200);
    }

    private function initializeMatrix($matrix, $n, $rq, $cq)
    {
        $this->markPositions($matrix, $rq, $cq, $n, 1, 0); //mark positions horizontally
        $this->markPositions($matrix, $rq, $cq, $n, -1, 0); //mark positions horizontally reversed
        $this->markPositions($matrix, $rq, $cq, $n, 0, 1); //mark positions vertically
        $this->markPositions($matrix, $rq, $cq, $n, 0, -1); //mark positions vertically reversed
        $this->markPositions($matrix, $rq, $cq, $n, 1, 1); //mark positions diagonally
        $this->markPositions($matrix, $rq, $cq, $n, 1, -1); //mark positions anti-diagonally
        $this->markPositions($matrix, $rq, $cq, $n, -1, -1); //mark positions diagonally reversed
        $this->markPositions($matrix, $rq, $cq, $n, -1, 1); //mark positions anti-diagonally reversed
        return $matrix;
    }

    private function markPositions(&$matrix, $rq, $cq, $n, $deltaRow, $deltaCol)
    {
        $i = $rq;
        $j = $cq;
        while ($i >= 0 && $i < $n && $j >= 0 && $j < $n) {
            if ($matrix[$i][$j] == 3) {
                break;
            }
            if ($matrix[$i][$j] == 0) {
                $matrix[$i][$j] = 1;
            }
            $i += $deltaRow;
            $j += $deltaCol;
        }
    }

    private function isValidPosition($position, $n) // check if the position is within the matrix bounds
    {
        return $position[0] >= 1 && $position[0] <= $n && $position[1] >= 1 && $position[1] <= $n;
    }

    private function countQueensAttack($matrix) // count the number of queens attacking the queen
    {
        $count = 0;
        foreach ($matrix as $row) {
            foreach ($row as $cell) {
                if ($cell == 1) {
                    $count++;
                }
            }
        }
        return $count;
    }

    private function jsonErrorResponse($errors, $statusCode)
    {
        return response()->json([
            'errors' => $errors,
            'status' => $statusCode,
        ], $statusCode);
    }
}

