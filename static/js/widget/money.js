'use strict';
define(['jquery',], function($$) {
  function money(opt) {
    this.id = opt.id;
    this.reduce = opt.reduce;
    this.increase = opt.increase;
    this.max = opt.max;
    this.min = opt.min;
    this.width = this.max-this.min;
    this.num = opt.num ? opt.num:100;
    this.i = this.width/this.num;
    this.initval = opt.initval ? opt.initval:1000;
    this.init();
  }
  money.prototype = {
    init:function(){
        var clickX, leftOffset, inx, nextW2, nextW;
        var dragging  = false;
        var doc       = document;
        var warp      = $(this.id);
        var labBtn    = warp.find('label');
        var wrapWidth = warp.width();
        var i         = wrapWidth/this.i;
        var is        = this.i;
        var wh        = this.width;
        var length    = this.num;
        var initval   = this.initval;
        var n         = this.i/2;
        var input     = $('.textInput').find('input');
        var reduce    = $(this.reduce);
        var increase  = $(this.increase);
        var max       = this.max;
        var min       = this.min;

        input.val(wh/2 + initval);

        labBtn.off('touchstart touchend').on({
            'touchstart': function(){
                dragging   = true;
                leftOffset = warp.offset().left;
                inx        = $(this).index('label');
            },
            'touchmove': function(e){
                if (dragging) {
                    var iW = labBtn.eq(inx).prev().width();
                    //--------------------------------------------
                    var touchs = e.touches[0],
                        sx = touchs.pageX,
                        sy = touchs.pageY;

                    clickX = sx;
                    //判断第几个拖动按钮
                    if( inx == 0 ){
                        //第一个拖动按钮左边不出界
                        if(clickX > leftOffset) {
                            labBtn.eq(inx).css('left', clickX - 7 - leftOffset + 'px');//按钮移动
                            labBtn.eq(inx).prev().width( clickX-leftOffset + 'px');
                            nextW2 = clickX-leftOffset;
                            labBtn.eq(inx).next().width( wrapWidth - nextW2 + labBtn.eq(inx+1).next().width() + 'px');
                        } else {
                            labBtn.eq(inx).css('left', '0px');
                        }

                        if(clickX > wrapWidth+leftOffset) {
                            //第一个按钮右边不出界
                            labBtn.eq(inx).css('left', wrapWidth - labBtn.width()/2-5);
                            //第一个按钮，左右容器不出界
                            labBtn.eq(inx).prev().width( labBtn.eq(inx).offset().left  - leftOffset + labBtn.width());
                            labBtn.eq(inx).next().width( '0px' );
                        } 
                        if(iW >= i*n ){
                            n++;
                        }
                        if(iW < i*n){
                            n--;
                        }
                        input.val(n*length + initval);

                        if(input.val() <=1400){
                            $('.Jtrems').find('li').eq(0).addClass('hide').next().addClass('cur');
                        }else{
                            $('.Jtrems').find('li').eq(0).removeClass('hide').next().removeClass('cur');
                        }
                    }
                }
            },
            'touchend':function(e){
                dragging = false;
                e.cancelBubble = true;
                e.preventDefault();
            }
        });
        addclick();
        function addclick(){
            var out = 0;
            reduce.on('click', function(e) {
                e.preventDefault();
                var val = parseInt(input.val());
                var liwidTh = labBtn.prev().width();
                var leftBtn = labBtn.width()/2;
                if( n < is ){
                    n++;
                    out = 0;
                    if(n == is){
                        out = leftBtn;
                    }
                }else{
                    return;
                }
                val = val + length;
                liwidTh = n*i;
                dataWidth(val,liwidTh,out);
            });
            increase.on('click', function(e) {
                e.preventDefault();
                var val = parseInt(input.val());
                var liwidTh = labBtn.prev().width();
                if( n > 0 ){
                    n--;
                }else{
                    return;
                }
                out = 0;
                val = val - length;
                liwidTh = n*i;
                dataWidth(val,liwidTh,out);
            });
            function dataWidth(val,liwidTh,out){
                input.val(val);
                labBtn.prev().width(liwidTh);
                labBtn.css('left', liwidTh - out);
            }
        }
    }
  }
  return money
})