<?php
header('Content-Type: application/json');
echo json_encode([
    [
        "id" => 1,
        "text" => '吃货'
    ],
    [
        "id" => 2,
        "text" => '设计'
    ],
    [
        "id" => 3,
        "text" => '摄影'
    ],
    [
        "id" => 4,
        "text" => '代码'
    ],
    [
        "id" => 5,
        "text" => '旅游'
    ]
]);