<?php
header('Content-Type: application/json');
echo json_encode([
    [
        "id" => 1,
        "title" => '吃货'
    ],
    [
        "id" => 2,
        "title" => '设计'
    ],
    [
        "id" => 3,
        "title" => '摄影'
    ],
    [
        "id" => 4,
        "title" => '代码'
    ],
    [
        "id" => 5,
        "title" => '旅游'
    ]
]);