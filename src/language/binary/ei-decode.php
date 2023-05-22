<?php

function ei_decode($ei)
{
    // Copyright 2013 Deed Poll Office Ltd, UK <https://deedpolloffice.com>
    // Licensed under Apache Licence v2.0 <http://apache.org/licenses/LICENSE-2.0>
    $ei = base64_decode(str_replace(array('_', '-'), array('+', '/'), $ei));
    if (!preg_match('/^(.{4})((?:[\x80-\xff]*[\0-\x7f])+)$/sx', $ei, $matches)) return false; // Non-valid ei value
    $ret = array();
    $val = 0;
    foreach (str_split($matches[1]) as $i => $c)
        $val = PHP_INT_SIZE < 5 && function_exists('bcadd') ?
            bcadd($val, bcmul(ord($c), bcpow(2, $i * 8))) :
            $val + (ord($c) << $i * 8);
    $ret[0] = $val;
    preg_match_all('/[\x80-\xff]*[\0-\x7f]/', $matches[2], $matches, PREG_SET_ORDER);
    foreach ($matches as $j => $match) {
        $val = 0;
        foreach (str_split($match[0]) as $i => $c)
            $val = PHP_INT_SIZE < 8 && function_exists('bcadd') ?
                bcadd($val, bcmul(ord($c) & 0x7f, bcpow(2, $i * 7))) :
                $val + ((ord($c) & 0x7f) << $i * 7);
        $ret[$j + 1] = $val;
    }
    return $ret;
}
