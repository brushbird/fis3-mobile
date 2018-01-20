/* ==========================================================
 * v20180120
 * ==========================================================
 * Copyright damer
 *
 * fis3移动端demo
 * ========================================================== */

(function() {
    var oConfig = window.oPageConfig;

    var ui = {
        $btn: $('.btn'),
    };
    var oPage = {
        init: function() {
            this.view();
            this.listen();
        },
        view: function() {
            var self = this;

        },
        listen: function() {
            var self = this;

            // 事件绑定示例
            ui.$btn.on('click', function() {
                // ajax模拟数据示例
                $.ajax({
                    url: oConfig.oUrl.getUserInfo,
                    data: { lcid: '1' },
                    type: 'GET',
                    dataType: 'json'
                }).done(function(msg) {
                    console.info(msg);
                });
            });

        }
    }
    oPage.init();
})($);