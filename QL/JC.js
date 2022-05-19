
/* 

苹果软件站签到(兑换共享ID)

变量名  pgrjz_ck = 抓包的Cookie，多账号用@隔开
变量注释:
抓包https://www.cuiun.com/wp-admin/admin-ajax.php 连接 请求头里的Cookie


cron "0 8 * * *" 每天一次

*/ 


const $ = new Env('苹果软件站');
const notify = $.isNode() ? require('./sendNotify') : '';
const Notify = 1; //0为关闭通知，1为打开通知,默认为1
const debug = 1; //0为关闭调试，1为打开调试,默认为0 


//青龙

let pgrjz_ckArr = [];
let data = '';
let msg = '';


//圈x
const pgrjzurlArr = [], pgrjzhdArr = [], pgrjzbodyArr = [], pgrjzcount = ''

let pgrjzurl = $.getdata('pgrjzurl')
let pgrjzhd = $.getdata('pgrjzhd')
let pgrjzbody = $.getdata('pgrjzbody')



!(async () => {

    
    if ($.isNode()) {

        //$.isNode()环境执行部分
pgrjz_ck = process.env.pgrjz_ck; // 这里是 从青龙的 配置文件 读取你写的变量


	if (!(await Envs()))  	//多账号分割 判断变量是否为空  初步处理多账号
		return;
	else {

		console.log(`\n\n=========================================    \n脚本执行 - 北京时间(UTC+8)：${new Date(
			new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 +
			8 * 60 * 60 * 1000).toLocaleString()} \n=========================================\n`);


		console.log(`\n=================== 共找到 ${pgrjz_ckArr.length} 个账号 ===================`)

		if (debug) {
			console.log(`这是你的全部账号数组:\n ${pgrjz_ckArr}`);
		}


		for (let index = 0; index < pgrjz_ckArr.length; index++) {


			let num = index + 1
			console.log(`\n========= 开始【第 ${num} 个账号】=========\n`)

			data = pgrjz_ckArr[index].split('#');      // 这里是分割你每个账号的每个小项   

			if (debug) {
				console.log(`\n 这是你第 ${num} 账号信息:\n ${data}\n`);
			}


			console.log('开始签到');
			await signin();
			await $.wait(2 * 1000);


}}     
        



//签到
 function	 signin(timeout = 3 * 1000) {
	return new Promise((resolve) => {
		let url = {
			url: `https://www.cuiun.com/wp-admin/admin-ajax.php`, 
			headers: {
    "Cookie":data[0],
    "Accept":"*/*",
    "Connection":"keep-alive",
    "Content-Type":"application/x-www-form-urlencoded",
    "Accept-Encoding":"gzip, deflate, br",
    "Host":"www.cuiun.com",
    "User-Agent":"Mozilla/5.0 (iPhone; CPU iPhone OS 12_4_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148"},

	          body:`action=user_checkin`,

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
				if (result.error == false) {     

					console.log(`\n【签到成功】：${result.msg}`)

				msg += `【签到成功】：${result.msg}`

				} else if (result.error === true) {   

					console.log(`\n【签到失败】：${result.msg}!`)
			    	msg += `【签到失败】：${result.msg}!`

				} else if (error) {  

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






    }else{






        //非$.isNode()环境执行部分
   
     if (typeof $request !== "undefined") {
        await pgrjzck()//获取ck
        return;
    }
pgrjzurlArr.push($.getdata('pgrjzurl'))
        pgrjzhdArr.push($.getdata('pgrjzhd'))
        pgrjzbodyArr.push($.getdata('pgrjzbody'))

        let pgrjzcount = ($.getval('pgrjzcount') || '1');

        for (let i = 2; i <= pgrjzcount; i++) {

            pgrjzurlArr.push($.getdata(`pgrjzurl${i}`))
            pgrjzhdArr.push($.getdata(`pgrjzhd${i}`))
            pgrjzbodyArr.push($.getdata(`pgrjzbody${i}`))

        }

if (!pgrjzhdArr[0]) {
      $.msg($.name, '【提示】请先获取账号一Cookie');
      return; 
    }

        timeZone = new Date().getTimezoneOffset() / 60;
        timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
        bjTime = new Date(timestamp).toLocaleString('zh', {hour12: false, timeZoneName: 'long'});
        $.log(`\n === 脚本执行${bjTime} === \n`);
        $.log(`============ 您共提供${pgrjzhdArr.length}个账号 ============`);


       for (let i = 0; i < pgrjzhdArr.length; i++) {

            if (pgrjzhdArr[i]) {

                pgrjzurl = pgrjzurlArr[i];
                pgrjzhd = pgrjzhdArr[i];
                pgrjzbody = pgrjzbodyArr[i];

       $.index = i + 1;
       console.log(`\n\n开始【苹果软件站${$.index}】`)


           await $.wait(2000)
           await pgrjz()
}}
//版块
function pgrjz(timeout = 0) {
    return new Promise((resolve) => {

        let url = {
            url: `https://www.cuiun.com/wp-admin/admin-ajax.php`,
            headers: JSON.parse(pgrjzhd),
            body: pgrjzbody,
        }
        $.post(url, async (err, resp, data) => {
            try {

                data = JSON.parse(data)

                if (data.error == false) {

            $.log(`签到成功：${data.msg}`)

            msg +=(`签到成功：${data.msg}`)

                } else {

            $.log(`签到失败：${data.msg}`)

            msg +=(`签到失败：${data.msg}`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}



    }
    




//共同



         await SendMsg(msg); // 与发送通知有关


    
})()
.catch((e) => $.logErr(e))
.finally(() => $.done())
  



//获取ck
function pgrjzck() {
    if ($request.url.indexOf("admin") > -1) {
        const pgrjzurl = $request.url
        if (pgrjzurl) $.setdata(pgrjzurl, `pgrjzurl${status}`)
        $.log(pgrjzurl)

        const pgrjzhd = JSON.stringify($request.headers)
        if (pgrjzhd) $.setdata(pgrjzhd, `pgrjzhd${status}`)
        $.log(pgrjzhd)

        const pgrjzbody = $request.body
        if (pgrjzbody) $.setdata(pgrjzbody, `pgrjzbody${status}`)
        $.log(pgrjzbody)

        $.msg($.name, "", `${status}获取headers成功`)

    }
}



//检查变量
async function Envs() {
	if (pgrjz_ck) {
		if (pgrjz_ck.indexOf("@") != -1) {
			pgrjz_ck.split("@").forEach((item) => {
				pgrjz_ckArr.push(item);
			});
		} else {
			pgrjz_ckArr.push(pgrjz_ck);
		}
	} else {
		console.log(`\n 【${$.name}】：未填写变量 pgrjz_ck`)
		return;
	}

	return true;
}




//通知
async function SendMsg(message) {
	if (!message)
		return;

	if (Notify > 0) {
		if ($.isNode()) {
			var notify = require('./sendNotify');
			await notify.sendNotify($.name, message);
		} else {
			$.msg($.name,"",msg)
		}
	} else {
		$.log(message);
	}
}


//固定板块，无需动  
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============📣系统通知📣=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
