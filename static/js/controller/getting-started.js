// 图片上传demo
var index;
index = {
    imgup: function(aa, bb) {
        var $ = jQuery,
            $list = $(aa),
            $listbtn = $(bb),
            $close = $('.IDClose'),
            $layer = $('.mod-layer-div'),
            $spinner = $('.spinner'),
            $val = $list.attr('value'),
            $len =
            // 优化retina, 在retina下这个值是2
            ratio = window.devicePixelRatio || 1,

            // 缩略图大小
            thumbnailWidth = 100 * ratio,
            thumbnailHeight = 100 * ratio,

            // Web Uploader实例
            uploader;

        // 初始化Web Uploader
        uploader = WebUploader.create({

            // 自动上传。
            auto: true,
            // swf文件路径
            swf: 'static/js/controller/Uploader.swf',

            // 文件接收服务端。
            server: '/server/fileupload.php',

            // 选择文件的按钮。可选。
            // 内部根据当前运行是创建，可能是input元素，也可能是flash.
            pick: bb,
            // 压缩image
            resize: true,
            fileNumLimit: 1,
            multiple: false, // false  单选 
            duplicate: true,
            chunked: true,
            fileSizeLimit: 10 * 1024 * 1024,
            // 只允许选择文件，可选。
            accept: {
                title: 'Images',
                extensions: '3gp,mp4,rmvb,mov,avi,m4v',
                mimeTypes: 'video/*,audio/*,application/'
            }
            //extensions: 'gif,jpg,jpeg,bmp,png',
            //mimeTypes: 'image/*'
        });

        if (uploader) {
            var aa = setTimeout(function() {
                $(bb).find('.webuploader-element-invisible').attr({ accept: "video/*", capture: "camera" });
                clearTimeout(aa);
            });
        }
        //上传error信息
        uploader.on('error', function(handler) {
            if (handler == "Q_EXCEED_SIZE_LIMIT") {
                alert('文件大小不能超过10M')
            }
        });

        // 当有文件添加进来的时候
        uploader.on('fileQueued', function(file) {
            var $li = $(
                    '<div id="' + file.id + '" class="file-item thumbnail">' +
                    '<img>' +
                    '</div>'
                ),
                $img = $li.find('img');

            $list.append($li);

            $listbtn.on('click', function() {
                if ($img) {
                    uploader.removeFile(file);
                }
            })

            if ($img.length > 0) {
                $(aa).show();
                $layer.removeClass('hide');
                $close.removeClass('hide');
            }
            if ($list.find('.file-item').length >= 2) {
                $list.find('.file-item').eq(0).remove();
            }
            $close.on('click', function(e) {
                $(aa).hide();
                event.preventDefault();
                $(this).addClass('hide');
                $layer.addClass('hide');
            });

            // 创建缩略图
            uploader.makeThumb(file, function(error, src) {
                if (error) {
                    $img.replaceWith('<span>不能预览</span>');
                    return;
                }

                $img.attr('src', src);
            }, thumbnailWidth, thumbnailHeight);
        });

        // 文件上传过程中创建进度条实时显示。
        uploader.on('uploadProgress', function(file, percentage) {
            var $li = $('#' + file.id),
                $percent = $li.find('.progress span');

            // 避免重复创建
            if (!$percent.length) {
                $percent = $('<p class="progress"><span>正在上传</span></p>')
                    .appendTo($li)
                    .find('span');
                $spinner.removeClass('hide');
            }
            $percent.css('width', percentage * 100 + '%');
        });

        // 文件上传成功，给item添加成功class, 用样式标记上传成功。
        //uploader.on( 'uploadSuccess', function( file ) {
        uploader.on('uploadSuccess', function(file, response) {｝
            $('#' + file.id).addClass('upload-state-done');
            $spinner.addClass('hide');
            $list.parent().find('.sample-tit').html('<img src="static/img/IDimg.png" style="width:25px;margin-top: 1.5%;" alt="">');
        });

        // 文件上传失败，现实上传出错。
        uploader.on('uploadError', function(file) {
            var $li = $('#' + file.id),
                $error = $li.find('div.error');

            // 避免重复创建
            if (!$error.length) {
                $error = $('<div class="error"></div>').appendTo($li);
                $spinner.addClass('hide');
            }

            $error.text('上传失败');
        });

        // 完成上传完了，成功或者失败，先删除进度条。
        uploader.on('uploadComplete', function(file) {
            $('#' + file.id).find('.progress').remove();
        });
    },
    /*
     *
     入口构造函数
     *
     */
    main: function() {
        for (var i = 0; i < 3; i++) {
            this.imgup('#fileList' + i, '#filePicker' + i);
        }
    }
}
$(function() {
    index.main();
})