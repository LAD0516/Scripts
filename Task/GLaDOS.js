/*
* ==UserScript==
* @ScriptName        【GLaDOS】
* @Author            【@GnA1J】
* @UpdateTime        【26.9.27】
* @ScriptFunction    【GLaDOS-签到获取积分】
* @Attention         【Cookie有效期暂时未知】
* @AppletPath        【export gladosCookie = cookie&UA多账号用@隔开】
* @ScriptURL         【https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/GLaDOS.js】
* ==/UserScript==
【QuantumultX】 :
[rewrite_local]
https://glados.cloud/api/user/status url script-request-body https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/GLaDOS.js
[task_local]
15 7,15 * * * https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/GLaDOS.js, tag=glados

【Loon】 :
[Script]
http-request https://glados.cloud/api/user/status tag=gladosCookie, script-path=https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/GLaDOS.js
cron "15 7,15 * * *" script-path=https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/GLaDOS.js,tag=glados

【Surge】 :

[Script]
glados = type=cron,cronexp="15 7,15 * * *",wake-system=1,timeout=120,script-path=https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/GLaDOS.js
gladosCookie = type=http-request,pattern=https://glados.cloud/api/user/status,script-path=https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/GLaDOS.js

【小火箭】 :
[Script]
glados = type=cron,script-path=https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/GLaDOS.js, cronexpr="15 7,15 * * *", timeout=500, enable=true
gladosCookie = type=http-request,pattern=https://glados.cloud/api/user/status,script-path=https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/GLaDOS.js

[mitm]
hostname = glados.cloud
*/

const $ = new Env("GLaDOS")
const Notify = 1; 
const debug = 0; 
const Diagnostics = 1;
const minDelay = 3;  //延时(秒)
const maxDelay = 10; 
let msg = '';
$.signKeyglados = 'gladosCookie'
let isGetCookie = typeof $request !== 'undefined';
if (isGetCookie) {
  !(async () => {
    const session = {
      url: $request.url,
      body: $request.body,
      headers: $request.headers
    };
    console.log(JSON.stringify(session));
    let savedData = $.getdata($.signKeyglados) || '';
    let sessionStr = JSON.stringify(session);
    if (!savedData) {
      $.setdata(sessionStr, $.signKeyglados);
      $.subt = `获取会话: 成功保存第 1 个账号!`;
    } else {
      let accounts = savedData.split('@');
      let updated = false;
      for (let i = 0; i < accounts.length; i++) {
        try {
          let acc = JSON.parse(accounts[i]);
          if (acc.headers && acc.headers['Cookie'] === session.headers['Cookie']) {
            accounts[i] = sessionStr;
            updated = true;
            $.subt = `获取会话: 成功更新第 ${i + 1} 个账号!`;
            break;
          }
        } catch(e) {}
      }
      if (!updated) {
        accounts.push(sessionStr);
        $.subt = `获取会话: 成功追加第 ${accounts.length} 个账号!`;
      }
      $.setdata(accounts.join('@'), $.signKeyglados);
    } 
    $.msg($.name, $.subt, '')
  })()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
} else {
  !(async () => {
    let rawCookies = $.isNode() 
      ? (process.env.gladosCookie || ($.getdata($.signKeyglados)))
      : ($.getdata($.signKeyglados));
    if (!rawCookies) {
      let text = "未检测到 Cookie，请先获取 Cookie！";
      console.log(text);
      $.msg($.name, text);
      return;
    }
    let accountList = rawCookies.split('@').filter(item => item.trim() !== '');
    console.log(`共检测到 ${accountList.length} 个账号，准备开始执行签到...`);
    for (let index = 0; index < accountList.length; index++) {
        let accStr = accountList[index].trim();
        let accountData = {};
      try {
        if (accStr.startsWith('{')) {
            accountData = JSON.parse(accStr);
          } else {
            let [cookie, ua] = accStr.split('&');
            accountData = {
              headers: {
                'Cookie': cookie ? cookie.trim() : '',
                'User-Agent': ua ? ua.trim() : ''
              }
            };
          }
        console.log(`\n============== 开始执行第 ${index + 1}/${accountList.length} 个账号 ==============`);   
        const randomDelayTime = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay; 
        console.log(`等待 ${randomDelayTime} 秒后执行...`);
        await $.wait(randomDelayTime * 1000);
        let userState = { name: '', days: 0, traffic: 0, point: 0 };
        await login(accountData, userState);
        await info(accountData, userState);
        await $.wait(800);
        await signin(accountData, userState);

      } catch (e) {
        let text = `第 (${index + 1} 个账号数据解析或执行异常:)${e.message || e}`;
        msg += `${text}\n`;
      }
    }

    await SendMsg(msg);
  })()
  .catch((e) => $.logErr(e))
  .finally(() => $.done())
}

