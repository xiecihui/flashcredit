$(function() {
	var _w = 456;
	var _h = 344;
	var _img1 = {};
	var _img2 = {};
	var _img3 ={};
	var _ceng = $('.mod-layer-div');
	var _btnClose = $('.IDClose');
	$(".upload-btn input").on("change", function() {
		var _this = $(this);
		var fr = new FileReader();
		fr.readAsDataURL(this.files[0]);

		var img = new Image();
		var btn = _this.parent();
		//btn.hide();
		var upImg = btn.siblings(".upload-img");
		var imgOn = _this.parents('.idCare').find(".upload-img");
		var imgSuc = _this.parents('.idCare').find(".sample-tit");
		upImg.addClass("loading");
		imgSuc.html('<img src="static/img/IDimg.png" style="width:25px;margin-top: 1.5%;" alt="">')
		fr.onload = function() {
			img.src = this.result;
			img.onload = function() {
				btn.siblings(".upload-img").html(img);
				var ratio = 1;
				if (img.width > img.height) {
					upImg.find("img").addClass("mh");
					ratio = _h / img.height;
				} else {
					upImg.find("img").addClass("mw");
					ratio = _w / img.width;
				}

				var scroll = new IScroll(upImg[0], {
					zoom : true,
					scrollX : true,
					scrollY : true,
					mouseWheel : true,
					bounce : false,
					wheelAction : 'zoom'
				});

				if (btn.hasClass("btn-zheng")) {
					ajaxFileUpload("image_btn1", "#image1");
					_img1.img = img;
					_img1.scroll = scroll;
					_img1.ratio = ratio;
				}
				if (btn.hasClass("btn-fan")) {
					//ajaxFileUpload("image_btn2", "#image2");
					_img2.img = img;
					_img2.scroll = scroll;
					_img2.ratio = ratio;
				}
				if (btn.hasClass("btn-quan")) {
					//ajaxFileUpload("image_btn3", "#image3");
					_img3.img = img;
					_img3.scroll = scroll;
					_img3.ratio = ratio;
				}

				imgOn.show();
				_btnClose.removeClass('hide');
				_ceng.removeClass('hide');

				// imgSuc.on('click', function(e) {
				// 	e.preventDefault();
				// 	_ceng.removeClass('hide');
				// 	imgOn.show();
				// 	_btnClose.removeClass('hide');
				// });

				_btnClose.on('click', function(e) {
					e.preventDefault();
					_ceng.addClass('hide');
					imgOn.hide();
					$(this).addClass('hide');
				});

				setTimeout(function() {
					upImg.removeClass("loading").find("img").css("opacity", 1);
				}, 1000);
			}
		}
	});

	$(".submit").on("click",
			function() {
				var jsonResult = {
					"image1" : $("#image1").val(),
					"image2" : $("#image2").val(),
					"image3" : $("#image3").val(),
					"emp_no":$("#emp_no").val()
				};
				
				$.ajax({
					  type: 'POST',
					  url: '',
					  data: {"jsonStr" : JSON.stringify(jsonResult)},
					  success: function(date){
						  alert(date.msg);
						  window.location.href="/xdb/web/sharing!sharingDetail.do?sharingId=".concat(date.msg);
					  },
					  dataType: "json"
					});
				return;
				if (!_img1.img) {
					alert("本人身份证正面");
					return false;
				}
				if (!_img2.img) {
					alert("本人身份证反面");
					return false;
				}
				if (!_img3.img) {
					alert("本人持身份证正面照");
					return false;
				}

				var oneImg = imageData(_img1);
				var twoImg = imageData(_img2);
				var threeImg = imageData(_img3);

				alert(oneImg.substring(0, 50));
				alert(twoImg.substring(0, 50));
			});

	function imageData(obj) {
		obj.scroll.enabled = false;
		var canvas = document.createElement('canvas');

		canvas.width = _w;
		canvas.height = _h;
		var ctx = canvas.getContext('2d');

		var w = _w / obj.scroll.scale / obj.ratio;
		var h = _h / obj.scroll.scale / obj.ratio;
		var x = Math.abs(obj.scroll.x) / obj.scroll.scale / obj.ratio;
		var y = Math.abs(obj.scroll.y) / obj.scroll.scale / obj.ratio;

		ctx.drawImage(obj.img, x, y, w, h, 0, 0, _w, _h);
		return canvas.toDataURL();
	}

	function ajaxFileUpload(image, image_) {
		$.ajaxFileUpload({
			url : '',// servlet请求路径
			secureuri : false,
			fileElementId : image,// 上传控件的id
			dataType : 'json',
			data : {
				paramName : image
			}, // 参数名称
			success : function(data, status) {
				$(image_).val(data.msg);
			},
			error : function(data, status, e) {
				alert('上传出错');
			}
		});

		return false;

	}
});
