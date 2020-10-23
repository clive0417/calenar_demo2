<?php
header('Content-Type: application/json; charset=utf-8');//告訴檔案類型
include('../../db.php');
include('../HttpStatusCode.php');
// 嘗試寫連結到server 
// 清楚問題 starttime & endtime 抓不到
try {
    $pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]",$db['username'],$db['password']);//3307 是MAMP mySQL 的port

} catch (PDOException $e) {
    echo "database connection failed.";//echo 呼叫  = javascript 的 console.log
    exit;//離開
}


// sql 資料讀取

$sql = 'SELECT * FROM events WHERE id=:id';
$statement = $pdo ->prepare($sql);// 暫存
$statement->bindValue(':id', $_POST['id'], PDO::PARAM_INT);
$statement->execute();

$event = $statement->fetch(PDO::FETCH_ASSOC);


if ($event==false)//抓不到資料，ID 有問題
    new HttpStatusCode(400, 'No such an event.');
    echo json_last_error($event);
echo json_encode($event);
?>

