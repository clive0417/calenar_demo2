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

// 建立 title 的驗證 OK
if (empty($_POST['title'])) {
   // echo($_POST);
    new HttpStatusCode(400, 'Title cannot be blank.');

}

// dis驗證 -->OK

// time range 檢查 OK
$startTime = explode(':', $_POST['start_time']);
$endTime = explode(':', $_POST['end_time']);
//echo ($startTime); //start_time 抓不到
if ($startTime[0]>$endTime[0] || ($startTime[0]==$endTime[0] && $startTime[1]>$endTime[1])) {
    new HttpStatusCode(400, 'Time range error.');
};
// sql 資料寫入
$sql = 'UPDATE events 
				SET title=:title, start_time=:start_time, end_time=:end_time, description=:description
				WHERE id=:id';
$statement = $pdo ->prepare($sql);// 暫存
$statement->bindValue(':id', $_POST['id'], PDO::PARAM_INT);//--> OK
$statement->bindValue(':title', $_POST['title'], PDO::PARAM_STR);//--> OK
$statement->bindValue(':start_time', $_POST['start_time'], PDO::PARAM_STR);	
$statement->bindValue(':end_time', $_POST['end_time'], PDO::PARAM_STR);
$statement->bindValue(':description', $_POST['description'], PDO::PARAM_STR);//--> OK
// 確認資料成功寫入
if ($statement ->execute()) {

    // 確認回傳資料
    // select 資料from 資料庫
    $sql= 'SELECT id, title, start_time FROM events WHERE id=:id';
    $statement = $pdo->prepare($sql);
    $statement->bindValue(':id', $_POST['id'], PDO::PARAM_INT);
    $statement->execute();//執行
    $event = $statement->fetch(PDO::FETCH_ASSOC);// 變成一個array 因為sql data 不是array
    //長板變短版
    $event['start_time']= substr($event['start_time'],0,5);

  
	echo json_encode($event);


};

?>

