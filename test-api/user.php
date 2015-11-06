<?php
header('Content-Type: application/json');
echo json_encode([
    "id" => 1,
    "name" => 'packy',
    "sex" => '男',
    "is_display" => 1,
    "tags" => [2,4]
]);