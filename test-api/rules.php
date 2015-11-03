<?php
if($_GET['mode'] == "has"){
    echo json_encode([
        [
            "id" => 1,
            "name" => '普通用户'
        ],
        [
            "id" => 2,
            "name" => '高级用户'
        ],
        [
            "id" => 3,
            "name" => '管理员'
        ],
        [
            "id" => 4,
            "name" => '超级管理员'
        ],
        [
            "id" => 5,
            "name" => '投稿人'
        ]
    ]);
}else{
    echo json_encode([]);
}