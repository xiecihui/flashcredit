'use strict';
define(['jquerynew'], function($$) {
    var exports = {};
    exports.index = function(){
          $('.abtn').on('click',function(){
            $.ajax({
                type: 'get',
                url: '/static/js/controller/all.json',
                data: { 'operate':$('.Operate').val()},
                contentType: 'application/json;charset=utf-8',
                dataType: 'json',
                beforeSend: function ( xhr ) {
                    xhr.overrideMimeType("text/plain; charset=x-user-defined");
                    $('.abtn').off('click');
                }
            })
            .done(function(data) {
                $('.spinner').removeClass('hide');
                if($('.Operate').val() == data.id){
                    $('.code').removeClass('hide');
                    $('.pass,.forgetpassword,.spinner').addClass('hide');
                    $('.abtn').off('click').on('click',function(){
                        var code = $('.code').find('input');
                        if(code.val() == ''|| code.val() == null){
                            alert('请输入短信验证码')
                            return;
                        }
                        $.ajax({
                            url: '/static/js/controller/duanx.json',
                            type: 'get',
                            dataType: 'json',
                            data: {code: code.val()},
                        })
                        .done(function(data) {
                            if(code.val() == data.id ){
                                location.href = "home3.html";
                            }
                            if(code.val() != data.id ){
                                alert('验证码错误！！！');
                            }
                        })
                        .fail(function() {
                            console.log("网络异常");
                        })                        
                    })
                }

            })
            .fail(function() {
                console.log("网络异常");
                $('.abtn').on('click');
            })
            
          })
    }
    exports.init = function(){
       exports.index();
    }

    return exports;
});