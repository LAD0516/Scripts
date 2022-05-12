/**
 * 智行火车
 * 地址： 
 * 
 * 智行火车自动签到领取    
 * 
 * ========= 青龙 =========
 * 变量格式：export zxhc_ck=' xxxx & xxx @  xxxx & xxx '  多个账号用 @分割 
 * 
 */

const jsname = "智行火车";
const $ = Env(jsname);
const notify = $.isNode() ? require('./sendNotify') : '';      // 这里是 node（青龙属于node环境）通知相关的
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 1; //0为关闭调试，1为打开调试,默认为0
//////////////////////
let zxhc_ck = process.env.zxhc_ck;               // 这里是 从青龙的 配置文件 读取你写的变量
let zxhc_ckArr = [];
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

		console.log(`\n=================== 共找到 ${zxhc_ckArr.length} 个账号 ===================`)

		if (debug) {
			console.log(`这是你的全部账号数组:\n ${zxhc_ckArr}`);
		}


		for (let index = 0; index < zxhc_ckArr.length; index++) {


			let num = index + 1
			console.log(`\n========= 开始【第 ${num} 个账号】=========\n`)

			data = zxhc_ckArr[index].split('&');      // 这里是分割你每个账号的每个小项   

			if (debug) {
				console.log(`\n 这是你第 ${num} 账号信息:\n ${data}\n`);
			}


			console.log('开始签到');
			await sign();
			await $.wait(2 * 1000);




			await SendMsg(msg);    // 与发送通知有关系
		}
	}

})()
	.catch((e) => console.logErr(e))
	.finally(() => $.done())





//签到
 function sign(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		let url = {
			url: `https://m.ctrip.com/restapi/soa2/14593/json/attendanceDay?__gw_os=IOS&__gw_platform=APP&__gw_appid=1003&__gw_ver=707.977`, 
			headers: {"x-traceID":"1003-10031141310935564785-2731464-183","x-payload-source":"4654AA4A6DF8F877100F9ADC134C9DF5974DAF6100E344D336F9C55DA03A2376D0B8BFC0AF4","Connection":"keep-alive","Accept-Encoding":"gzip, deflate, br","Content-Type":"application/json","DUID":"u=A4BE9427AC2D53C5EF49727B27694254A85777178504D597D155BE7485011A11&v=0","cid":"10031141310935564785","User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/19A404_eb64__isiPhoneX_Ctrip_CtripWireless_9.7.7_cDevice=iPhone XR__cSize=w414*h896__CtripAPP_iOS_soa_v=707.977_os=iOS_osv=15.0.2_m=iPhone XR_brand=Apple","x-ctx-personal-recommend":"1","Cookie":"DUID=u=A4BE9427AC2D53C5EF49727B27694254A85777178504D597D155BE7485011A11&v=0; _n_cid=10031141310935564785; cticket=F9A0C6548D1299C79F460F79D113E6AFCA115EB54BD70769F2542CE298281891; isNonUser=false","Host":"m.ctrip.com","Accept-Language":"zh-cn","Accept":"application/json","Content-Length":"1474"},
	      
body: `{
  "head" : {
    "sauth" : "",
    "extension" : [
      {
        "value" : "ios",
        "name" : "platform"
      },
      {
        "name" : "reqTime",
        "vaslue" : "1638878615"
      },
      {
        "name" : "clientInfo",
        "value" : "ios|iPhone|15.0.2|9.7.7|9497352"
      },
      {
        "name" : "appVersion",
        "value" : "9.7.7"
      },
      {
        "name" : "deviceId",
        "value" : "C0F90138-8C75-4F4C-9463-81B4FE30FF5C"
      },
      {
        "value" : "zhixing",
        "name" : "partner"
      },
      {
        "value" : "ZXI",
        "name" : "channel"
      },
      {
        "name" : "deviceToken",
        "value" : "dc33de7241e499115c064f832bc58592e6d7940f1436adccba801fca2c3b6193"
      },
      {
        "value" : "ok",
        "name" : "sign"
      },
      {
        "name" : "correctVersion",
        "value" : "977"
      },
      {
        "value" : "_ZWECHAT4327356580",
        "name" : "uid"
      },
      {
        "name" : "ubtAppId",
        "value" : "1003"
      },
      {
        "value" : "1003",
        "name" : "appid"
      },
      {
        "name" : "appid",
        "value" : "1003"
      }
    ],
    "lang" : "01",
    "syscode" : "12",
    "appid" : "1003",
    "sid" : "4505",
    "auth" : "F9A0C6548D1299C79F460F79D113E6AFCA115EB54BD70769F2542CE298281891",
    "cver" : "707.977",
    "ctok" : "",
    "cid" : "10031141310935564785"
  },
  "giftCode" : null,
  "abVersion" : "A"
}`,


		}

		if (debug) {
			console.log(`\n=============== 这是签到请求url ===============`);
			console.log(JSON.stringify(url));
		}

		$.post(url, async (error, response, data) => {     // 这是一个 get 请求 , 如果是 post  记得把这里改了 
			try {
				if (debug) {
					console.log(`\n\n===============这是签到返回data==============`);
					console.log(data)
				}

				let result = JSON.parse(data);
				if (result.resultCode == 0) {     

					console.log(`签到结果: 成功 🎉 `)
					msg += `\n签到结果: 成功 🎉` 

				} else if (result.resultCode === -1) {   

					console.log(`签到结果: ${result.resultMessage}`)
			    	msg += `签到结果: ${result.resultMessage} `

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











//#region 固定代码 可以不管他
// ============================================变量检查============================================ \\
async function Envs() {
	if (zxhc_ck) {
		if (zxhc_ck.indexOf("@") != -1) {
			zxhc_ck.split("@").forEach((item) => {
				zxhc_ckArr.push(item);
			});
		} else {
			zxhc_ckArr.push(zxhc_ck);
		}
	} else {
		console.log(`\n 【${$.name}】：未填写变量 zxhc_ck`)
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
