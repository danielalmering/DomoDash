<?php
    $json = file_get_contents("php://input");
    $file = fopen('../config.json','w+');
    fwrite($file, $json);
    fclose($file);
?>
