/**
 * 不挂科
 * 地址： 
 * 
 * 不挂科自动签到领取    
 * 
 * ========= 青龙 =========
 * 变量格式：export bgk_ck=' xxxx & xxx @  xxxx & xxx '  多个账号用 @分割 
 * 
 */

const jsname = "不挂科";
const $ = Env(jsname);
const notify = $.isNode() ? require('./sendNotify') : '';      // 这里是 node（青龙属于node环境）通知相关的
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 0; //0为关闭调试，1为打开调试,默认为0
//////////////////////
let bgk_ck = process.env.bgk_ck;               // 这里是 从青龙的 配置文件 读取你写的变量
let bgk_ckArr = [];
let data = '';
let msg = '';


!(async () => {

	if (!(await Envs()))  	//多账号分割 判断变量是否为空  初步处理多账号
		return;
	else {


		console.log(`\n\n=========================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(
			new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 +
			8 * 60 * 60 * 1000).toLocaleString()} \n=========================================\n`);

		await wyy();

		console.log(`\n=================== 共找到 ${bgk_ckArr.length} 个账号 ===================`)

		if (debug) {
			console.log(`这是你的全部账号数组:\n ${bgk_ckArr}`);
		}


		for (let index = 0; index < bgk_ckArr.length; index++) {


			let num = index + 1
			console.log(`\n========= 开始【第 ${num} 个账号】=========\n`)

			data = bgk_ckArr[index].split('&');      // 这里是分割你每个账号的每个小项   

			if (debug) {
				console.log(`\n 这是你第 ${num} 账号信息:\n ${data}\n`);
			}


			console.log('开始签到');
			await signin();
			await $.wait(2 * 1000);


			await wkhy();
			await $.wait(2 * 1000);


			await SendMsg(msg);    // 与发送通知有关系
		}
	}

})()
	.catch((e) => console.logErr(e))
	.finally(() => $.done())






//签到
 function signin(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		let url = {
			url: `https://appwk.baidu.com/naapi/stsign/activity?bid=1&signCuid=35bacea43a7b126907ecebb7f3b29cb0&wk_New_Behavior=0&reso=828_1792&fr=2&sessid=1651196686&ua=bd_1792_828_iPhone11%2C8_2.2.91_15.0.2&baidu_cuid=8029DC6E98FEBF3F89A0722B81034B86D7F77A325FSGHCDMILJ&Bdi_bear=Reachable%20via%20WWAN&sys_ver=15.0.2&zid=qLA9mzOr5lsXB0GJa-A14gbHMmxywy9m276wOQywPN95uPNVSukBRzut9VydrRFBI6vh-FJrpNawB2V0Gm51lEA&cuid=48f33c2b6b4fa0a72261865e2ab2f94d9b47b6ad&sign=face4223d281a84a93b4189dac41b5f1&uid=bd_0&timestamp=1651196686974&ilts=66a3fdf1b723c0490142942c09f3f71b&idfv=2C3BFE91-90ED-4CE9-A0D0-52C099AC13C1&from=ios_&app_ver=2.2.91&pid=1&wk_cs_app=1&screen=828_1792&app_ua=iPhone11%2C8`, 
			headers: {"Accept-Encoding":"gzip, deflate, br","Cookie":"Cookie: SG_FW_VER=1.35.0; SP_FW_VER=3.310.42; wk_na_common_params=uid=bd_0&app_ua=iPhone11,8&sessid=1651196686&bid=1&screen=828_1792&from=ios_&signCuid=35bacea43a7b126907ecebb7f3b29cb0&fr=2&timestamp=1651196686974&cuid=48f33c2b6b4fa0a72261865e2ab2f94d9b47b6ad&ilts=66a3fdf1b723c0490142942c09f3f71b&wk_cs_app=1&Bdi_bear=Unknown&baidu_cuid=8029DC6E98FEBF3F89A0722B81034B86D7F77A325FSGHCDMILJ&ua=bd_1792_828_iPhone11,8_2.2.91_15.0.2&app_ver=2.2.91&pid=1&wk_New_Behavior=0&sys_ver=15.0.2; LOGIN_STATUS=2; BDUSS=UpjUEI2YmZ0SkVNM004OG1ZdHpFQTl5bVdHVGlYUTY0ZTh0Mjc5LTlPQlRRWTlpRUFBQUFBJCQAAAAAAAAAAAEAAABNj05GNTK9rbPHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFO0Z2JTtGdiS; BAIDUID=BC8E2501D9F192505E6EBBAC10B5781D:FG=1","Connection":"keep-alive","Accept":"*/*","Host":"appwk.baidu.com","User-Agent":"%E4%B8%8D%E6%8C%82%E7%A7%91/2.2.2.88 CFNetwork/1312 Darwin/21.0.0","Accept-Language":"zh-CN,zh-Hans;q=0.9",},
	      


		}

		if (debug) {
			console.log(`\n=============== 这是签到请求url ===============`);
			console.log(JSON.stringify(url));
		}

		$.get(url, async (error, response, data) => {     // 这是一个 get 请求 , 如果是 post  记得把这里改了 
			try {
				if (debug) {
					console.log(`\n\n===============这是签到返回data==============`);
					console.log(data)
				}

				let result = JSON.parse(data);
				if (result.data.signResult.status == 2) {     

					$.log(data.data.signResult.windowInfo.title+data.data.signResult.windowInfo.subTitle)
  msg +=data.data.signResult.windowInfo.title+data.data.signResult.windowInfo.subTitle+'\n'

				} else if (result.data.signResult.status === 0) {   

					            $.log('签到失败：已签过')

            msg +='签到失败：已签过\n'


				} else {  

					console.log(`\n【签到】 失败 ❌ 了呢,可能是网络被外星人抓走了!\n `)
					

				}

			} catch (e) {
				console.log(e)
			} finally {
				resolve();
			}
		}, timeout)
	})
}




