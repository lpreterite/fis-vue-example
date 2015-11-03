<?php
if($_GET['mode'] == "has"){
    echo json_encode([
        [
            "id" => 1,
            "name" => 'packy',
            "sex" => '男'
        ],
        [
            "id" => 2,
            "name" => 'winnie',
            "sex" => '女'
        ],
        [
            "id" => 3,
            "name" => 'jacky',
            "sex" => '女'
        ],
        [
            "id" => 4,
            "name" => 'jack',
            "sex" => '男'
        ],
        [
            "id" => 5,
            "name" => 'faker',
            "sex" => '男'
        ]
    ]);
}else{
    echo json_encode([]);
}