/**
 * @introduction  demo js
 */
'use strict';
define(['jquery','dropload'], function($$,dropload) {
    var exports = {};
    exports.morela = function(){
        var dropload = $('#wrapper').dropload({
            domUp : {
                domClass   : 'dropload-up',
                domRefresh : '<div class="dropload-refresh">↓下拉刷新</div>',
                domUpdate  : '<div class="dropload-update">↑释放更新</div>',
                domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
            },
            domDown : {
                domClass   : 'dropload-down',
                domRefresh : '<div class="dropload-refresh">↑上拉加载更多</div>',
                domUpdate  : '<div class="dropload-update">↓释放加载</div>',
                domLoad    : '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
            },
            distance : 280, 
            // loadUpFn : function(me){
            //     $.ajax({
            //         type: 'GET',
            //         url: 'static/js/controller/all.json',
            //         dataType: 'json',
            //         success: function(data){
            //             var result = '';
            //             for(var i = 0; i < data.lists.length; i++){
            //                 result += '<div class="myloanli' +" "+ data.lists[i].class +'">'
            //                         + '<div class="bt"><span>借款金额：'+ data.lists[i].money +'</span><p>'+ data.lists[i].time +'</p></div>'
            //                         + '<div class="hf"><span>借款期限：'+ data.lists[i].days +'天</span><p>'+data.lists[i].state+'</p></div>'
            //                         + '</div>';  
            //             }
            //             // 为了测试，延迟1秒加载
            //             setTimeout(function(){
            //                 $('.act-list').html('');
            //                 $('.act-list').prepend(result);
            //                 me.resetload();
            //             },500);
            //         },
            //         error: function(xhr, type){
            //             alert('Ajax error!');
            //             me.resetload();
            //         }
            //     });
            // },
            loadDownFn : function(me){
                $.ajax({
                    type: 'GET',
                    url: 'static/js/controller/all.json',
                    dataType: 'json',
                    async: false,
                    success: function(data){
                        var result = '';
                        console.log(data)
                        for(var i = 0; i < data.lists.length; i++){
                            result  +='<a href="schedules2.html?id='+ 13 +'"><dl class="bill'+" "+ data.lists[i].class +'">'
                                    +'<dt><span><i class="sprite icon-49"></i>闪信贷</span> <em>'+ data.lists[i].time+'</em></dt>'
                                    +'<dd><div><span>借款金额：</span> <em>&yen '+ data.lists[i].money +'</em></div><div><span>到账金额：</span> <em>&yen '+ data.lists[i].money +'</em></div></dd>'
                                    +'<dd><div><span>快速信审费：</span> <em>&yen '+ data.lists[i].money +'</em></div><div><span>信用咨询费：</span> <em>&yen '+ data.lists[i].money +'</em></div></dd>'
                                    +'<dd><span>还款金额：</span> <em>&yen '+ data.lists[i].money +'</em></dd>'
                                    +'<dd><span>还款日：</span> <em>'+ data.lists[i].days+'</em></dd>'
                                    +'</dl></a>';
                        }
                          // 为了测试，延迟1秒加载
                        setTimeout(function(){
                            $('.myloan').append(result);
                            me.resetload();
                        },500);
                    },
                    error: function(xhr, type){
                        $('.act-list').prepend(result);
                        me.resetload();
                    }
                });
            }
        });
    }


    exports.init = function(){
       exports.morela();
    }

    return exports;
});
