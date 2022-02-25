current_host = window.location.hostname;
(function (global) {

    var md5cycle = function (x, k) {
        var a = x[0],
            b = x[1],
            c = x[2],
            d = x[3];

        a = ff(a, b, c, d, k[0], 7, -680876936);
        d = ff(d, a, b, c, k[1], 12, -389564586);
        c = ff(c, d, a, b, k[2], 17, 606105819);
        b = ff(b, c, d, a, k[3], 22, -1044525330);
        a = ff(a, b, c, d, k[4], 7, -176418897);
        d = ff(d, a, b, c, k[5], 12, 1200080426);
        c = ff(c, d, a, b, k[6], 17, -1473231341);
        b = ff(b, c, d, a, k[7], 22, -45705983);
        a = ff(a, b, c, d, k[8], 7, 1770035416);
        d = ff(d, a, b, c, k[9], 12, -1958414417);
        c = ff(c, d, a, b, k[10], 17, -42063);
        b = ff(b, c, d, a, k[11], 22, -1990404162);
        a = ff(a, b, c, d, k[12], 7, 1804603682);
        d = ff(d, a, b, c, k[13], 12, -40341101);
        c = ff(c, d, a, b, k[14], 17, -1502002290);
        b = ff(b, c, d, a, k[15], 22, 1236535329);

        a = gg(a, b, c, d, k[1], 5, -165796510);
        d = gg(d, a, b, c, k[6], 9, -1069501632);
        c = gg(c, d, a, b, k[11], 14, 643717713);
        b = gg(b, c, d, a, k[0], 20, -373897302);
        a = gg(a, b, c, d, k[5], 5, -701558691);
        d = gg(d, a, b, c, k[10], 9, 38016083);
        c = gg(c, d, a, b, k[15], 14, -660478335);
        b = gg(b, c, d, a, k[4], 20, -405537848);
        a = gg(a, b, c, d, k[9], 5, 568446438);
        d = gg(d, a, b, c, k[14], 9, -1019803690);
        c = gg(c, d, a, b, k[3], 14, -187363961);
        b = gg(b, c, d, a, k[8], 20, 1163531501);
        a = gg(a, b, c, d, k[13], 5, -1444681467);
        d = gg(d, a, b, c, k[2], 9, -51403784);
        c = gg(c, d, a, b, k[7], 14, 1735328473);
        b = gg(b, c, d, a, k[12], 20, -1926607734);

        a = hh(a, b, c, d, k[5], 4, -378558);
        d = hh(d, a, b, c, k[8], 11, -2022574463);
        c = hh(c, d, a, b, k[11], 16, 1839030562);
        b = hh(b, c, d, a, k[14], 23, -35309556);
        a = hh(a, b, c, d, k[1], 4, -1530992060);
        d = hh(d, a, b, c, k[4], 11, 1272893353);
        c = hh(c, d, a, b, k[7], 16, -155497632);
        b = hh(b, c, d, a, k[10], 23, -1094730640);
        a = hh(a, b, c, d, k[13], 4, 681279174);
        d = hh(d, a, b, c, k[0], 11, -358537222);
        c = hh(c, d, a, b, k[3], 16, -722521979);
        b = hh(b, c, d, a, k[6], 23, 76029189);
        a = hh(a, b, c, d, k[9], 4, -640364487);
        d = hh(d, a, b, c, k[12], 11, -421815835);
        c = hh(c, d, a, b, k[15], 16, 530742520);
        b = hh(b, c, d, a, k[2], 23, -995338651);

        a = ii(a, b, c, d, k[0], 6, -198630844);
        d = ii(d, a, b, c, k[7], 10, 1126891415);
        c = ii(c, d, a, b, k[14], 15, -1416354905);
        b = ii(b, c, d, a, k[5], 21, -57434055);
        a = ii(a, b, c, d, k[12], 6, 1700485571);
        d = ii(d, a, b, c, k[3], 10, -1894986606);
        c = ii(c, d, a, b, k[10], 15, -1051523);
        b = ii(b, c, d, a, k[1], 21, -2054922799);
        a = ii(a, b, c, d, k[8], 6, 1873313359);
        d = ii(d, a, b, c, k[15], 10, -30611744);
        c = ii(c, d, a, b, k[6], 15, -1560198380);
        b = ii(b, c, d, a, k[13], 21, 1309151649);
        a = ii(a, b, c, d, k[4], 6, -145523070);
        d = ii(d, a, b, c, k[11], 10, -1120210379);
        c = ii(c, d, a, b, k[2], 15, 718787259);
        b = ii(b, c, d, a, k[9], 21, -343485551);

        x[0] = add32(a, x[0]);
        x[1] = add32(b, x[1]);
        x[2] = add32(c, x[2]);
        x[3] = add32(d, x[3]);

    }

    var cmn = function (q, a, b, x, s, t) {
        a = add32(add32(a, q), add32(x, t));
        return add32((a << s) | (a >>> (32 - s)), b);
    }

    var ff = function (a, b, c, d, x, s, t) {
        return cmn((b & c) | ((~b) & d), a, b, x, s, t);
    }

    var gg = function (a, b, c, d, x, s, t) {
        return cmn((b & d) | (c & (~d)), a, b, x, s, t);
    }

    var hh = function (a, b, c, d, x, s, t) {
        return cmn(b ^ c ^ d, a, b, x, s, t);
    }

    var ii = function (a, b, c, d, x, s, t) {
        return cmn(c ^ (b | (~d)), a, b, x, s, t);
    }

    var md51 = function (s) {
        var txt = '',
            n = s.length,
            state = [1732584193, -271733879, -1732584194, 271733878],
            i;
        for (i = 64; i <= s.length; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
        }
        s = s.substring(i - 64);
        var tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        for (i = 0; i < s.length; i++)
            tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
        tail[i >> 2] |= 0x80 << ((i % 4) << 3);
        if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i++) tail[i] = 0;
        }
        tail[14] = n * 8;
        md5cycle(state, tail);
        return state;
    }

    /* there needs to be support for Unicode here,
     * unless we pretend that we can redefine the MD-5
     * algorithm for multi-byte characters (perhaps
     * by adding every four 16-bit characters and
     * shortening the sum to 32 bits). Otherwise
     * I suggest performing MD-5 as if every character
     * was two bytes--e.g., 0040 0025 = @%--but then
     * how will an ordinary MD-5 sum be matched?
     * There is no way to standardize text to something
     * like UTF-8 before transformation; speed cost is
     * utterly prohibitive. The JavaScript standard
     * itself needs to look at this: it should start
     * providing access to strings as preformed UTF-8
     * 8-bit unsigned value arrays.
     */
    var md5blk = function (s) { /* I figured global was faster.   */
        var md5blks = [],
            i; /* Andy King said do it this way. */
        for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
        }
        return md5blks;
    }

    var hex_chr = '0123456789abcdef'.split('');

    var rhex = function (n) {
        var s = '',
            j = 0;
        for (; j < 4; j++)
            s += hex_chr[(n >> (j * 8 + 4)) & 0x0F] + hex_chr[(n >> (j * 8)) & 0x0F];
        return s;
    }

    var hex = function (x) {
        for (var i = 0; i < x.length; i++)
            x[i] = rhex(x[i]);
        return x.join('');
    }

    var md5 = global.md5 = function (s) {
        return hex(md51(s));
    }

    /* this function is much faster,
    so if possible we use it. Some IEs
    are the only ones I know of that
    need the idiotic second function,
    generated by an if clause.  */

    var add32 = function (a, b) {
        return (a + b) & 0xFFFFFFFF;
    }

    if (md5('hello') != '5d41402abc4b2a76b9719d911017c592') {
        add32 = function (x, y) {
            var lsw = (x & 0xFFFF) + (y & 0xFFFF),
                msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return (msw << 16) | (lsw & 0xFFFF);
        }
    }

})(window);

