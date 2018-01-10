/**
 * @introduction  select Address
 */
'use strict';

define(['jquery'], function($$) {
  function TreeLinkage(opt) {
    this.id = opt.id;
    this.level=opt.level?opt.level:3;
    this.data = opt.data;
    this.autoClose = opt.autoClose;
    this.getData = opt.getData || null;
    this.province = "";
    this.city = "";
    this.county = "";
    this.cityList = [];
    this.init();
  }

  TreeLinkage.prototype = {
    init: function() {
      var tpl = '<div class="xy_province clearfix">' +
        '<div class="xy_area_select">' +
        '<div class="xy_address"><span class="xy_val_text">请选城市</span><i class="arrow iconfont">x</i></div>' +
        '<div class="xy_tab_detail hide">' +
        '<div class="xy_area_tab clear">' +
        '<span class="xy_on" value="请选择省份"><em>请选择省份</em></span>' +
        '<span class="none" value="请选择市"><em>请选择市</em></span>'; 
        if(this.level==3){
          tpl+='<span class="none" value="请选择区"><em>请选择区</em></span>'; 
        }
        tpl+='</div>' +
        '<div class="xy_area_box clear">' +
        '<div class="xy_item xy_first_area">' +
        '<dl class="clearfixs" name="华北"></dl>' +
        '<dl class="clearfixs" name="华东"></dl>' +
        '<dl class="clearfixs" name="华南"></dl>' +
        '<dl class="clearfixs" name="西南"></dl>' +
        '<dl class="clearfixs" name="东北"></dl>' +
        '<dl class="clearfixs" name="华中"></dl>' +
        '<dl class="clearfixs" name="西北"></dl>' +
        '</div>' +
        '<div class="xy_item xy_second_area none">' +
        '<dl class="clear"></dl>' +
        '</div>' +
        '<div class="xy_item xy_third_area none">' +
        '<dl class="clear"></dl>' +
        '</div>' +
        '</div>' +
        '<span class="xy_close_btn">×</span>' +
        '</div></div>'+
        '<div class="xy_mask"></div>'+
        '</div>';
      $(this.id).html(tpl);

      this.tabs = $(this.id).find(".xy_area_tab");
      this.areas = $(this.id).find(".xy_area_box .xy_item");
      this.pathText = $(this.id).find(".xy_val_text");

      this.rendData();
      this.addMouseEvent();
    },
    rendData: function() {
      var obj = this.data;
      var dlBox = $(this.id).find(".xy_first_area");
      var areaArr = [];
      for (var i in obj) {
        if (obj[i].area) {
          var dd = "<dd data-id='"+ obj[i].id +"'><a href='javascript:;'>" + obj[i].name + "</a></dd>";
          $(dd).appendTo(dlBox.find("dl[name='" + obj[i].area + "']"))
        }
      }
    },
    addMouseEvent: function() {
      var the = this;
      var province = $(this.id).find(".xy_province");
      var btn_open = $(this.id).find(".xy_address");
      var detail = $(this.id).find(".xy_tab_detail");
      var firstMc = $(this.id).find(".xy_first_area");
      var secondMc = $(this.id).find(".xy_second_area");
      var threeMc = $(this.id).find(".xy_third_area");
      var btn_close = $(this.id).find(".xy_close_btn");
      btn_open.click(function() {
        $(this).addClass("select");
        detail.addClass("show").removeClass("hide");
        province.addClass("active");
      })
      btn_close.click(function() {
        btn_open.removeClass("select");
        detail.addClass("hide").removeClass("show");
        province.removeClass("active");
        // the.pathText.text(the.province + " " + the.city + " " + the.county);
        the.setAddress(the.province, the.city, the.county);
        if (the.getData) the.getData(the.getAddress());
      })

      firstMc.delegate("a", "click", function() {
        the.dataid = $(this).parent().attr("data-id");
        the.province = $(this).text();
        the.updateSecond();
      });
      secondMc.delegate("a", "click", function() {
        the.dataCid = $(this).attr("data-cid");
        the.city = $(this).text();
    if(the.level==2){
      if (!the.autoClose) {
        btn_close.click();
      }
      return;
    }
        the.updateThird();
      });
      threeMc.delegate("a", "click", function() {
        the.dataAid = $(this).attr("data-aid");
        the.county = $(this).text()
        the.cutoverTab(2, $(this).text());
        if (!the.autoClose) {
          btn_close.click();
        }
      });

      the.tabs.delegate("span", "click", function() {
        var _index = $(this).index();
        the.tabs.find("span").eq(_index).addClass("xy_on").siblings().removeClass("xy_on");
        the.areas.hide().eq(_index).show();
      })

    },
    updateSecond: function() {
      var the = this;
      var dlBox = $(this.id).find(".xy_second_area dl");
      var currProvince = this.province;
      var citys = [];
      var type = -1;
      this.data.forEach(function(item) {
        if (item.name === currProvince && item.sub && item.sub.length) {
          citys = item.sub;
          the.cityList = item.sub;
          type = item.type;
        }
      });

      this.cutoverTab(0, currProvince);
      var cityArr = citys.map(function(city) {
        return "<dd><a href='javascript:;' data-cid='" + city.cid + "' value='" + city.name + "'>" + city.name + "</a></dd>";
      });
      dlBox.html(cityArr.join(""));

      the.tabs.find("span").eq(1).removeClass("none").find("em").text("请选择城市");
      the.tabs.find("span").eq(2).addClass("none");

    },
    updateThird: function() {
      var the = this;
      var dlBox = $(this.id).find(".xy_third_area dl");
      var currCity = this.city;
      var countys = [];
      this.cityList.forEach(function(item) {
        if (item.name === currCity && item.sub && item.sub.length) {
          countys = item.sub;
        }
      });
      this.cutoverTab(1, currCity);

      var countyArr = countys.map(function(county) {
        return "<dd><a href='javascript:;' data-aid='" + county.aid + "' value='" + county.name + "'>" + county.name + "</a></dd>";
      });
      dlBox.html(countyArr.join(""));

      the.tabs.find("span").eq(2).removeClass("none").find("em").text("请选择区域");
    },
    cutoverTab: function(n, str) {
      var tabs = $(this.id).find(".xy_area_tab span");
      var areas = $(this.id).find(".xy_area_box .xy_item");
      tabs.eq(n + 1).addClass("xy_on").siblings().removeClass("xy_on");
      tabs.eq(n).find("em").text(str);

      if (n < 2) areas.hide().eq(n + 1).show();
    },
    getAddress: function() {
      var the = this;
      return {
        id: the.dataid,
        cid: the.dataCid,
        aid: the.dataAid,
        province: the.province,
        city: the.city,
        county: the.county
      }
    },
    setAddress: function(_p,_c,_y){

      this.province = _p;
      this.city = _c;
      this.county = _y;

      this.pathText.attr("data-id", this.dataid+"_"+this.dataCid+"_"+this.dataAid).text(this.province + " " + this.city + " " + this.county);
    }
  }

  return TreeLinkage;
});
