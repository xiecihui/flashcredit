/**
 * @introduction  dialog demo js
 */
'use strict';

define(['jquery', 'dialog'], function($$, dialog) {
    var exports = {};

    /*
    这里写功能函数 让init函数调用
     */

     // 实例
    exports.demo = function(){
      $(".demos").on("click", function(){
        var d = dialog({
            title: '新增加收货地址',  // 标题可选
            content: $(".box"), // 要弹出页面中哪个元素
            fixed: true, //是否需要滚动
            // 如无需要请使用自定义按钮
            cancelValue: '取消',
            cancel: function () {
              alert('取消');
            },
            okValue: '确定',
            ok: function(){
              console.log(2222);
            },
        });
        d.showModal(); // 需要遮罩时执行
        //d.show(); // 无遮罩弹层
      })

      $(".demos1").on("click", function(){
        $(".circle").remove();
        var d = dialog({
          content: $(".JselectAdd"), // 要弹出页面中哪个元素
          fixed: true, //是否需要滚动
        })
        d.show();
        $(".JentBtn").click(function(){
          setTimeout(function(){
            d.close().remove();
          }, 600)
        })
      })

    }


    exports.test = function() {
      var $box1 = $('.box1');
      var d;
      $('.demos2').on("click", function(){
        d = dialog({
            title: ' ',  // 标题可选
            content: $box1, // 要弹出页面中哪个元素
            fixed: true, //是否需要滚动
        });
        d.show();
      });
      $(".Jclose").on("click", function(){
        d.close().remove();
      })

      // 隐藏弹层
      var content = '<div style="padding: 30px; font-size: 20px;"><h3>gogogoggo</h3><a class="Jcloses">取消</a></div>';
      var showDialog;

      $(".Jok").on("click", function(){
        showDialog = dialog({
            title: ' ',  // 标题可选
            content: content, // 要弹出页面中哪个元素
            fixed: true, //是否需要滚动
        });
        showDialog.show();
      });
      $(document).on("click",".Jcloses", function(){
        showDialog.close().remove();
      })

    }

    // 按钮交互效果
    exports.aBtn = function() {
      var element, circle, d, x, y;
        $(".JentBtn").click(function(e){

        	element = $(this);

        	if(element.find(".circle").length == 0)
        		element.prepend("<span class='circle'></span>");

        	circle = element.find(".circle");
        	circle.removeClass("animate");

        	if(!circle.height() && !circle.width())
          {
        		d = Math.max(element.outerWidth(), element.outerHeight());
        		circle.css({height: d, width: d});
        	}

        	x = e.pageX - element.offset().left - circle.width()/2;
        	y = e.pageY - element.offset().top - circle.height()/2;

        	circle.css({top: y+'px', left: x+'px'}).addClass("animate");
        })
    }

    exports.init = function(){
      exports.demo();
      exports.aBtn();
      exports.test();
    }

    return exports;
});
