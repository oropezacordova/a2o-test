<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class StringValueController extends Controller
{
    public function stringValue(Request $request) {
        $t = $request->value;
        $n = strlen($t);
        $maxValue = 0;
        $substringFrequency = [];
        for ($i = 0; $i < $n; $i++) {
            for ($j = 1; $j <= $n - $i; $j++) {
                $substring = substr($t, $i, $j);
                if (isset($substringFrequency[$substring])) {
                    $substringFrequency[$substring]++;
                } else {
                    $substringFrequency[$substring] = 1;
                }
            }
        }
        foreach ($substringFrequency as $substring => $count) {
            $length = strlen($substring);
            $fValue = $length * $count;
            if ($fValue > $maxValue) {
                $maxValue = $fValue;
            }
        }
        return response()->json(['max_value' => $maxValue], 200);
    }
}
