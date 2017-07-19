<?php
$file   = file_get_contents("../../config.json");
$array  = json_decode($file, true)['network'];
$ip =   "127.0.0.1";



function ping($host, $port, $timeout) {
   $tB = microtime(true);
   $fP = fSockOpen($host, $port, $errno, $errstr, $timeout);
   if (!$fP) { return "down"; } // if host unavailable
   $tA = microtime(true);
   return round((($tA - $tB) * 1000), 0)." ms"; // if host is up - show ping delay

}
echo ping("192.168.192.49", 443, 10);

// for($i = 0; $i < count($array); $i++){
//     //system("ping -c 4 2>&1" . $array[$i]['ip'], $output);
//     system("ping -c 4 -n 1" . $array[$i]['ip'], $output);
//     //exec("ping -n 1 $array[$i]['ip']", $output);
//     //exec("ping 2>&1" . $array[$i]['ip'], $output);
//     //exec(sprintf('ping -c 1 -W 5 %s', escapeshellarg($ip)), $res, $rval);
//     print_r($output);
//
//
//     //$array[$i]['status'] = strpos($output[2], 'unreachable') == false ? 'green' : 'red';
//
//     //$output = null;
//     //$array[$i]['status'] = 'red';
// }



//echo json_encode($array);

?>
