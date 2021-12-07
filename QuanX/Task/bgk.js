/*
  9.23 

软件名称：不挂科 (App Store搜索)
连续签到领取会员
获取 CK：打开软件 ⇨ 我的 ⇨ 签到福利  

[task_local]
//不挂科
30 7 * * * https://raw.githubusercontent.com/LAD0516/Scripts/main/QuanX/Task/bgk.js, tag=不挂科, img-url=https://53dh.cn/img/1000, enabled=true

[rewrite_local]
//不挂科
https://appwk.baidu.com/naapi/stsign url script-request-header https://raw.githubusercontent.com/LAD0516/Scripts/main/QuanX/Task/bgk.js

[MITM]
hostname=appwk.baidu.com

*/

const $ = new Env('不挂科');
let status;

status = (status = ($.getval("bgkstatus") || "1")) > 1 ? `${status}` : "";

const bgkurlArr = [], bgkhdArr = [],bgk1urlArr = [], bgk1hdArr = [], bgkcount = ''

let bgkurl = $.getdata('bgkurl')
let bgkhd = $.getdata('bgkhd')
let bgk1url = $.getdata('bgk1url')
let bgk1hd = $.getdata('bgk1hd')

let tz = ($.getval('tz') || '1');//通知
$.message = ''

!(async () => {
    if (typeof $request !== "undefined") {

        bgkck()

    } else {
        bgkurlArr.push($.getdata('bgkurl'))
        bgkhdArr.push($.getdata('bgkhd'))
        bgk1urlArr.push($.getdata('bgk1url'))
        bgk1hdArr.push($.getdata('bgk1hd'))

        let bgkcount = ($.getval('bgkcount') || '1');

        for (let i = 2; i <= bgkcount; i++) {

        bgkurlArr.push($.getdata(`bgkurl${i}`))
        bgkhdArr.push($.getdata(`bgkhd${i}`))
        bgk1urlArr.push($.getdata(`bgk1url${i}`))
        bgk1hdArr.push($.getdata(`bgk1hd${i}`))

        }

if (!bgkhdArr[0]) {
      $.msg($.name, '【提示】请先获取账号一Cookie');
      return; 
    }
        timeZone = new Date().getTimezoneOffset() / 60;
        timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
        bjTime = new Date(timestamp).toLocaleString('zh', {hour12: false, timeZoneName: 'long'});
        $.log(`\n === 脚本执行${bjTime} === \n`);
        $.log(`============ 您共提供${bgkhdArr.length}个账号 ============`);

        for (let i = 0; i < bgkhdArr.length; i++) {

            if (bgkhdArr[i]) {

                bgkurl = bgkurlArr[i];
                bgkhd = bgkhdArr[i];
                bgk1url = bgk1urlArr[i];
                bgk1hd = bgk1hdArr[i];

                $.index = i + 1;
                console.log(`\n\n开始【不挂科${$.index}】`)
                    DD = RT(1000, 2000)
                    SJ = DD/1000
                $.log(`随机延时${SJ}秒开始签到`)
                    await $.wait(DD)
                    await bgk()

                $.log(`随机延时${SJ}秒开始领取会员`)
                    await $.wait(DD)
                    await wkhy()


            }
                    message()

        }
    }
})()

    .catch((e) => $.logErr(e))
    .finally(() => $.done())


//获取ck
function bgkck() {
    if ($request.url.indexOf("stsign/activity") > -1) {
        const bgkurl = $request.url
        if (bgkurl) $.setdata(bgkurl, `bgkurl${status}`)
        $.log(bgkurl)

        const bgkhd = JSON.stringify($request.headers)
        if (bgkhd) $.setdata(bgkhd, `bgkhd${status}`)
        $.log(bgkhd)

        $.msg($.name, "", `不挂科${status}获取签到ck成功✅ 请禁用重写脚本！`)
    } else if ($request.url.indexOf("activity/wkcspopwindow?") > -1) {
        const bgk1url = $request.url
        if (bgk1url) $.setdata(bgk1url, `bgk1url${status}`)
        $.log(bgk1url)

        const bgk1hd = JSON.stringify($request.headers)
        if (bgk1hd) $.setdata(bgk1hd, `bgk1hd${status}`)
        $.log(bgk1hd)

        $.msg($.name, "", `不挂科${status}获取领取文库会员ck成功✅ 请禁用重写脚本！`)
  }

}



