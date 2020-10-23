$(document).ready(function() {
    //panel 變數代表位置，做成
    var panel={
        el: '#info-panel',
        selectedDataBlock:null ,
        selectedEvent: null,
        init: function(isNew,e){
            panel.clear();

            panel.updateDate(e);//更新日期
            if (isNew) {// 判斷new or old
                $(panel.el).addClass('new').removeClass('update');
                panel.selectedDataBlock =  $(e.currentTarget);
                console.log($(panel.el));


			}
			else {
                //console.log('test');
                $(panel.el).addClass('update').removeClass('new');
				panel.selectedDateBlock = $(e.currentTarget).closest('.date-block');
                 //
                 console.log($(panel.el));
                 //$(panel.el).addClass('open').removeClass('update'); --> 這個做甚麼
			}

        },
        clear:function(){
            //clear from data 
            // clear start_time 
            //end time des
            $(panel.el).find('input').val('');
			$(panel.el).find('textarea').val('');

        },


        open: function(isNew,e) {
            panel.init(isNew,e);
            //console.log(isNew);
            $(panel.el).addClass('open').css({
                top: e.pageY+'px', 
                left: e.pageX+'px',
            }).find('.thing[contenteditable]').focus();
        },

            
        close: function() {
            $(panel.el).removeClass('open');

        },
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
            $(panel.el).find('.month').text(month);
            $(panel.el).find('.date').text(date);
            $(panel.el).find('[name="year"]').val(year);
			$(panel.el).find('[name="month"]').val(month);
            $(panel.el).find('[name="date"]').val(date);
            //console.log($(panel.el).find('[name="month"]').val())
            //帶新增排序功能

        },
    };

    //點兩下顯示功能
    // if is new -->只要click都是新的
    $('.date-block').dblclick(function(e){
        panel.open(true,e);
        var id = $(this).data('id');
        // AJAX call 取得event detail 
        //load detale to 
        //console.log(e);// addclass 做 XX 加上 class 的動作
    // 點event
    }).on('dblclick','.event',function(e){
        //停止事件網上傳播
        e.stopPropagation();
        //open penal[update]
        panel.open(false,e);

        panel.selectedEvent =$(e.currentTarget);




    });//在event 點擊就是就是舊事件update;




    // 確認四個button 功能
    $(panel.el).on('click','button',function(e){
        if ($(this).is('.create')) {
            //收集資料
            var data = $(panel.el).find('form').serialize();
            //AJAX call 
            //TODO

            //insert into event 
            var source = $('#event-template').html();//準備 樣板
            var eventTemplate = Handlebars.compile(source);// 用handlebar 將期變成套用樣板的函數
            var event ={
                id:"1",
                title:"title",
                start_time:"10:10",
            };//data
            var eventUI= eventTemplate(event);//合併後的東西
            panel.selectedDataBlock.find('.events').append(eventUI);// 前面是指定 block 後面是插入
            panel.close();


        };
        if ($(this).is('.update')) {
            //TODO
            // 指向id 
            //收集資料
            // AJAX call to database
            // update database  
            // update to event UI

        };
        if ($(this).is('.cancel')) {
            panel.close();
           //按cancel panel 取消 
        };
        if ($(this).is('.delete')) {
            //id 
            var id =panel.selectedEvent.data('id');// 
            //AJAX call =delete.php
            //remove event from calendar
            var id =panel.selectedEvent.remove();
            panel.close();

        };

    })
    .on('click', '.close',function(e){
        panel.close();//導向至按cancel
    });
    //button 功能end


});
