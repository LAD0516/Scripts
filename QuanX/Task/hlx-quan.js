/*
10.29
葫芦侠自动签到-圈x
@GnA1J
cron: 34 9,21 * * *
========= Quantumult X =========

#葫芦侠
hostname =  floor.huluxia.com
https://floor.huluxia.com url script-request-body hlx-quan.js
  
 */

const $ = new Env('葫芦侠');
let status;

status = (status = ($.getval("hlxstatus") || "1")) > 1 ? `${status}` : "";

const hlxurlArr = [], hlxhdArr = [], hlxbodyArr = [], hlxcount = ''
const Debug = 0;
let hlxurl = $.getdata('hlxurl')
let hlxhd = $.getdata('hlxhd')
let hlxbody = $.getdata('hlxbody')
let DD = RT(500, 1800)//随机延时
let tz = ($.getval('tz') || '1');//通知
let ID = [43,81,16,44,45,96,70,111,4,29,102,71,105,107,90,115,112,21,117,110,101,56,3,88,76,57,92,98,58,82,77,63,11,22,23,113,103,2,108,1,6,]
let msg = ''
let a = 1
let I = 0

!(async () => {
    if (typeof $request !== "undefined") {

        hlxck()

    } else {
        hlxurlArr.push($.getdata('hlxurl'))
        hlxhdArr.push($.getdata('hlxhd'))
        hlxbodyArr.push($.getdata('hlxbody'))

        let hlxcount = ($.getval('hlxcount') || '1');

        for (let i = 2; i <= hlxcount; i++) {

            hlxurlArr.push($.getdata(`hlxurl${i}`))
            hlxhdArr.push($.getdata(`hlxhd${i}`))
            hlxbodyArr.push($.getdata(`hlxbody${i}`))

        }

if (!hlxhdArr[0]) {
      $.msg($.name, '【提示】请先获取账号数据');
      return; 
    }

        timeZone = new Date().getTimezoneOffset() / 60;
        timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
        bjTime = new Date(timestamp).toLocaleString('zh', {hour12: false, timeZoneName: 'long'});
        $.log(`\n === 脚本执行${bjTime} === \n`);
        $.log(`============ 您共提供${hlxhdArr.length}个账号 ============`);

        for (let i = 0; i < hlxhdArr.length; i++) {

            if (hlxhdArr[i]) {

                hlxurl = hlxurlArr[i];
                hlxhd = hlxhdArr[i];
                hlxbody = hlxbodyArr[i];

       $.index = i + 1;
       console.log(`\n\n开始【账号${$.index}】`)

       key = hlxbody.match(/_key=(.+?)&/)[1]


           for (let c = 0; c < 41; c++) {
           $.index = c + 1
           await $.wait(DD)
           await sign()
                }
           await $.wait(500)
           await grzx()
msg += `\n账号【${this.name}】签到成功：连续签到：${this.days}天，总共获得${this.zjf}经验，当前等级：${this.dj}，当前经验：${this.exp}，还差：${this.jy}经验升级！\n`
           message()
            }
        }
    }
})()

    .catch((e) => $.logErr(e))
    .finally(() => $.done())


//获取ck
function hlxck() {
    if ($request.url.indexOf("user") > -1) {
        const hlxurl = $request.url
        if (hlxurl) $.setdata(hlxurl, `hlxurl${status}`)
        $.log(hlxurl)

        const hlxhd = JSON.stringify($request.headers)
        if (hlxhd) $.setdata(hlxhd, `hlxhd${status}`)
        $.log(hlxhd)

        const hlxbody = $request.body
        if (hlxbody) $.setdata(hlxbody, `hlxbody${status}`)

        $.log(hlxbody)

        $.msg($.name, "", `葫芦侠${status}获取CK成功`)

    }
}


//个人中心
function grzx(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://floor.huluxia.com/user/info/IOS/1.1`,
            headers: {
'Accept' : `*/*`,
'Accept-Encoding' : `gzip, deflate, br`,
'Connection' : `keep-alive`,
'Content-Type' : `application/x-www-form-urlencoded`,
'Host' : `floor.huluxia.com`,
'User-Agent' : `Floor/1.2.2 (iPhone; iOS 15.0.2; Scale/2.00)`,
'Accept-Language' : `zh-Hans-CN;q=1`
},
            body: `_key=${key}&app_version=1.2.2&device_code=FF69BAAF39ED445592B252FE9B38673D&market_id=floor_huluxia&platform=1&user_id=14134177`,
        }
        $.post(url, async (err, resp, data) => {
            try {

                result = JSON.parse(data)

                if (result.status == 1) {

            this.name = result.nick
            this.exp = result.exp
            this.nextExp = result.nextExp
            this.dj =result.level
            this.jy =this.nextExp - this.exp
            this.days = result.continueDays
                } else {

            console.log(`失败：${result.msg}`)
            msg += `失败：${result.msg}`}

                
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
//签到
function sign(timeout = 0) {
        console.log(`\n=============== 开始第${a}板块签到 ===============\n`)
         a += 1
    return new Promise((resolve) => {

        let url = {
            url: `https://floor.huluxia.com/user/signin/IOS/1.1`,
            headers: {
'Accept' : `*/*`,
'Accept-Encoding' : `gzip, deflate, br`,
'Connection' : `keep-alive`,
'Content-Type' : `application/x-www-form-urlencoded`,
'Host' : `floor.huluxia.com`,
'User-Agent' : `Floor/1.2.2 (iPhone; iOS 15.0.2; Scale/2.00)`,
'Accept-Language' : `zh-Hans-CN;q=1`
},
            body: `_key=${key}&app_version=1.2.2&cat_id=${ID[I]}&device_code=FF69BAAF39ED445592B252FE9B38673D&market_id=floor_huluxia&platform=1&user_id=14134177`,
        }

		if (Debug) {
			console.log(`\n【debug】=============== 这是请求 url ===============`);
			console.log(JSON.stringify(url));
		}

        $.post(url, async (err, resp, data) => {
            try {
	    if (Debug) {
		     console.log(`\n【debug】===============这是返回data==============`);
					console.log(data)
				}
                I += 1
                result = JSON.parse(data)

                if (result.status == 1) {

            this.jf =result.experienceVal
            this.zjf = this.jf*41
       console.log(`\n账号【${$.index}】签到成功：获得${result.experienceVal}经验，连续签到：${result.continueDays}天`)
	  //msg += `\n账号【${$.index}】签到成功：获得${result.experienceVal}经验，连续签到：${result.continueDays}天\n`

                } else {
	  console.log(`\n账号【${$.index}】签到失败：${result.msg}!`)
	  msg += `\n账号【${$.index】签到失败：${result.msg}!\n`
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
    if(tz == 1){$.msg($.name,"",msg)}
}

//env模块
function Env(t, e) { class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `\ud83d\udd14${this.name}, \u5f00\u59cb!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), a = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(a, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t) { let e = { "M+": (new Date).getMonth() + 1, "d+": (new Date).getDate(), "H+": (new Date).getHours(), "m+": (new Date).getMinutes(), "s+": (new Date).getSeconds(), "q+": Math.floor(((new Date).getMonth() + 3) / 3), S: (new Date).getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, ((new Date).getFullYear() + "").substr(4 - RegExp.$1.length))); for (let s in e) new RegExp("(" + s + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? e[s] : ("00" + e[s]).substr(("" + e[s]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))); let h = ["", "==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="]; h.push(e), s && h.push(s), i && h.push(i), console.log(h.join("\n")), this.logs = this.logs.concat(h) } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t.stack) : this.log("", `\u2757\ufe0f${this.name}, \u9519\u8bef!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
