<?php
    $json = file_get_contents("php://input");
    $file = fopen('settings.json','w+');
    fwrite($file, $json);
    fclose($file);
?>
