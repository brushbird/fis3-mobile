/* ==========================================================
 * v20180120
 * ==========================================================
 * Copyright damer
 *
 * rem屏幕自适应设定模块
 * ========================================================== */
;
(function() {
    var nPxUnit = 100; // 在px2rem中预设rem的值 即 1rem = ? px
    var nDesignWid = 750; // 设计稿宽度
    var nDesignHei = 1206; // 设计稿高度
    var bNoScroll = false;
    var forceScale = 0;

    var dpr = 0;
    var scale = 0;
    var sSetting = '';
    var $viewport = document.getElementsByName('viewport')[0];
    var $html = document.documentElement;
    var $head = document.getElementsByTagName('head');
    var $setting = document.getElementsByName('fitsetting')[0];

    var bAndroid = window.navigator.appVersion.match(/android/gi);
    var bIPhone = window.navigator.appVersion.match(/iphone/gi);
    var devicePixelRatio = window.devicePixelRatio;
    if (bIPhone) {
        // iOS下，对于2和3的屏，用2倍的方案，其余的用1倍方案
        if (devicePixelRatio >= 3 && (!dpr || dpr >= 3)) {
            dpr = 3;
        } else if (devicePixelRatio >= 2 && (!dpr || dpr >= 2)) {
            dpr = 2;
        } else {
            dpr = 1;
        }
    } else {
        // 其他设备下，仍旧使用1倍的方案
        dpr = 1;
    }

    if ($setting) {
        var content = $setting.getAttribute('content');
        var wid = content.match(/width=([\d\.]+)/);
        var hei = content.match(/height=([\d\.]+)/);
        var mode = content.match(/mode=([\d\.]+)/);
        var scaleset = content.match(/scale=([\d\.]+)/);
        nDesignWid = wid ? +wid[1] : nDesignWid;
        nDesignHei = hei ? +hei[1] : nDesignHei;
        bNoScroll = mode ? +mode[1] : bNoScroll;
        forceScale = scaleset && scaleset != 0 ? +scaleset[1] : forceScale;
    }

    scale = forceScale == 0 ? (1 / dpr) : forceScale;
    dpr = forceScale == 0 ? dpr : (1 / scale);
    sSetting = 'initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no, shrink-to-fit="no"';

    $html.setAttribute('data-dpr', dpr); // 参考amfe的lib-flexible 预留数据

    if ($viewport) {
        $viewport.setAttribute('content', sSetting);
    } else if ($head) {
        $viewport = doc.createElement('meta');
        $viewport.setAttribute('name', 'viewport');
        $viewport.setAttribute('content', sSetting);
        $head.appendChild(metaEl);
    } else {
        console.error('页面缺少<head>标签，自适应失败');
        return;
    }


    var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';

    var fAdapt = function() {

        var oRect = $html.getBoundingClientRect();
        var winWid = oRect.width;
        var winHei = oRect.height;

        var ratio = (winHei / winWid) < (nDesignHei / nDesignWid) ? (winHei / nDesignHei) : (winWid / nDesignWid);
        ratio = bNoScroll ? ratio : (winWid / nDesignWid);
        $html.style.fontSize = (ratio * nPxUnit) + 'px';
    }

    window.addEventListener(resizeEvt, fAdapt, false);
    document.addEventListener('DOMContentLoaded', fAdapt, false);
})();