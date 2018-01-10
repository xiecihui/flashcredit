'use strict';
define(['jquerynew'], function($$) {
    var exports = {};
    exports.index = function(){
        var bankList = $('.card-List');
        $('.abtn').on('click',function(){
            var bank = bankList.find("input:radio[name=backcur]:checked").val();
            alert(bank);
        })
        bankList.each(function(index, el) {
            var _this = $(this);
            if(_this.find('li').length <= 1){
                _this.addClass('bankOne');
            }
        });
    }
    exports.init = function(){
       exports.index();
    }

    return exports;
});