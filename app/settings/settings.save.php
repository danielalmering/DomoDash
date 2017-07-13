<?php
    $json = file_get_contents("php://input");

    $filename = '../../config.json';

    if(file_exists($filename) && !is_writeable($filename)){
        die('Error file or folder doesnt have write access');
    }

    $file = fopen('../../config.json','w+');

    fwrite($file, $json);
    fclose($file);
?>