//领取一天文库会员
function wkhy(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://appwk.baidu.com/naapi/activity/wkcspopwindow?bid=1&signCuid=a5f4f5ef02244492106fdc1872e11fc4&wk_New_Behavior=0&reso=828_1792&fr=2&sessid=1633195171&ua=bd_1792_828_iPhone11%2C8_2.2.1_14.2&baidu_cuid=38203D741398EDFEA9E6E80EE18265429CF5463B0FBQRHOTKFK&action=send_gift&Bdi_bear=Reachable%20via%20WiFi&sys_ver=14.2&nettype=WIFI&zid=9DMMBE6SL5hjMFdwh2A11ZLImGfSziDVzl17I9L2IxNobcKtRC5RRtF4PaXwsKI6y5ymyi2sJwD03C26Jb1Ksxw&cuid=b910ea1e34f8335136c712c8b92581c4b047b75f&openudid=3a0ec41bdd121927627bde426e24a8637c23831b&uid=bd_0&timestamp=1633195171749&ilts=370d9a58d0238ccdb0502bd65f51f598&idfv=4AC019D1-7355-4FC5-A05D-C7C8B646E66C&model=iPhone11%2C8&from=ios_&app_ver=2.2.1&operator_id=46009&pid=1&giftt=f60ca760bb159e01bd6b2ccdf01bdcf7&wk_cs_app=1&screen=828_1792&app_ua=iPhone11%2C8`,
            headers: {"Accept-Encoding":"gzip, deflate, br","Cookie":"Cookie: SG_FW_VER=1.35.0; SP_FW_VER=3.310.42; wk_na_common_params=uid=bd_0&app_ua=iPhone11,8&sessid=1651196686&bid=1&screen=828_1792&from=ios_&signCuid=35bacea43a7b126907ecebb7f3b29cb0&fr=2&timestamp=1651196686974&cuid=48f33c2b6b4fa0a72261865e2ab2f94d9b47b6ad&ilts=66a3fdf1b723c0490142942c09f3f71b&wk_cs_app=1&Bdi_bear=Unknown&baidu_cuid=8029DC6E98FEBF3F89A0722B81034B86D7F77A325FSGHCDMILJ&ua=bd_1792_828_iPhone11,8_2.2.91_15.0.2&app_ver=2.2.91&pid=1&wk_New_Behavior=0&sys_ver=15.0.2; LOGIN_STATUS=2; BDUSS=UpjUEI2YmZ0SkVNM004OG1ZdHpFQTl5bVdHVGlYUTY0ZTh0Mjc5LTlPQlRRWTlpRUFBQUFBJCQAAAAAAAAAAAEAAABNj05GNTK9rbPHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFO0Z2JTtGdiS; BAIDUID=BC8E2501D9F192505E6EBBAC10B5781D:FG=1","Connection":"keep-alive","Accept":"*/*","Host":"appwk.baidu.com","User-Agent":"%E4%B8%8D%E6%8C%82%E7%A7%91/2.2.2.88 CFNetwork/1312 Darwin/21.0.0","Accept-Language":"zh-CN,zh-Hans;q=0.9",},

        }

        $.get(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.data.sendResult== true) {

$.log('会员领取成功：恭喜你获得一天百度文库会员！')
            msg +='会员领取成功：恭喜你获得一天百度文库会员！\n'

                } else {
            $.log('会员领取失败：已领过 '+data.data.sendResult)

            msg +='会员领取失败：已领过 '+data.data.sendResult+'\n'

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}