//签到
function bgk(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: bgkurl,
            headers: JSON.parse(bgkhd),
        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.data.signResult.status == 2) {

$.log(data.data.signResult.windowInfo.title+data.data.signResult.windowInfo.subTitle)
  $.message +=data.data.signResult.windowInfo.title+data.data.signResult.windowInfo.subTitle+'\n'

                } else {
            $.log('签到失败：已签过')

            $.message +='签到失败：已签过\n'

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//领取一天文库会员
function wkhy(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://appwk.baidu.com/naapi/activity/wkcspopwindow?bid=1&signCuid=a5f4f5ef02244492106fdc1872e11fc4&wk_New_Behavior=0&reso=828_1792&fr=2&sessid=1633195171&ua=bd_1792_828_iPhone11%2C8_2.2.1_14.2&baidu_cuid=38203D741398EDFEA9E6E80EE18265429CF5463B0FBQRHOTKFK&action=send_gift&Bdi_bear=Reachable%20via%20WiFi&sys_ver=14.2&nettype=WIFI&zid=9DMMBE6SL5hjMFdwh2A11ZLImGfSziDVzl17I9L2IxNobcKtRC5RRtF4PaXwsKI6y5ymyi2sJwD03C26Jb1Ksxw&cuid=b910ea1e34f8335136c712c8b92581c4b047b75f&openudid=3a0ec41bdd121927627bde426e24a8637c23831b&uid=bd_0&timestamp=1633195171749&ilts=370d9a58d0238ccdb0502bd65f51f598&idfv=4AC019D1-7355-4FC5-A05D-C7C8B646E66C&model=iPhone11%2C8&from=ios_&app_ver=2.2.1&operator_id=46009&pid=1&giftt=f60ca760bb159e01bd6b2ccdf01bdcf7&wk_cs_app=1&screen=828_1792&app_ua=iPhone11%2C8`,
            headers: {
'Accept-Encoding' : `gzip, deflate, br`,
'Cookie' : `LOGIN_STATUS=2; SG_FW_VER=1.35.0; SP_FW_VER=3.310.40; wk_na_common_params=bid=1&signCuid=a5f4f5ef02244492106fdc1872e11fc4&wk_New_Behavior=0&fr=2&sessid=1633195171&ua=bd_1792_828_iPhone11,8_2.2.1_14.2&baidu_cuid=38203D741398EDFEA9E6E80EE18265429CF5463B0FBQRHOTKFK&Bdi_bear=Unknown&sys_ver=14.2&nettype=WIFI&cuid=b910ea1e34f8335136c712c8b92581c4b047b75f&openudid=3a0ec41bdd121927627bde426e24a8637c23831b&uid=bd_0&timestamp=1633195171749&ilts=370d9a58d0238ccdb0502bd65f51f598&idfv=4AC019D1-7355-4FC5-A05D-C7C8B646E66C&model=iPhone11,8&from=ios_&app_ver=2.2.1&operator_id=46009&pid=1&wk_cs_app=1&screen=828_1792&app_ua=iPhone11,8; BDUSS=EE2aWF0fnVIOS1URGRQYW54N3FzeURKNkFlazVjYXJUZ1lpbWFvZlVVOUlZSEZoRVFBQUFBJCQAAAAAAAAAAAEAAABNj05GNTK9rbPHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEjTSWFI00lhc; BAIDUID=CD7323187C39CABF124E1632DFD35650:FG=1`,
'Connection' : `keep-alive`,
'Accept' : `*/*`,
'Host' : `appwk.baidu.com`,
'User-Agent' : `%E4%B8%8D%E6%8C%82%E7%A7%91/2.2.1.18 CFNetwork/1206 Darwin/20.1.0`,
'Accept-Language' : `zh-cn`
},

        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.data.sendResult== true) {

$.log('会员领取成功：恭喜你获得一天百度文库会员！')
            $.message +='会员领取成功：恭喜你获得一天百度文库会员！\n'

                } else {
            $.log('会员领取失败：已领过 '+data.data.sendResult)

            $.message +='会员领取失败：已领过 '+data.data.sendResult+'\n'

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



//随机延时
function RT(X, Y) {
    do rt = Math.floor(Math.random() * Y);
    while (rt < X)
    return rt;
}
//通知
function message() {
    if(tz == 1){$.msg($.name,"",$.message)}
    }
  

//env模块
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
