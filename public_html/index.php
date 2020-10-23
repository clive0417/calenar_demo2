<?php include('header.php') ?>
<?php include('data.php') ?>
<!--template.php　事件的檔案  -->
<?php include('template.php') ?>

<div id=calendar data-year="<?= date('Y')?>" data-month="<?= date('m')?>"> 
   <div id="header">
        <?= date('Y')?>/<?= date('m')?>
   </div>
   <!-- titl3 星期日到星期六 -->
   <div id="days" class="clearfix">
        <div class="day">SUN</div>
        <div class="day">MON</div>
        <div class="day">TUE</div>
        <div class="day">WED</div>
        <div class="day">THU</div>
        <div class="day">FRI</div>
        <div class="day">SAT</div>   
   </div>
   <!-- 日期的格數$dates＝[null,null,1,2,3,....]　calss null 以及加掛日期資料-->　
   <div id="dates" class="clearfix">
		<?php foreach ($dates as $key => $date): ?>
			<div class="date-block <?= (is_null($date))? 'empty' : '' ?>" data-date="<?= $date ?>">
                <div class="date"><?= $date ?></div>
                <!--加掛事件　樣板 -->
				<div class="events">
				</div>
			</div>
		<?php endforeach ?>
	</div>

   



</div>
<!-- 點入新增事件的panel 初始條件在 css 當中設定 透過JS 改顯示位置以及button組合不顯示-->
<div id="info-panel" class="new">
    <div class="close">X</div>

    <form>
        <!-- id資料不show 用 hidden -->
        <input type="hidden" name="id">
        <div class="title">
            <label for=""> event</label><br>
            <input type="text" name="title">
        </div>
        <div class="error-msg">
        <div class="alert alert-danger"></div>
        </div>
        <div class="time-picker">
            <div class="select-date">
                <!-- 日期是變數所以是到js 後面才加上的 -->
                <span class="month"></span>/<span class="date"></span>
                <input type="hidden" name="year">
                <input type="hidden" name="month">
                <input type="hidden" name="date">                 
            </div>
            <div class="from">
                <label for="from">form</label><br>
                <input type="time" name="start_time" id="from">

            </div>
            <div class="to">
            <label for="to">to</label><br>
                <input type="time" name="end_time" id="to">

            </div>
        </div>
        <div class="description">
            <label>description</label><br>
            <textarea name="description" id="description" ></textarea>
        </div>
    </form>
        <!-- 分兩組顯示-->
        <!-- create  create / cancel-->
        <!-- update  update / cancel/delete-->
    <div class="buttoms">
        <button class="create">create</button>
        <button class="update">update</button>
        <button class="cancel">cancel</button>
        <button class="delete">delete</button>

    </div>
</div>



<? include('footer.php')?>
