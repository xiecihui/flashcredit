/**
 * @introduction  select adds (三级联动)
 */
'use strict';

define(['jquery', 'selectAdd'], function($$, selectAdd) {
    var exports = {};

    // 实例
    exports.selectAdds = function(){

      // pc 地址选择
      new selectAdd({
    		id:"#pcTreeBox",
    		data:chinaCity, //来自data.js
    		autoClose:false,
    		getData:function(data){
    			console.log(data) //当前选中地址
    		}
    	}).setAddress("上海", "上海市", "浦东新区"); // 默认设置地址

      // phone 地址选择
      new selectAdd({
    		id:"#phoneTreeBox",
    		data:chinaCity, //来自data.js
    		autoClose:false,
    		getData:function(data){
    			console.log(data) //当前选中地址
    		}
    	}).setAddress("上海", "上海市", "浦东新区"); // 默认设置地址


    }


    exports.init = function(){
      exports.selectAdds();
    }

    return exports;
});
