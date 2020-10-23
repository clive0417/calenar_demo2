<?php
// include 機密資料$db 用不同層做影壁
include('../db.php');
// 嘗試寫連結到server 
try {
    $pdo = new PDO("mysql:host=$db[host];dbname=$db[dbname];port=$db[port];charset=$db[charset]",$db['username'],$db['password']);//3307 是MAMP mySQL 的port
} catch (PDOException $e) {
    echo "database connection failed.";//echo 呼叫  = javascript 的 console.log
    exit;//離開
}
// data insde function :date 回傳今日 依據"Y/M/D"
// 定義變數今年今月，
$year = date('Y');
$month = date('m');
// load event
//:year　代表待被取代，bindValue 組合數值　$events 　這個是取出當月份的event 
$sql = 'SELECT * FROM events WHERE year=:year AND month=:month ORDER BY `date`, start_time ASC ';// 選取資料
$statement = $pdo->prepare($sql);
$statement->bindValue(':year', $year, PDO::PARAM_INT);
$statement->bindValue(':month', $month, PDO::PARAM_INT);
$statement->execute();
$events = $statement->fetchAll(PDO::FETCH_ASSOC);
// remove 秒數
foreach ($events as $key => $event) {
	$events[$key]['start_time'] = substr($event['start_time'], 0, 5);
};
// 確認多少天 計算該月有多少日　　cal_days_in_month ( int $calendar , int $month , int $year ) : int
$days=cal_days_in_month(CAL_GREGORIAN,$month,$year);
// 1 號是星期幾
$firstDateOfTheMonth = new DateTime("$year-$month-1");
// 最後一天是星期幾
$lastDateOfTheMonth = new DateTime("$year-$month-$days");
// calendar 要填的 padding
$frontPadding = $firstDateOfTheMonth->format('w');	// 3
$backPadding = 6 - $lastDateOfTheMonth->format('w');	// 4
// 填前面padding
// 填一到月底
// 填後面padding 


// 填 前面的 padding　$dates＝[null,null,1,2,3,....]
for ($i=0; $i < $frontPadding; $i++) { 
	$dates[] = null;
}

// 填 1-$days
for ($i=0; $i < $days; $i++) { 
	$dates[] = $i+1;
}

// 填 後面的 padding
for ($i=0; $i < $backPadding; $i++) { 
	$dates[] = null;
}



?>
<script>
	// 將php 變數轉換為javascript 變數 
	var events = <?= json_encode($events, JSON_NUMERIC_CHECK) ?>;
</script>

