'use strict';
define(['jquerynew'], function($$) {
    var exports = {};
    exports.index = function(){
        var loanappli = $('.loan-appli');
        var loanappliheader = $('.loan-appli-header');
        var len = loanappli.find('ul li').length;
        loanappli.find('ul li').each(function(index, el) {
            if($(this).hasClass('cur')){
                index;
                loanappliheader.find('ul li').eq(index).addClass('cur');
                if(index == len-1){
                    $('.abtn').removeAttr('disabled');
                }
            }
        });
        $('.abtn').on('click',function(){
            alert(1);
        })
    }
    exports.init = function(){
       exports.index();
    }

    return exports;
});