//#region 固定代码 可以不管他
// ============================================变量检查============================================ \\
async function Envs() {
	if (bgk_ck) {
		if (bgk_ck.indexOf("@") != -1) {
			bgk_ck.split("@").forEach((item) => {
				bgk_ckArr.push(item);
			});
		} else {
			bgk_ckArr.push(bgk_ck);
		}
	} else {
		console.log(`\n 【${$.name}】：未填写变量 bgk_ck`)
		return;
	}

	return true;
}

// ============================================发送消息============================================ \\
async function SendMsg(message) {
	if (!message)
		return;

	if (Notify > 0) {
		if ($.isNode()) {
			var notify = require('./sendNotify');
			await notify.sendNotify($.name, message);
		} else {
			$.msg(message);
		}
	} else {
		console.log(message);
	}
}

/**
 * 随机数生成
 */
function randomString(e) {
	e = e || 32;
	var t = "QWERTYUIOPASDFGHJKLZXCVBNM1234567890",
		a = t.length,
		n = "";
	for (i = 0; i < e; i++)
		n += t.charAt(Math.floor(Math.random() * a));
	return n
}

/**
 * 随机整数生成
 */
function randomInt(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}

//每日网抑云
function wyy(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		let url = {
			url: `https://keai.icu/apiwyy/api`
		}
		$.get(url, async (err, resp, data) => {
			try {
				data = JSON.parse(data)
				console.log(`\n 【网抑云时间】: ${data.content}  by--${data.music}`);

			} catch (e) {
				console.logErr(e, resp);
			} finally {
				resolve()
			}
		}, timeout)
	})
}

//#endregion


