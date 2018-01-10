'use strict';
define(['jquery'], function($$) {
    var exports = {};
    var $html, $submitYes, $closereMove, $close, $dome;
    exports.styleSigh = function() {
        $html = '<div class="layerBox">' +
            '<div class="logo"><img src="static/img/layer-!.png" alt=""></div>' +
            '<div class="text"></div>' +
            '<div class="submit">' +
            '<a class="submitYes" href="javascript:;"> 确定不改了 </a>' +
            '<a class="layerClose" href="javascript:;"> 朕在看看 </a>' +
            '</div></div><div class="boxlayerdiv"></div>';
        exports.domeClass();
    }
    exports.styleY = function() {
        $html = '<div class="layerBox">' +
            '<div class="logo"><img src="static/img/layer-g.png" alt=""></div>' +
            '<div class="text"></div>' +
            '<div class="submit">' +
            '<a class="layerClose" href="javascript:;"> 朕知道了 </a>' +
            '</div></div><div class="boxlayerdiv"></div>';
        exports.domeClass();
    }
    exports.styleX = function() {
        $html = '<div class="layerBox">' +
            '<div class="logo"><img src="static/img/layer-x.png" alt=""></div>' +
            '<div class="text"></div>' +
            '<div class="submit">' +
            '<a class="layerClose" href="javascript:;"> 朕知道了 </a>' +
            '</div></div><div class="boxlayerdiv"></div>';
        exports.domeClass();
    }
    exports.domeClass = function() {
        $('body').append($html);
        $dome = $('.layerBox');
        $submitYes = $('.submitYes');
        $close = $('.layerClose');
        $closereMove = $('.layerBox,.boxlayerdiv');
    }
    exports.layerclose = function() {
        return $('.layerBox,.boxlayerdiv').remove();
    }

    exports.styleS1 = function(text, back, blod) {
        exports.styleSigh();
        (blod == null || blod == '') ? $dome.find('.text').text(text): $dome.find('.text').text(text).css('font-weight', 'bold');
        $close.on('click', function() {
            $closereMove.remove();
        });
        $submitYes.on('click', back);
    }
    exports.styleS2 = function(text, btnTxt) {
        exports.styleSigh();
        $dome.find('.text').text(text);
        $submitYes.remove();
        (btnTxt != null || btnTxt != '') ? $close.text("朕知道了"): $close.text(btnTxt);
        $close.on('click', function(e) {
            e.preventDefault();
            $closereMove.remove();
        });
    }
    exports.styleY1 = function(text, btnTxt, blod) {
        exports.styleY();
        $dome.find('.text').text(text);
        for (var index = 0; index < arguments.length; index++) {
            if (arguments[index] == "blod") {
                $dome.find('.text').text(text).css('font-weight', 'bold');
            } else {
                if (btnTxt != null || btnTxt != '' && arguments[index] == "blod") { $close.text(arguments[index]) };
            }
        }
        $close.on('click', function() {
            $closereMove.remove();
        });
    }
    exports.styleX1 = function(text, btnTxt, blod) {
        exports.styleX();
        $dome.find('.text').text(text);
        for (var index = 0; index < arguments.length; index++) {
            if (arguments[index] == "blod") {
                $dome.find('.text').text(text).css('font-weight', 'bold');
            } else {
                if (btnTxt != null || btnTxt != '' && arguments[index] == "blod") { $close.text(arguments[index]) };
            }
        }

        $close.on('click', function() {
            $closereMove.remove();
        });
    }
    exports.init = function() {
        exports.styleS1; //('文字提示语', 回调 , '空为默认blod为粗') !+提示a+提示b
        exports.styleS2; //('文字提示语','按钮文字提示')!+提示+按钮
        exports.styleY1; //('文字提示语','按钮文字提示','blod') 钩 + 提示 + 按钮 ”blod“是否加粗
        exports.styleX1; //('文字提示语','按钮文字提示','blod')  X + 提示 + 按钮 ”blod“是否加粗
    }
    return exports;
});