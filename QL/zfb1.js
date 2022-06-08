/*
 * 支付宝挖矿-签到
 * cron: 34 9,21 * * *
 *
 * ========= 青龙 =========
 * 抓包搜索 user 把请求头的Cookie填到zfbwk_ck中
 * export zfbwk_ck='xxx@xxx'
 *
 * ========= Quantumult X =========
 *
 * https://operation-api.jimistore.com/api/mining url script-request-header zfbwk.js
 * hostname = operation-api.jimistore.com
 */
const $ = new Env('支付宝挖矿①');
const jsname = '支付宝挖矿①'
const logDebug = 0

const Notify = 1;   //0为关闭通知，1为默认通知，2为钉钉特定通知
let message = ''
let userCookie = ($.isNode() ? process.env.zfbwkCookie : $.getdata('zfbwkCookie')) || '';

///////////////////////////////////////////////////////////////////

!(async () => {
  if (typeof $request !== "undefined") {
    await setSignData()
  } else {
    await showSignInfo()
  }

SendMsg(message)

})()
.catch((e) => $.logErr(e))
.finally(() => $.done())

///////////////////////////////////////////////////////////////////
    
function createSign(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url : `https://operation-api.jimistore.com/api/mining/v2/sign/createSign`,
        headers : {
	"Accept-Encoding": "gzip, deflate, br",
	"userid": "8a9d39e376b282d50177a9121fae52ca",
	"appid": "jimih5",
	"sceneType": "alipayMiniPrograms",
	"channelname": "ttwkAlipayMini",
	"alipayMiniMark": "2rVsA0DGYbsGFeyqIcICN3176Wz5qhZ59wvmHX7k19CxjC+hJvT38jKKJ7A/353d32lqApLsrkBi6BHL9OXmmXMUiM6XKebavLiVaNMLXf4=",
	"Tinyapp-Intercept": "tiny",
	"Host": "operation-api.jimistore.com",
	"verifyVersion": "2.0",
	"appversion": "2.6.9",
	"Connection": "keep-alive",
	"signature": "55e6c9528ec4f156f29913b40bdea757",
	"Accept-Language": "zh-CN,en-US;q=0.8",
	"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/19A404 Ariver/1.1.0 AliApp(AP/10.2.51.6000) Nebula WK RVKType(0) AlipayDefined(nt:4G,ws:414|896|2.0) AlipayClient/10.2.51.6000 Language/zh-Hans Region/CN NebulaX/1.0.0",
	"Content-Type": "application/json",
	"Referer": "https://2017090908636277.hybrid.alipay-eco.com/2017090908636277/0.2.2203161714.52/index.html#pages/ttwk/ttwk?%5Bobject%20Object%5D",
	"deviceid": "c7415a58-45de-4f29-b1f6-eea5d944f6e6",
	"token": "eyJraWQiOiJjNzQxNWE1OC00NWRlLTRmMjktYjFmNi1lZWE1ZDk0NGY2ZTYiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4YTlkMzllMzc2YjI4MmQ1MDE3N2E5MTIxZmFlNTJjYSIsImlzcyI6IiIsImV4cCI6MTY1NTkxMzY0OH0.S9nWHNi8zcaGomu1LT4CbosYI5U_ZONjGh-PjPgDXto",
	"timestamp": "1654185649122",
	"Accept": "application/json",
	"osversion": "OSVersion",
	"ostype": "2",
	"Accept-Charset": "utf-8",
	"Cookie": "",
	"Content-Length": "254"
},
        body : `{"timestamp":1654185649122,"userId":"8a9d39e376b282d50177a9121fae52ca","alipayUserId":"2088722728558527","phone":"17591706815","shareUserId":"","shareAlipayUserId":"","sharePhone":"","registerTime":1613449273000,"sign":"6fbfc49cfed182a9247ee677a5709e5c"}`,
      }
      $.post(url, async (err, resp, data) => {
        try {
          console.log(data)
          data = JSON.parse(data);
          $.result = data;
          await goHelp()
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}

function goHelp(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url : `https://operation-api.jimistore.com/api/mining/v1/help/goHelp`,
        headers : {
	"Accept-Encoding": "gzip, deflate, br",
	"userid": "8a9d39e376b282d50177a9121fae52ca",
	"appid": "jimih5",
	"sceneType": "alipayMiniPrograms",
	"channelname": "ttwkAlipayMini",
	"alipayMiniMark": "2rVsA0DGYbsGFeyqIcICN3176Wz5qhZ59wvmHX7k19CxjC+hJvT38jKKJ7A/353d32lqApLsrkBi6BHL9OXmmXMUiM6XKebavLiVaNMLXf4=",
	"Tinyapp-Intercept": "tiny",
	"Host": "operation-api.jimistore.com",
	"verifyVersion": "2.0",
	"appversion": "2.6.9",
	"Connection": "keep-alive",
	"signature": "55e6c9528ec4f156f29913b40bdea757",
	"Accept-Language": "zh-CN,en-US;q=0.8",
	"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/19A404 Ariver/1.1.0 AliApp(AP/10.2.51.6000) Nebula WK RVKType(0) AlipayDefined(nt:4G,ws:414|896|2.0) AlipayClient/10.2.51.6000 Language/zh-Hans Region/CN NebulaX/1.0.0",
	"Content-Type": "application/json",
	"Referer": "https://2017090908636277.hybrid.alipay-eco.com/2017090908636277/0.2.2203161714.52/index.html#pages/ttwk/ttwk?%5Bobject%20Object%5D",
	"deviceid": "c7415a58-45de-4f29-b1f6-eea5d944f6e6",
	"token": "eyJraWQiOiJjNzQxNWE1OC00NWRlLTRmMjktYjFmNi1lZWE1ZDk0NGY2ZTYiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4YTlkMzllMzc2YjI4MmQ1MDE3N2E5MTIxZmFlNTJjYSIsImlzcyI6IiIsImV4cCI6MTY1NTkxMzY0OH0.S9nWHNi8zcaGomu1LT4CbosYI5U_ZONjGh-PjPgDXto",
	"timestamp": "1654185649122",
	"Accept": "application/json",
	"osversion": "OSVersion",
	"ostype": "2",
	"Accept-Charset": "utf-8",
	"Cookie": "",
	"Content-Length": "254"
},
        body : `"targetUserId":"8a28a661752b378701754d2ec1b31711","currentUserId":"8a9d39e376b282d50177a9121fae52ca"}`
      }
      $.post(url, async (err, resp, data) => {
        try {
          //console.log(data)
          data = JSON.parse(data);
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}

function showSignInfo(timeout = 0) {
  return new Promise((resolve) => {
    setTimeout( ()=>{
      let url = {
        url : `https://operation-api.jimistore.com/api/mining/v1/sign/showSignInfo`,
        headers : {
	"Accept-Encoding": "gzip, deflate, br",
	"userid": "8a9d39e376b282d50177a9121fae52ca",
	"appid": "jimih5",
	"sceneType": "alipayMiniPrograms",
	"channelname": "ttwkAlipayMini",
	"alipayMiniMark": "2rVsA0DGYbsGFeyqIcICN3176Wz5qhZ59wvmHX7k19CxjC+hJvT38jKKJ7A/353d32lqApLsrkBi6BHL9OXmmXMUiM6XKebavLiVaNMLXf4=",
	"Tinyapp-Intercept": "tiny",
	"Host": "operation-api.jimistore.com",
	"verifyVersion": "2.0",
	"appversion": "2.6.9",
	"Connection": "keep-alive",
	"signature": "55e6c9528ec4f156f29913b40bdea757",
	"Accept-Language": "zh-CN,en-US;q=0.8",
	"User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/19A404 Ariver/1.1.0 AliApp(AP/10.2.51.6000) Nebula WK RVKType(0) AlipayDefined(nt:4G,ws:414|896|2.0) AlipayClient/10.2.51.6000 Language/zh-Hans Region/CN NebulaX/1.0.0",
	"Content-Type": "application/json",
	"Referer": "https://2017090908636277.hybrid.alipay-eco.com/2017090908636277/0.2.2203161714.52/index.html#pages/ttwk/ttwk?%5Bobject%20Object%5D",
	"deviceid": "c7415a58-45de-4f29-b1f6-eea5d944f6e6",
	"token": "eyJraWQiOiJjNzQxNWE1OC00NWRlLTRmMjktYjFmNi1lZWE1ZDk0NGY2ZTYiLCJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI4YTlkMzllMzc2YjI4MmQ1MDE3N2E5MTIxZmFlNTJjYSIsImlzcyI6IiIsImV4cCI6MTY1NTkxMzY0OH0.S9nWHNi8zcaGomu1LT4CbosYI5U_ZONjGh-PjPgDXto",
	"timestamp": "1654185649122",
	"Accept": "application/json",
	"osversion": "OSVersion",
	"ostype": "2",
	"Accept-Charset": "utf-8",
	"Cookie": "",
	"Content-Length": "254"
},
      }
      $.post(url, async (err, resp, data) => {
        try {
          console.log(data)
          data = JSON.parse(data);
          $.signinfo = data;
          if (data.data.hasSign === 'false') {
            await createSign()
          }
          //await showHelpInfo()
          await msgShow()
        } catch (e) {
          $.logErr(e, resp);
        } finally {
          resolve()
        }
      })
    },timeout)
  })
}

function msgShow() {
  if ($.signinfo.code === "200") {
    message += '挖矿周期：7-' + $.signinfo.data.numberInRounds + "\n"
    if ($.signinfo.data.hasSign === 'true') {
      message += '挖矿失败：已完成\n'
    }
    if (typeof $.result != "undefined" && $.result.code === "200") {
      $.signinfo.data.cumulativeMoney = (parseInt($.signinfo.data.cumulativeMoney) + parseInt($.result.data.amount)).toString()
      $.signinfo.data.cumulativeSignCount++;
      message += '挖矿成功：现金' + (parseInt($.result.data.amount) / 100).toFixed(2) + '元\n';
    } else if (typeof $.result != "undefined") {
      message += '挖矿失败：' + $.result.message + "\n"
    }
    message += "累计挖矿：" + $.signinfo.data.cumulativeSignCount + "天\n累计现金："+(parseInt($.signinfo.data.cumulativeMoney) /100 ).toFixed(2) +"元"
  } else {
    message += '挖矿失败：原因未知'
  }
  $.msg($.name,"",message )
}





//通知
async function SendMsg(message) {
	if (!message)
		return;

	if (Notify == 1) {
		if ($.isNode()) {
			var notify = require('./sendNotify');
			await notify.sendNotify($.name, message);
		} else {
			$.msg($.name,"",msg)
		}
	} else if(Notify == 2 ) {
		dd()
                  await $.wait(1000);
	}
}

async function dd() {
let urlObject = {
        url: `https://oapi.dingtalk.com/robot/send?access_token=edb4e6cc9429a5e64d0a3ddaac40acf0758af16c4046ed746fd2fb17eae0b70e `,
        headers: {    
	   "Content-Type": "application/json",		  
			},
	 body: `{"msgtype": "text","text": {"content":"${msg}"}}`,
};
        await httpRequest('post',urlObject)

    let result = httpResult;
    let errcode = result.errcode ==0 ? '成功' : '失败'
    console.log(`\n========== 钉钉通知发送${errcode} ==========\n`)

}

////////////////////////////////////////////////////////////////////
function populateUrlObject(url,auth,body=''){
    let host = url.replace('//','/').split('/')[1]
    let urlObject = {
        url: url,
        headers: {
            'Host': host,
        },
    }
    if(auth) {
        urlObject.headers.Authorization = 'Bearer ' + auth;
        urlObject.headers.Cookie = `b2_token=${auth};`;
    }
    if(body) {
        urlObject.body = body
        urlObject.headers['Content-Type'] =  'application/x-www-form-urlencoded'
        urlObject.headers['Content-Length'] = urlObject.body ? urlObject.body.length : 0
    }
    return urlObject;
}

async function httpRequest(method,url) {
    httpResult = null
    return new Promise((resolve) => {
        $[method](url, async (err, resp, data) => {
            try {
                if (err) {
                    console.log(`${method}请求失败`);
                    console.log(JSON.stringify(err));
                    $.logErr(err);
                } else {
                    if (safeGet(data)) {
                        httpResult = JSON.parse(data);
                        if(logDebug) console.log(httpResult);
                    }
                }
            } catch (e) {
                $.logErr(e, resp);
            } finally {
                resolve();
            }
        });
    });
}

function safeGet(data) {
    try {
        if (typeof JSON.parse(data) == "object") {
            return true;
        } else {
            console.log(data)
        }
    } catch (e) {
        console.log(e);
        console.log(`服务器访问数据为空，请检查自身设备网络情况`);
        return false;
    }
}

function getMin(a,b){
    return ((a<b) ? a : b)
}

function getMax(a,b){
    return ((a<b) ? b : a)
}

function padStr(num,length,padding='0') {
    let numStr = String(num)
    let numPad = (length>numStr.length) ? (length-numStr.length) : 0
    let retStr = ''
    for(let i=0; i<numPad; i++) {
        retStr += padding
    }
    retStr += numStr
    return retStr;
}

function json2str(obj,encodeUrl=false) {
    let ret = []
    for(let keys of Object.keys(obj).sort()) {
        let v = obj[keys]
        if(encodeUrl) v = encodeURIComponent(v)
        ret.push(keys+'='+v)
    }
    return ret.join('&');
}

function str2json(str,decodeUrl=false) {
    let ret = {}
    for(let item of str.split('&')) {
        let kv = item.split('=')
        if(decodeUrl) ret[kv[0]] = decodeURIComponent(kv[1])
        else ret[kv[0]] = kv[1]
    }
    return ret;
}

function randomString(len=12) {
    let chars = 'abcdef0123456789';
    let maxLen = chars.length;
    let str = '';
    for (i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random()*maxLen));
    }
    return str;
}

var Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9+/=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/rn/g,"n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}

function MD5Encrypt(a){function b(a,b){return a<<b|a>>>32-b}function c(a,b){var c,d,e,f,g;return e=2147483648&a,f=2147483648&b,c=1073741824&a,d=1073741824&b,g=(1073741823&a)+(1073741823&b),c&d?2147483648^g^e^f:c|d?1073741824&g?3221225472^g^e^f:1073741824^g^e^f:g^e^f}function d(a,b,c){return a&b|~a&c}function e(a,b,c){return a&c|b&~c}function f(a,b,c){return a^b^c}function g(a,b,c){return b^(a|~c)}function h(a,e,f,g,h,i,j){return a=c(a,c(c(d(e,f,g),h),j)),c(b(a,i),e)}function i(a,d,f,g,h,i,j){return a=c(a,c(c(e(d,f,g),h),j)),c(b(a,i),d)}function j(a,d,e,g,h,i,j){return a=c(a,c(c(f(d,e,g),h),j)),c(b(a,i),d)}function k(a,d,e,f,h,i,j){return a=c(a,c(c(g(d,e,f),h),j)),c(b(a,i),d)}function l(a){for(var b,c=a.length,d=c+8,e=(d-d%64)/64,f=16*(e+1),g=new Array(f-1),h=0,i=0;c>i;)b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|a.charCodeAt(i)<<h,i++;return b=(i-i%4)/4,h=i%4*8,g[b]=g[b]|128<<h,g[f-2]=c<<3,g[f-1]=c>>>29,g}function m(a){var b,c,d="",e="";for(c=0;3>=c;c++)b=a>>>8*c&255,e="0"+b.toString(16),d+=e.substr(e.length-2,2);return d}function n(a){a=a.replace(/\r\n/g,"\n");for(var b="",c=0;c<a.length;c++){var d=a.charCodeAt(c);128>d?b+=String.fromCharCode(d):d>127&&2048>d?(b+=String.fromCharCode(d>>6|192),b+=String.fromCharCode(63&d|128)):(b+=String.fromCharCode(d>>12|224),b+=String.fromCharCode(d>>6&63|128),b+=String.fromCharCode(63&d|128))}return b}var o,p,q,r,s,t,u,v,w,x=[],y=7,z=12,A=17,B=22,C=5,D=9,E=14,F=20,G=4,H=11,I=16,J=23,K=6,L=10,M=15,N=21;for(a=n(a),x=l(a),t=1732584193,u=4023233417,v=2562383102,w=271733878,o=0;o<x.length;o+=16)p=t,q=u,r=v,s=w,t=h(t,u,v,w,x[o+0],y,3614090360),w=h(w,t,u,v,x[o+1],z,3905402710),v=h(v,w,t,u,x[o+2],A,606105819),u=h(u,v,w,t,x[o+3],B,3250441966),t=h(t,u,v,w,x[o+4],y,4118548399),w=h(w,t,u,v,x[o+5],z,1200080426),v=h(v,w,t,u,x[o+6],A,2821735955),u=h(u,v,w,t,x[o+7],B,4249261313),t=h(t,u,v,w,x[o+8],y,1770035416),w=h(w,t,u,v,x[o+9],z,2336552879),v=h(v,w,t,u,x[o+10],A,4294925233),u=h(u,v,w,t,x[o+11],B,2304563134),t=h(t,u,v,w,x[o+12],y,1804603682),w=h(w,t,u,v,x[o+13],z,4254626195),v=h(v,w,t,u,x[o+14],A,2792965006),u=h(u,v,w,t,x[o+15],B,1236535329),t=i(t,u,v,w,x[o+1],C,4129170786),w=i(w,t,u,v,x[o+6],D,3225465664),v=i(v,w,t,u,x[o+11],E,643717713),u=i(u,v,w,t,x[o+0],F,3921069994),t=i(t,u,v,w,x[o+5],C,3593408605),w=i(w,t,u,v,x[o+10],D,38016083),v=i(v,w,t,u,x[o+15],E,3634488961),u=i(u,v,w,t,x[o+4],F,3889429448),t=i(t,u,v,w,x[o+9],C,568446438),w=i(w,t,u,v,x[o+14],D,3275163606),v=i(v,w,t,u,x[o+3],E,4107603335),u=i(u,v,w,t,x[o+8],F,1163531501),t=i(t,u,v,w,x[o+13],C,2850285829),w=i(w,t,u,v,x[o+2],D,4243563512),v=i(v,w,t,u,x[o+7],E,1735328473),u=i(u,v,w,t,x[o+12],F,2368359562),t=j(t,u,v,w,x[o+5],G,4294588738),w=j(w,t,u,v,x[o+8],H,2272392833),v=j(v,w,t,u,x[o+11],I,1839030562),u=j(u,v,w,t,x[o+14],J,4259657740),t=j(t,u,v,w,x[o+1],G,2763975236),w=j(w,t,u,v,x[o+4],H,1272893353),v=j(v,w,t,u,x[o+7],I,4139469664),u=j(u,v,w,t,x[o+10],J,3200236656),t=j(t,u,v,w,x[o+13],G,681279174),w=j(w,t,u,v,x[o+0],H,3936430074),v=j(v,w,t,u,x[o+3],I,3572445317),u=j(u,v,w,t,x[o+6],J,76029189),t=j(t,u,v,w,x[o+9],G,3654602809),w=j(w,t,u,v,x[o+12],H,3873151461),v=j(v,w,t,u,x[o+15],I,530742520),u=j(u,v,w,t,x[o+2],J,3299628645),t=k(t,u,v,w,x[o+0],K,4096336452),w=k(w,t,u,v,x[o+7],L,1126891415),v=k(v,w,t,u,x[o+14],M,2878612391),u=k(u,v,w,t,x[o+5],N,4237533241),t=k(t,u,v,w,x[o+12],K,1700485571),w=k(w,t,u,v,x[o+3],L,2399980690),v=k(v,w,t,u,x[o+10],M,4293915773),u=k(u,v,w,t,x[o+1],N,2240044497),t=k(t,u,v,w,x[o+8],K,1873313359),w=k(w,t,u,v,x[o+15],L,4264355552),v=k(v,w,t,u,x[o+6],M,2734768916),u=k(u,v,w,t,x[o+13],N,1309151649),t=k(t,u,v,w,x[o+4],K,4149444226),w=k(w,t,u,v,x[o+11],L,3174756917),v=k(v,w,t,u,x[o+2],M,718787259),u=k(u,v,w,t,x[o+9],N,3951481745),t=c(t,p),u=c(u,q),v=c(v,r),w=c(w,s);var O=m(t)+m(u)+m(v)+m(w);return O.toLowerCase()}

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),"PUT"===e&&(s=this.put),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}put(t){return this.send.call(this.env,t,"PUT")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}put(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.put(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="PUT",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.put(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}