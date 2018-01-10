/**
 * @introduction  demo js
 */
'use strict';
define(['jquery','selectAdd','layerui','uai'], function($$,selectAdd,layerUi) {
    var exports = {};
    exports.index = function(){
        $('.Jtbloans').on('click',".sumopt",function() {
            $(this).addClass('cur').siblings().removeClass('cur');
        }); 
        $('.Jtrems').on('click',"li",function() {
            $(this).addClass('cur').siblings().removeClass('cur');
        }); 

        if($('.homeCont').length === 0) return;
        var Jbt = $('#Jhometips');
        Jbt.on('click', function(e) {
            e.preventDefault();
            $(this).parents('body').find('.mod-layer-div').removeClass('hide');
            $(this).parents('body').find('.homeCont').removeClass('hide');
        });

        $('.layer-close').on('click', function(e) {
            e.preventDefault();
            $(this).parent('.mod-layer').addClass('hide');
            $(this).parents('body').find('.mod-layer-div').addClass('hide');
        });
    };
    exports.home3 =function(){
        var perdata = $('.perdata'),
            next        = $('.nextBtn'),
            oCont      = perdata.find('.pre-nav li'),
            oli        = perdata.find('.pres .pre-cont'),
            len         = oli.length,
            curIndex    = 0,
            _Index      = 0;
        function isEmail(str){
           var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
           return reg.test(str);
        }
        //切换函数
        function toggle(curIndex){
            oli.eq(curIndex).css('display', 'block').siblings('.pre-cont').hide();
            oCont.eq(curIndex).addClass('cur').siblings('li').removeClass('cur')
        }

        // $('.pre-nav').on('click', 'li', function() {
        //         var _this= $(this).index();
        //         curIndex = _this;
        //         $(this).addClass('cur').siblings('li').removeClass('cur')    
        //         $(this).parents('.perdata').find('.pre-cont').eq(curIndex).css('display', 'block').siblings().hide();
        // });
        next.prev().hide();
        $('.nextBtn').on('click',function(){
            $(this).prev().show();
            // 提交第一个表单
            if(curIndex == 0){
                var education = $('#education').val();
                var marriage = $('#marriage').val()
                var nowland = $('#nowland').find('.xy_val_text');
                var nowaddress = $('#nowaddress').val();
                var email = $('#Jemail').val();
                var regoffice = $('#regoffice').find('.xy_val_text');

                if(education =='' || marriage=='' || !nowland.attr('data-id') || nowaddress=='' || !regoffice.attr('data-id')){
                    layerUi.style6('填写信息有误！！！')
                    return;
                }

                if(!isEmail(email)){
                    alert('邮箱有误！！！')
                    return;
                }
                // $.ajax( {    
                //     url:'',
                //     data:{
                //       education:education,
                //       marriage:marriage,
                //       nowland:nowland,
                //       nowaddress:nowaddress,
                //       email:email,
                //       regoffice:regoffice
                //     },   
                //     type:'get',
                //     async: true, 
                //     dataType:'json',    
                //     success:function(data) {

                //     }
                // })
            }
            // 提交第二个表单
            if(curIndex == 1){
                var pattern = /^[0-9a-zA-Z\u4e00-\u9fa5]*$/g;
                if(!pattern.test($.trim($('#dwxinxi').val()))){
                    alert("单位信息。。。");
                }
                $.ajax( {    
                    url:'',
                    data:{
                      name:$(".ID").val()
                    },   
                    type:'get',
                    async: true, 
                    dataType:'json',    
                    success:function(data) {

                    }
                })
            }
            // 提交第san个表单
            if(curIndex == 2){
                curIndex=1;
                layer('static/img/layer-!.png','信息填写错误将会影响审核通过！！！','2',function() {
                    $('.submitYes').on('click', function() {
                        $('.layerBox,.boxlayerdiv').remove();
                        alert(1);
                    });
                });
                function layer(img,text,btn,sure) {
                    var $dome ='<div class="layerBox">'
                               +'<div class="logo"><img src="'+ img +'" alt=""></div>' 
                               +'<div class="text">'+ text +'</div>'
                               +'<div class="submit">'
                               +'<a class="submitYes" href="javascript:;"> 确定不改了 </a>'    
                               +'<a class="layerClose" href="javascript:;"> 朕在看看 </a>'
                               +'</div></div><div class="boxlayerdiv"></div>';

                    $('body').append($dome);

                    console.log(btn);
                    if((btn != null || btn != '') && btn == '1' ){
                        $('.submitYes').remove();
                    }

                    $('.layerClose').on('click', function(e) {
                        e.preventDefault();
                        $('.layerBox,.boxlayerdiv').remove();
                    });
                    var suer = sure;
                    if(sure != null || sure != ''){
                        suer();
                    }
                    
                }

                $.ajax( {    
                    url:'',
                    data:{
                      name:$(".ID").val()
                    },   
                    type:'get',
                    async: true, 
                    dataType:'json',    
                    success:function(data) {
                        window.location.href="www.baidu.com";
                    }
                })
            }
            curIndex++;
            toggle(curIndex) 
            if(curIndex>0){
                $('.prevBtn').removeClass('hide');
            }

        });
        $('.prevBtn').click(function(){
            curIndex--;
            toggle(curIndex) 
            if(curIndex == 0){
                $(this).addClass('hide');
                $(this).next().hide();
                return;
            }
        });
    }
    exports.tab = function(){
        function setTab(el, contOuter, contInner) {
            el.each(function(index){
                var _this = $(this);
                _this.on('click', function(){
                    //控制切换的元素如自身效果
                    _this.addClass('cur').siblings().removeClass('cur');
                    // 内容显示隐藏
                    _this.parents().find(contOuter).find(contInner).eq(index).show().siblings().hide();
                })
            });
        };
        //推荐切换
        var $package_tab = $('.login-tab li');
        setTab($package_tab, '.login-box', '.contlgin');
    }
    exports.iphone = function(){
        var Jbt = $('#Jbtn'),
            telpass = $('.telpass'),
            flag = false;

        Jbt.off('click').on('click', '.btn',function(e) {
            e.preventDefault();

            if(flag == true){
                return;
            }
            flag = true;

            var count = 3;
            var countdown = setInterval(CountDown, 1000);
            function CountDown() {
                Jbt.attr("disabled", true).css({'background-color':'#666','box-shadow':'none'});
                Jbt.html(count + "秒后重新获取");
                if (count == 0) {
                    Jbt.html("重新发送").removeAttr("disabled");
                    Jbt.removeAttr('style');
                    clearInterval(countdown);
                    flag = false;
                }
                count--;
            }
        });
        //失去焦点
        telpass.blur(function(){
            if($(this).val().length == 0){
                $('.seepass').addClass('hide');
            }else{
                $('.seepass').removeClass('hide');
            }
        });
        $('.seepass').on('click',function(){
            if(!$(this).hasClass('on')){
                $(this).addClass('on');
                $(this).removeClass('hide');
                telpass.attr({
                    type: 'text'
                });
            }else{
                $(this).removeClass('on');
                telpass.attr({
                    type: 'password'
                });
            }

        });
        // telpass.keyup(function(){
        //     var aa = $(this).val();
        //     $('.seepass').removeClass('hide');
        // })
        
    }
    exports.selectEnter = function(){
        if($('.home3').length == 0) return;
        var selectbox = $('.selectbox');
        selectbox.each(function(index, el) {
            new selectAdd({
                id:$(this),
                level:$(this).attr('level'),
                data:chinaCity, //来自data.js
                autoClose:false,
                getData:function(data){
                    //console.log(data) //当前选中地址
                }
            });
            h5close($(this));
        });
        
        function h5close(the){
            //h5关闭地址选项
            $(the).find('.xy_mask').on('click',function(){
                var _this = $(this);
                _this.parents('.xy_province').removeClass('active');
                _this.parent().find('.xy_tab_detail').removeClass('show');
                _this.parent().find('.xy_tab_detail').addClass('hide');
            });
        }
    }
    exports.number = function(){
        if($('.mycont').length == 0) return;
        var mycont = $('.mycont');
        var mycontId = mycont.find('#number').text();
        var str=mycontId.replace(/(\d{3})(\d+)(\d{4})/,function(x,y,z,p){
            var i="";
            while(i.length<z.length){i+="*"}
            return y+i+p
        })
        mycont.find('#number').text(str)
    }
    exports.names = function(){
        if($('#mobname').length == 0) return;
        var mbox = $('.mob-boxs');
        var mboxs = mbox.find('#JmbcardID').val();
        var str=mboxs.replace(/(\d{6})(\d+)(\d{4})/,function(x,y,z,p){
            var i="";
            while(i.length<z.length){i+="*"}
            return y+i+p
        })
        mbox.find('#JmbcardID').val(str);

        var mName = mbox.find('#JmbName').val();
        var str1=mName.replace(/^(.{1})(.+)(.{0})/,function(x,y,z,p){
            var i="";
            while(i.length<z.length){i+="*"}
            return y+i+p
        })
        mbox.find('#JmbName').val(str1);
    }
    exports.bankcard = function(){
        if($('#Jbankcard').length == 0) return;
        var mbox = $('.bankcard');
        var mboxs = mbox.find('#Jbankcard').val();
        var mboxsName = mbox.find('#JmbName').val();
        var mboxsTel = mbox.find('#JmbcardTel').val();

        var str=mboxs.replace(/(\d{6})(\d+)(\d{4})/,function(x,y,z,p){
            var i="";
            while(i.length<z.length){i+="*"}
            return y+i+p
        })
        mbox.find('#Jbankcard').val(str);

        var str1 =mboxsName.replace(/^(.{0})(.+)(.{1})/,function(x,y,z,p){
            var i="";
            while(i.length<z.length){i+="*"}
            return y+i+p
        })
        mbox.find('#JmbName').val(str1);

        var str2=mboxsTel.replace(/(\d{3})(\d+)(\d{4})/,function(x,y,z,p){
            var i="";
            while(i.length<z.length){i+="*"}
            return y+i+p
        })
        mbox.find('#JmbcardTel').val(str2);

        //提示银行卡和人名不一样
        if($('#careName').val() != '123'){
            $('.mod-layer-div').removeClass('hide');
            $('.bankcardlayer').removeClass('hide');
        }
        $('.layer-close').on('click', function(e) {
            e.preventDefault();
            $(this).parent('.mod-layer').addClass('hide');
            $(this).parents('body').find('.mod-layer-div').addClass('hide');
        });
    }
    exports.operator = function(){
        if($('#operator').length == 0) return;
        var operator = $('.operator');
        var tel = operator.find('#number').val();
        var str=tel.replace(/(\d{3})(\d+)(\d{4})/,function(x,y,z,p){
            var i="";
            while(i.length<z.length){i+="*"}
            return y+i+p
        })
        operator.find('#number').val(str)
    }
    exports.layer = function(){
        if($('.WeChatID').length == 0) return;
        var WeChatID = $('.WeChatID');
        var contHtml = $('.WeChatlayer').html();

        WeChatID.on('click', function(e) {
            e.preventDefault();
            $('.WeChatlayer').html(contHtml);
            $(this).parents('body').find('.mod-layer-div').removeClass('hide');
            $(this).parents('body').find('.WeChatlayer').removeClass('hide');

            colse();
        });
        $('#meCode').on('click', 'img', function(e) {
            e.preventDefault();
            var _this = $(this);
            var codeSrc = _this.attr('codeSrc');
            $('.mod-layer-div').removeClass('hide');
            $('.WeChatlayer').removeClass('hide');
            $('.WeChatlayer').find('.layer-title').text('我的邀请码');
            $('.layer-cont').find('img').attr('src',codeSrc);
            colse();
        });

        function colse(){
            $('.layer-close').on('click', function(e) {
                e.preventDefault();
                $(this).parent('.mod-layer').addClass('hide');
                $(this).parents('body').find('.mod-layer-div').addClass('hide');
            });
        }
    }
    exports.agreement = function(){
        if($('.agreement').length == 0) return;
        var agree =$('.agreement');
        var agreement = $('#agreementBtn');
        var autograph = agree.find('.autograph');
        agreement.on('click', function(e) {
            e.preventDefault();
            $(this).parents('body').find('.mod-layer-div').removeClass('hide');
            $(this).parents('body').find('.agreementlayer').removeClass('hide');
        });
        autograph.each(function() {
            $(this).on('click', function(e) {
                e.preventDefault();
                $(this).parents('.agreementlayer').addClass('hide');
                $(this).parents('body').find('.agreeSuc').removeClass('hide');
                $(this).parents('body').find('.mob-divs #agreementBtn').addClass('hide');
                $(this).parents('body').find('.mob-divs .footerBtn').removeClass('hide');
            });
        });

        $('.layer-close').on('click', function(e) {
            e.preventDefault();
            $(this).parent('.mod-layer').addClass('hide');
            $(this).parents('body').find('.mod-layer-div').addClass('hide');
        });

    }
    exports.schedules = function(){
        if($('.schedules').length == 0) return;
        var schedules = $('#schedulesBtn');
        schedules.on('click', function(e) {
            e.preventDefault();
            $(this).parents('body').find('.mod-layer-div').removeClass('hide');
            $(this).parents('body').find('.scheduleslayer').removeClass('hide');
        });
        $('.schebtn').on('click', function(e) {
            e.preventDefault();
            var tepl;
            tepl = '<a class="layer-close" href="javascript:;">朕知道了</a>';
            $(this).parent('.mod-layer').find('.layer-text').html('还款成功！！！')
            $(this).parent('.mod-layer').find('.schebtn').remove();
            $('.mod-layer').append(tepl);
            if(tepl){
                $('.layer-close').on('click', function(e) {
                    e.preventDefault();
                    $(this).parent('.mod-layer').addClass('hide');
                    $(this).parents('body').find('.mod-layer-div').addClass('hide');
                });
            }
        });
    }
    exports.loginpass = function(){
        if($('.loginpass').length == 0) return;
        var loginD = $('.loginpass'),
            next = loginD.find('.abtn'),
            oCont = loginD.find('.mod-pass li'),
            oli = loginD.find('.telaut .loginpass-cont'),
            curIndex = 0;
        //切换函数
        function toggle(curIndex){
            oli.eq(curIndex).css('display', 'block').siblings('.loginpass-cont').hide();
            oCont.eq(curIndex).addClass('cur');
        }
        next.click(function(){
            // 提交第一个表单
            if(curIndex == 0){
                oCont.eq(curIndex).addClass('on');

                // $.ajax( {    
                //     url:'',
                //     data:$('.iphoneCode').val(),   
                //     type:'get',
                //     async: true, 
                //     dataType:'json',    
                //     success:function(data) {

                //     }
                // })
                // 
                $(this).text('提交');

            }
            // 提交第二个表单
            if(curIndex ==1){
                // $.ajax( {    
                //     url:'',
                //     data:{
                //       name:$(".ID").val()
                //     },   
                //     type:'get',
                //     async: true, 
                //     dataType:'json',    
                //     success:function(data) {

                //     }
                // })
            }
            curIndex++;
            toggle(curIndex);
        });
    }
    exports.homepass = function(){
        if($('.homepass').length == 0) return;
        var loginD = $('.homepass'),
            next = loginD.find('.abtn'),
            oCont = loginD.find('.mod-pass li'),
            oli = loginD.find('.telaut .loginpass-cont'),
            curIndex = 0;
        //切换函数
        function toggle(curIndex){
            oli.eq(curIndex).css('display', 'block').siblings('.loginpass-cont').hide();
            oCont.eq(curIndex).addClass('cur');
        }
        next.click(function(){
            // 提交第一个表单
            if(curIndex == 0){
                oCont.eq(curIndex).addClass('on');

                // $.ajax( {    
                //     url:'',
                //     data:$('.iphoneCode').val(),   
                //     type:'get',
                //     async: true, 
                //     dataType:'json',    
                //     success:function(data) {

                //     }
                // })
                $(this).text('提交');
            }
            // 提交第二个表单
            if(curIndex ==1){
                // $.ajax( {    
                //     url:'',
                //     data:{
                //       name:$(".ID").val()
                //     },   
                //     type:'get',
                //     async: true, 
                //     dataType:'json',    
                //     success:function(data) {

                //     }
                // })
            }
            curIndex++;
            toggle(curIndex);
        });
    }
    exports.numberTxt = function(){
        $('.numberTxt').each(function() {
            $(this).blur(function(){
                var text =$(this).val().replace(/[^\d.]/g,'');
                $(this).val(text);
            })
            $(this).keyup(function(){
                var text =$(this).val().replace(/[^\d.]/g,'');
                $(this).val(text);
            })

        });
    }
    exports.init = function(){
       exports.index();
       exports.home3();
       exports.tab();
       exports.iphone();
       exports.selectEnter();
       exports.number();
       exports.names();
       exports.bankcard();
       exports.operator();
       exports.layer();
       exports.agreement();
       exports.schedules();
       exports.loginpass();
       exports.homepass();
       exports.numberTxt();
    }

    return exports;
});
