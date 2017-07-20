<?php
$file   = file_get_contents("../../config.json");
$array  = json_decode($file, true)['network'];

function ping($host, $port, $timeout) {
    $tB = microtime(true);
    $fP = fSockOpen($host, $port, $errno, $errstr, $timeout);
    if (!$fP) { return "down"; } // if host unavailable
    $tA = microtime(true);
    return round((($tA - $tB) * 1000), 0)." ms"; // if host is up - show ping delay
}

for($i = 0; $i < count($array); $i++){
    $ping = ping("tcp://" . $array[$i]['ip'], 80, 10);
    if($ping == 'down'){
        $array[$i]['status']    = 'red';
    } else {
        $array[$i]['status']    = 'green';
        $array[$i]['ms']        = $ping;
    }
}

echo json_encode($array);

?>