// prettier-ignore   固定代码  不用管他
function Env(t, e) { "undefined" != typeof process && JSON.stringify(process.env).indexOf("GITHUB") > -1 && process.exit(0); class s { constructor(t) { this.env = t } send(t, e = "GET") { t = "string" == typeof t ? { url: t } : t; let s = this.get; return "POST" === e && (s = this.post), new Promise((e, i) => { s.call(this, t, (t, s, r) => { t ? i(t) : e(s) }) }) } get(t) { return this.send.call(this.env, t) } post(t) { return this.send.call(this.env, t, "POST") } } return new class { constructor(t, e) { this.name = t, this.http = new s(this), this.data = null, this.dataFile = "box.dat", this.logs = [], this.isMute = !1, this.isNeedRewrite = !1, this.logSeparator = "\n", this.startTime = (new Date).getTime(), Object.assign(this, e), this.log("", `🔔${this.name}, 开始!`) } isNode() { return "undefined" != typeof module && !!module.exports } isQuanX() { return "undefined" != typeof $task } isSurge() { return "undefined" != typeof $httpClient && "undefined" == typeof $loon } isLoon() { return "undefined" != typeof $loon } toObj(t, e = null) { try { return JSON.parse(t) } catch { return e } } toStr(t, e = null) { try { return JSON.stringify(t) } catch { return e } } getjson(t, e) { let s = e; const i = this.getdata(t); if (i) try { s = JSON.parse(this.getdata(t)) } catch { } return s } setjson(t, e) { try { return this.setdata(JSON.stringify(t), e) } catch { return !1 } } getScript(t) { return new Promise(e => { this.get({ url: t }, (t, s, i) => e(i)) }) } runScript(t, e) { return new Promise(s => { let i = this.getdata("@chavy_boxjs_userCfgs.httpapi"); i = i ? i.replace(/\n/g, "").trim() : i; let r = this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout"); r = r ? 1 * r : 20, r = e && e.timeout ? e.timeout : r; const [o, h] = i.split("@"), n = { url: `http://${h}/v1/scripting/evaluate`, body: { script_text: t, mock_type: "cron", timeout: r }, headers: { "X-Key": o, Accept: "*/*" } }; this.post(n, (t, e, i) => s(i)) }).catch(t => this.logErr(t)) } loaddata() { if (!this.isNode()) return {}; { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e); if (!s && !i) return {}; { const i = s ? t : e; try { return JSON.parse(this.fs.readFileSync(i)) } catch (t) { return {} } } } } writedata() { if (this.isNode()) { this.fs = this.fs ? this.fs : require("fs"), this.path = this.path ? this.path : require("path"); const t = this.path.resolve(this.dataFile), e = this.path.resolve(process.cwd(), this.dataFile), s = this.fs.existsSync(t), i = !s && this.fs.existsSync(e), r = JSON.stringify(this.data); s ? this.fs.writeFileSync(t, r) : i ? this.fs.writeFileSync(e, r) : this.fs.writeFileSync(t, r) } } lodash_get(t, e, s) { const i = e.replace(/\[(\d+)\]/g, ".$1").split("."); let r = t; for (const t of i) if (r = Object(r)[t], void 0 === r) return s; return r } lodash_set(t, e, s) { return Object(t) !== t ? t : (Array.isArray(e) || (e = e.toString().match(/[^.[\]]+/g) || []), e.slice(0, -1).reduce((t, s, i) => Object(t[s]) === t[s] ? t[s] : t[s] = Math.abs(e[i + 1]) >> 0 == +e[i + 1] ? [] : {}, t)[e[e.length - 1]] = s, t) } getdata(t) { let e = this.getval(t); if (/^@/.test(t)) { const [, s, i] = /^@(.*?)\.(.*?)$/.exec(t), r = s ? this.getval(s) : ""; if (r) try { const t = JSON.parse(r); e = t ? this.lodash_get(t, i, "") : e } catch (t) { e = "" } } return e } setdata(t, e) { let s = !1; if (/^@/.test(e)) { const [, i, r] = /^@(.*?)\.(.*?)$/.exec(e), o = this.getval(i), h = i ? "null" === o ? null : o || "{}" : "{}"; try { const e = JSON.parse(h); this.lodash_set(e, r, t), s = this.setval(JSON.stringify(e), i) } catch (e) { const o = {}; this.lodash_set(o, r, t), s = this.setval(JSON.stringify(o), i) } } else s = this.setval(t, e); return s } getval(t) { return this.isSurge() || this.isLoon() ? $persistentStore.read(t) : this.isQuanX() ? $prefs.valueForKey(t) : this.isNode() ? (this.data = this.loaddata(), this.data[t]) : this.data && this.data[t] || null } setval(t, e) { return this.isSurge() || this.isLoon() ? $persistentStore.write(t, e) : this.isQuanX() ? $prefs.setValueForKey(t, e) : this.isNode() ? (this.data = this.loaddata(), this.data[e] = t, this.writedata(), !0) : this.data && this.data[e] || null } initGotEnv(t) { this.got = this.got ? this.got : require("got"), this.cktough = this.cktough ? this.cktough : require("tough-cookie"), this.ckjar = this.ckjar ? this.ckjar : new this.cktough.CookieJar, t && (t.headers = t.headers ? t.headers : {}, void 0 === t.headers.Cookie && void 0 === t.cookieJar && (t.cookieJar = this.ckjar)) } get(t, e = (() => { })) { t.headers && (delete t.headers["Content-Type"], delete t.headers["Content-Length"]), this.isSurge() || this.isLoon() ? (this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.get(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) })) : this.isQuanX() ? (this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t))) : this.isNode() && (this.initGotEnv(t), this.got(t).on("redirect", (t, e) => { try { if (t.headers["set-cookie"]) { const s = t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString(); s && this.ckjar.setCookieSync(s, null), e.cookieJar = this.ckjar } } catch (t) { this.logErr(t) } }).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) })) } post(t, e = (() => { })) { if (t.body && t.headers && !t.headers["Content-Type"] && (t.headers["Content-Type"] = "application/x-www-form-urlencoded"), t.headers && delete t.headers["Content-Length"], this.isSurge() || this.isLoon()) this.isSurge() && this.isNeedRewrite && (t.headers = t.headers || {}, Object.assign(t.headers, { "X-Surge-Skip-Scripting": !1 })), $httpClient.post(t, (t, s, i) => { !t && s && (s.body = i, s.statusCode = s.status), e(t, s, i) }); else if (this.isQuanX()) t.method = "POST", this.isNeedRewrite && (t.opts = t.opts || {}, Object.assign(t.opts, { hints: !1 })), $task.fetch(t).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => e(t)); else if (this.isNode()) { this.initGotEnv(t); const { url: s, ...i } = t; this.got.post(s, i).then(t => { const { statusCode: s, statusCode: i, headers: r, body: o } = t; e(null, { status: s, statusCode: i, headers: r, body: o }, o) }, t => { const { message: s, response: i } = t; e(s, i, i && i.body) }) } } time(t, e = null) { const s = e ? new Date(e) : new Date; let i = { "M+": s.getMonth() + 1, "d+": s.getDate(), "H+": s.getHours(), "m+": s.getMinutes(), "s+": s.getSeconds(), "q+": Math.floor((s.getMonth() + 3) / 3), S: s.getMilliseconds() }; /(y+)/.test(t) && (t = t.replace(RegExp.$1, (s.getFullYear() + "").substr(4 - RegExp.$1.length))); for (let e in i) new RegExp("(" + e + ")").test(t) && (t = t.replace(RegExp.$1, 1 == RegExp.$1.length ? i[e] : ("00" + i[e]).substr(("" + i[e]).length))); return t } msg(e = t, s = "", i = "", r) { const o = t => { if (!t) return t; if ("string" == typeof t) return this.isLoon() ? t : this.isQuanX() ? { "open-url": t } : this.isSurge() ? { url: t } : void 0; if ("object" == typeof t) { if (this.isLoon()) { let e = t.openUrl || t.url || t["open-url"], s = t.mediaUrl || t["media-url"]; return { openUrl: e, mediaUrl: s } } if (this.isQuanX()) { let e = t["open-url"] || t.url || t.openUrl, s = t["media-url"] || t.mediaUrl; return { "open-url": e, "media-url": s } } if (this.isSurge()) { let e = t.url || t.openUrl || t["open-url"]; return { url: e } } } }; if (this.isMute || (this.isSurge() || this.isLoon() ? $notification.post(e, s, i, o(r)) : this.isQuanX() && $notify(e, s, i, o(r))), !this.isMuteLog) { let t = ["", "==============📣系统通知📣=============="]; t.push(e), s && t.push(s), i && t.push(i), console.log(t.join("\n")), this.logs = this.logs.concat(t) } } log(...t) { t.length > 0 && (this.logs = [...this.logs, ...t]), console.log(t.join(this.logSeparator)) } logErr(t, e) { const s = !this.isSurge() && !this.isQuanX() && !this.isLoon(); s ? this.log("", `❗️${this.name}, 错误!`, t.stack) : this.log("", `❗️${this.name}, 错误!`, t) } wait(t) { return new Promise(e => setTimeout(e, t)) } done(t = {}) { const e = (new Date).getTime(), s = (e - this.startTime) / 1e3; this.log("", `🔔${this.name}, 结束! 🕛 ${s} 秒`), this.log(), (this.isSurge() || this.isQuanX() || this.isLoon()) && $done(t) } }(t, e) }
