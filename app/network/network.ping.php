<?php
$file   = file_get_contents("../../config.json");
$array  = json_decode($file, true)['network'];

for($i = 0; $i < count($array); $i++){
    exec("ping -n 1 " . $array[$i]['ip'], $output);

    $array[$i]['status'] = strpos($output[2], 'unreachable') == false ? 'green' : 'red';

    $output = null;
}

header('Content-Type', 'application/json');

echo json_encode($array);

?>