async function login(accountData, userState) {
  return new Promise((resolve) => {
    let signheaders = accountData.headers || {};
    const url = { 
      url: 'https://glados.cloud/api/user/status',
      headers: {
        'Accept-Encoding' : `gzip, deflate, br`,
        'Cookie' : signheaders['Cookie'] || '',
        'Connection' : `keep-alive`,
        'Accept' : `application/json, text/plain, */*`,
        'Host' : `glados.cloud`,
        'User-Agent' : signheaders['User-Agent'] || '',
        'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
      },
      body: '',
    }
    if (debug){console.log(JSON.stringify(url))};
    if (!data) {
      console.log(`账号登录查询失败：接口未返回数据 (data 为 undefined/null)，请检查网络或 Cookie 配置`);
      if (Diagnostics) msg += `🔍 [status 异常]: 接口未返回数据\n`;
      return;
    }
    $.get(url, (err, resp, data) => {
      try {
        if (debug){console.log(data)};
        const result = JSON.parse(data);
        if (result.code == 0) {
          userState.name = result.data.email;
          userState.days = result.data.leftDays / 1;
          userState.traffic = result.data.traffic / 1000000000;
          let text = `账号【${userState.name}】登录查询成功！`;
          console.log(text);
          msg += `${text}\n`;
        } else {
          let text = `账号登录查询失败：${result.message}`;
          console.log(text);
          msg += `${text}\n`;
        }
      } catch (e) {
        console.log(e);
      } finally {
        resolve();
      }
    })
  })
}

async function info(accountData, userState) {
  return new Promise((resolve) => {
    let signheaders = accountData.headers || {};
    const url = { 
      url: 'https://glados.cloud/api/user/points',
      headers: {
        'Accept-Encoding' : `gzip, deflate, br`,
        'Cookie' : signheaders['Cookie'] || '',
        'Connection' : `keep-alive`,
        'Accept' : `application/json, text/plain, */*`,
        'Host' : `glados.cloud`,
        'User-Agent' : signheaders['User-Agent'] || '',
        'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
      },
      body: '',
    }
    if (debug){console.log(JSON.stringify(url))};
    $.get(url, (err, resp, data) => {
      try {
        if (debug){console.log(data)};
        if (!data) {
          console.log(`账号登录查询失败：接口未返回数据 (data 为 undefined/null)，请检查网络或 Cookie 配置`);
          if (Diagnostics) msg += `🔍 [status 异常]: 接口未返回数据\n`;
          return;
        }
        const result = JSON.parse(data);
        if (result.code == 0) {
          userState.point = result.points / 1;
          let text =`账号【${userState.name}】积分查询成功！`;
          console.log(text);
          msg += `${text}\n`;
        } else {
          let text =`账号【${userState.name}】积分查询失败：${result.message}`;
          console.log(text);
          msg += `${text}\n`;
        }
      } catch (e) {
        console.log(e);
      } finally {
        resolve();
      }
    })
  })
}

async function signin(accountData, userState) {
  return new Promise((resolve) => {
    let signheaders = accountData.headers || {};
    const url = { 
      url: 'https://glados.cloud/api/user/checkin',
      headers: {
        'Origin' : `https://glados.cloud`,
        'Cookie' : signheaders['Cookie'] || '',
        'Connection' : `keep-alive`,
        'Content-Type' : `application/json;charset=utf-8`,
        'Accept' : `application/json, text/plain, */*`,
        'Host' : `glados.cloud`,
        'User-Agent' : signheaders['User-Agent'] || '',
        'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
        'Accept-Encoding' : `gzip, deflate, br`,
      },
      body: '{"token": "glados.cloud"}',
    }
    if (debug){console.log(JSON.stringify(url))};
    $.post(url, (err, resp, data) => {
      try {
        if (debug){console.log(data)};
        if (!data) {
          console.log(`账号登录查询失败：接口未返回数据 (data 为 undefined/null)，请检查网络或 Cookie 配置`);
          if (Diagnostics) msg += `🔍 [status 异常]: 接口未返回数据\n`;
          return;
        }
        const result = JSON.parse(data);
        let matchPoints = result.message ? result.message.match(/\d+/) : null;
        let points = matchPoints ? parseInt(matchPoints[0]) : 0;
        let Integral = userState.point + points;

        if (result.code == 0) {
          let text =`账号【${userState.name}】签到成功，${result.message}！积分：${Integral}，剩余天数：${userState.days}，流量：${userState.traffic.toFixed(2)}G/200G`;
          console.log(text);
          msg += `${text}\n`;
        } else {
         let text =`账号【${userState.name}】签到失败：${result.message}！积分：${Integral}，剩余天数：${userState.days}，流量：${userState.traffic.toFixed(2)}G/200G`;
          console.log(text);
          msg += `${text}\n`;
        }
      } catch (e) {
        console.log(e);
      } finally {
        resolve();
      }
    })
  })
}

async function SendMsg(message) {
  if (!message) return;
  if (Notify > 0) {
    if ($.isNode()) {
      const notify = require('./sendNotify');
      await notify.sendNotify($.name, message);
    } else {
      $.msg($.name, "", message);
    }
  } else {
    console.log(message);
  }
}
// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
