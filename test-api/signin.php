<?php
header('Content-Type: application/json');
$_POST = json_decode(file_get_contents("php://input"), true);

if($_POST['name']=="admin" && $_POST['password']=="123456"){
    echo json_encode([
        "id"=> "1",
        "name"=> "admin",
        "authority"=> [
            "signin"=>true
        ]
    ]);
}else{
    header('HTTP/1.0 501 Unauthorized');
    exit;
}