$(document).ready(function() {// 等待整個事件變成ready 
    //panel 變數代表位置，做成
    // 現在有event 可以使用了'#event-template是在 templ .php 裡面的javascript 裡的html 
    var source = $('#event-template').html();
    // 做成樣板之後複合進入
	var eventTemplate = Handlebars.compile(source);
	// 寫把事件依照日期填入find('.date-block[data-date="'+date+'"]').->日期條件
	$.each(events, function(index, event){
		var eventUI = eventTemplate(event);	
		var date = event['date'];
		$('#calendar').find('.date-block[data-date="'+date+'"]').find('.events').append(eventUI);
	});

    var panel={
        // el 指的javascript 綁定的 node 
        el: '#info-panel',
        //設定變數selectedDateBlock＆selectedEvent選擇日期以及事件
        selectedDateBlock:null ,
        selectedEvent: null,
        //wait update isNew 是在那裡設定
        //　init 就是panel 物件裡的，method 初始化
        init: function(isNew,e){
            // 清除內容
            panel.clear();
            // 顯示點選的日期
            panel.updateDate(e);

            if (isNew) {// 判斷new 修改class addClass('new').removeClass('update');
                $(panel.el).addClass('new').removeClass('update');
                panel.selectedDateBlock =  $(e.currentTarget);
                //console.log($(panel.el));


			}
			else {// 判斷典籍倒事件old 修改class .addClass('update').removeClass('new');
                //console.log('test');
                $(panel.el).addClass('update').removeClass('new');
				panel.selectedDateBlock = $(e.currentTarget).closest('.date-block');
                 //
                // console.log($(panel.el));
                 //$(panel.el).addClass('open').removeClass('update'); --> 這個做甚麼
			}

        },
        // 清除內容
        clear:function(){
            //clear from data 
            // clear start_time 
            //end time des
            $(panel.el).find('input').val('');
			$(panel.el).find('textarea').val('');

        },
        // 顯示日期.分兩種典籍的data-block以及 點到event 就必須往上爬一層.closest　到block 
        updateDate: function(e) {
            //get date from dateblock
            //get month from div #canlendar
            if ($(e.currentTarget).is('.date-block')){
                var date = $(e.currentTarget).data('date');
            }else{
            var date = $(e.currentTarget).closest('.date-block').data('date');
            }
            //get month from div #canlendar
            var year = $('#calendar').data('year');
            var month = $('#calendar').data('month');
            //console.log(date);
            //console.log(month);
            // 填入月分/日期資料在 class =month 的位置上也就是panel 的位置上　$(panel.el).find('.month').text(month);
            $(panel.el).find('.month').text(month);
            $(panel.el).find('.date').text(date);
            // 填入hidden form當中的值
            $(panel.el).find('[name="year"]').val(year);//丟入year 的值
			$(panel.el).find('[name="month"]').val(month);
            $(panel.el).find('[name="date"]').val(date);
            //console.log($(panel.el).find('[name="month"]').val())
            //帶新增排序功能

        },
        // 開啟
        open: function(isNew,e) {
            //初始化條件
            panel.init(isNew,e);
            //執行如果錯誤顯示error訊息
            panel.hideError();
            //console.log(isNew);//決定座標
            $(panel.el).addClass('open').css({
                top: e.pageY+'px', 
                left: e.pageX+'px',
            }).find('.title [contenteditable]').focus();
        },  
        //關閉 移除 class "open" 即可         
        close: function() {
            $(panel.el).removeClass('open');

        },
        //顯示錯誤訊息errormessage 的的位置是不掛不顯示的　加掛class open
        showError: function(msg) {
            $(panel.el).find('.error-msg').addClass('open').find('.alert').text(msg);
        }, 
        //顯示錯誤訊息errormessage 的的位置是不掛不顯示的　加掛class open
        
        hideError: function() {
            $(panel.el).find('.error-msg').removeClass('open')

        },
    };

    //點兩下顯示功能 isNew 是在 這個地方寫按照典籍位置，如果在block 傳入true 如果不是就是傳入 false
    // if is new -->只要click都是新的
    $('.date-block').dblclick(function(e){
        panel.open(true,e);
        //變數id 是空值尚未定義
        // console.log(id);
        // AJAX call 取得event detail 
        //load detale to 
        //console.log(e);// addclass 做 XX 加上 class 的動作
    // 點event
    }).on('dblclick','.event',function(e){
        //停止事件網上傳播，否則會出現 create
        e.stopPropagation();
        //open penal[update]
        panel.open(false,e);
        panel.selectedEvent =$(e.currentTarget);
        console.log(e.currentTarget);
        // TODO 
        var id = $(this).data('id');
        //AJAX call-get event detail
        $.post('event/read.php',{ id:id}, function (data,textStatus, xhr) {
            // console.log(id);
            $(panel.el).find('[name="id"]').val(data.id);
            $(panel.el).find('[name="title"]').val(data.title);
            $(panel.el).find('[name="start_time"]').val(data.start_time);
            $(panel.el).find('[name="end_time"]').val(data.end_time);
            $(panel.el).find('[name="description"]').val(data.description);

        }).fail(function(xhr){
            panel.showError(xhr.responseText);
        });




    });//在event 點擊就是就是舊事件update;




    // 確認四個button 功能 
    $(panel.el).on('click','button',function(e){
        //如果點create or update 按鈕 執行 將action的url 給變更為create.php or update php
        if ($(this).is('.create') || $(this).is('.update')) {
            if ($(this).is('.create'))
                var action = 'event/create.php';
            if ($(this).is('.update'))
                var action = 'event/update.php';

            //收集資料將form 的資料做serialize 再用Ajax 送到後端
            var data = $(panel.el).find('form').serialize();      
            //console.log(data); //到data 都 OK 傳到後端就不完整
            //AJAX call 
            // CREATE AJAX fail
            $.post(action,data, function(){})
                .done(function(data,textStatus, xhr,) {
                    //wait todo 排序
                    //console.log('1');[程式走不到done]
                    //AJAX 裡的data 表示是回傳的資料
                                    //insert into event 
                    
                    if ($(e.currentTarget).is('.update')){
                        panel.selectedEvent.remove();
                    };                                    
                    var eventUI= eventTemplate(data);//合併後的東西
                    panel.selectedDateBlock.find('event').each(function(index,event) {
                        var eventFromTime = $(event).data('from').split(':');
                        var newEventFromTime = data.start_time.split(':');
                        if (eventFromTime[0]>newEventFromTime[0] ||(eventFromTime[0]==newEventFromTime[0] && eventFromTime[1]>newEventFromTime[1]) ) {
                            $(event).before(eventUI);
                            return false;//中斷 break [return :true continous]
                        };

                    });

                    if(panel.selectedDateBlock.find('.event[data-id="'+data.id+'"]').length==0){// 代表還沒插入
                        panel.selectedDateBlock.find('.events').append(eventUI);// 插在最後面
                    }
                    // 前面是指定 block 後面是插入
                    panel.close();
                })
                .fail(function(xhr, textStatus, errorThrown){
                    panel.showError(xhr.responseText);
                    //console.log(xhr);
                    //console.log(xhr.responseText);


                });
                //TODO




        };

        if ($(this).is('.cancel')) {
            panel.close();
           //按cancel panel 取消 
        };
        if ($(this).is('.delete')) {
            var result = confirm('Do you really want to delete this event?');
            if (result) {
                var id =panel.selectedEvent.data('id');// 
                $.post('event/delete.php', { id: id })
                .done(function() {
    
                    panel.selectedEvent.remove();
                    panel.close();
                });

            };
            //id 

            //AJAX call =delete.php
            //remove event from calendar


        };

    })
    .on('click', '.close',function(e){
        panel.close();//導向至按cancel
    });
    //button 功能end


});