removeAppButtons = btns => {
    btns.forEach(c => {
        for (let e of document.getElementsByClassName(c)) {
            e.remove();
        }
    });
};

removeAppButtonsByRegex = btns => {
    btns.forEach(c => {
        for (let e of document.querySelectorAll(c)) {
            e.remove();
        }
    });
};

if (window.md5(current_host) == '6d256804756115551da4d04e903b6bb0') {
    let app_btns = [
        'mod_promotion',
        'mod_source',
        'mod_box mod_game_rec',
        'mod_more_btn',
        'video_function video_function_new',
        'tvp_app_btn',
        'figure_app',
        'insboard_openbtn',
        'tvp_app_bar'
    ];
    let app_btns_regex = [
        'a[open-app]',
        'div[class^="launch-app-btn"]'
    ];
    setInterval(() => {
        removeAppButtons(app_btns);
        removeAppButtonsByRegex(app_btns_regex);
        for (let e of document.querySelectorAll('li[data-cid]>a')) {
            e.href = 'https://' + current_host + (e.parentElement.getAttribute('data-url') ?
                e.parentElement.getAttribute('data-url') :
                '/x/m/play?cid=' + e.parentElement.getAttribute('data-cid'));
        }
        for (let e of document.querySelectorAll('div[class="insboard_play"]')) {
            if (!e.hasAttribute('processed')) {
                let a = document.createElement("a");
                a.href = 'https://' + current_host + '/x/m/play?vid=' + e.getAttribute('data-vid');
                e.replaceWith(a);
                a.appendChild(e);
                e.removeAttribute('href');
                e.setAttribute('processed', 'true');
            }
        }
    }, 300);
}
else if (window.md5(current_host) == '1f8da3bdc66a61eafff1a400926115b9') {
    let app_btns = [
        // 'pop-skip',
        // 'pop-wrap',
        'pop-block',
        'afs-ads',
        // 'home-ad',
        'center-ad',
        'home-featured-ad',
        'bottom-ad',
        'video-boxad',
        'single-vad',
        'exo-native-widget'
    ];
    let app_btns_regex = [
        'div[id="single_ad_nativeads"]',
        'div[id="mobile_ts_ad_native"]',
        'div[id^="ts_ad_native"]',
        'div[id^="exo_slider"]',
        'div[id="cat_mad"]',
        'div[id="divExoLayerWrapper"]',
        'div[id="sg_mobile_ts_native"]',
        'html > div',
        'html > iframe'
    ];
    setInterval(() => {
        removeAppButtons(app_btns);
        removeAppButtonsByRegex(app_btns_regex);
        for (let e of document.querySelectorAll('video[id="vplayer"]')) {
            e.parentNode.remove();
        }
        for (let e of document.querySelectorAll('iframe')) {
            if (!e.getAttribute('id')) {
                e.remove();
            }
        }
        for (let e of document.querySelectorAll('div[id="vstr"]')) {
            e.parentNode.nextSibling.remove();
        }
        for (let e of document.getElementsByClassName('home-ad')) {
            e.innerHTML = '';
        }
    }, 300);

}
else if (window.md5(current_host) == '41caf742f1f34be6980e895e19b4c83c') {
    let s = document.createElement("style");
    s.innerHTML = ".wings-disabled { padding-left: 12px; padding-right: 12px; pointer-events:none; } .fe-ui-open-app-btn-disabled { display: inline-block; position: relative; pointer-events:none; } .open-app-btn-disabled { display: inline-block; position: relative; pointer-events:none; }";
    document.getElementsByTagName("head")[0].appendChild(s);
    let app_btns = [
        'open-app',
        'bili-app',
        'open-app-bar',
        'm-video-season-new',
        'm-video-season-panel',
        'player-mobile-ending-panel-recommend',
        'm-home-no-more',
        'open-app-btn m-nav-openapp',
        'open-app-btn m-video-main-openapp visible-open-app-btn',
        'open-app-btn m-video-main-openapp hiden-open-app-btn',
        'open-app-btn related-openapp',
        'open-app-btn hotshare-openapp',
        'open-app-btn m-float-openapp',
        'open-app-btn m-space-float-openapp',
        'open-app-btn home-float-openapp',
        'player-mobile-widescreen-callapp',
        'launch-app-btn m-nav-openapp',
        'launch-app-btn m-float-openapp',
        'launch-app-btn home-float-openapp',
        'launch-app-btn related-openapp',
        'm-video2-main-img',
        'openapp report-scroll-module',
        'open-app-btn m-comment-openapp',
        'mplayer-widescreen-callapp'
    ];
    let disabled_btns = [
        'comment-item-openapp',
        'm-subpreview-openapp',
        'open-app-btn'
    ];

    setInterval(() => {
        removeAppButtons(app_btns);
        for (let e of document.getElementsByClassName('launch-app-btn v-card-toapp')) {
            if (e.getAttribute('data-aid')) {
                e.firstElementChild.href = "https://" + current_host + "/video/av" + e.getAttribute('data-aid');
            }
        }
        for (let e of document.getElementsByClassName('wings')) {
            if (e.getAttribute('type') == "8" && e.getAttribute("id")) {
                let a = document.createElement("a");
                a.href = "https://" + current_host + "/video/av" + e.getAttribute("id");
                e.replaceWith(a);
                a.appendChild(e);
                e.className = e.className.replace('wings', 'wings-disabled');
            }
        }
        for (let e of document.getElementsByClassName('fe-ui-open-app-btn')) {
            e.className = e.className.replace('fe-ui-open-app-btn', 'fe-ui-open-app-btn-disabled');
            let wx = e.getElementsByTagName('wx-open-launch-app');
            if (wx && wx[0] && wx[0].getAttribute('extinfo')) {
                let u = wx[0].getAttribute('extinfo');
                let start = u.lastIndexOf('/') + 1;
                let end = u.lastIndexOf('?');
                let ss = u.substr(start, end - start);
                let a = document.createElement("a");
                a.href = "https://" + current_host + "/bangumi/play/ss" + ss;
                e.replaceWith(a);
                a.appendChild(e);
                wx[0].remove();
            }
        }
        disabled_btns.forEach(i => {
            for (let e of document.getElementsByClassName(i)) {
                e.className = e.className.replace(i, i + '-disabled');
            }
        });
        for (let e of document.querySelectorAll('a[href]')) {
            e.style = 'pointer-events:auto;';
        }
        document.getElementById('comment') && (document.getElementById('comment').style = 'pointer-events:none;');
    }, 300);
}
