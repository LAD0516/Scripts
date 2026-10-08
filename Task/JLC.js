/*
* ==UserScript==
* @ScriptName        【嘉立创】
* @Author            【@GnA1J】
* @UpdateTime        【2026.09.29】
* @ScriptFunction    【嘉立创-签到获取积分】
* @Attention         【Cookie有效期暂时未知】
* @AppletPath        【export JLCCookie = 抓包sign请求头完整JSON格式，或者直接填X-JLC-AccessToken值&X-JLC-MP-AppId值&secretkey值&User-Agent值，多账号都用@隔开】
* @ScriptURL         【https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/JLC.js】
* ==/UserScript==
【QuantumultX】 :
[rewrite_local]
https://m.jlc.com/api/activity/sign/signIn url script-request-body https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/JLC.js
[task_local]
28 8,16 * * * https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/JLC.js, tag=嘉立创, enabled=true
【Loon】 :
[Script]
http-request https://m.jlc.com/api/activity/sign/signIn tag=JLCCookie, script-path=https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/JLC.js
cron "28 8,16 * * *" script-path=https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/JLC.js,tag=嘉立创
【Surge】 :
[Script]
嘉立创 = type=cron,cronexp="28 8,16 * * *",wake-system=1,timeout=120,script-path=https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/JLC.js
JLCCookie = type=http-request,pattern=https://m.jlc.com/api/activity/sign/signIn,script-path=https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/JLC.js
【小火箭】 :
[Script]
嘉立创 = type=cron,script-path=https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/JLC.js, cronexpr="28 8,16 * * *", timeout=500, enable=true
JLCCookie = type=http-request,pattern=https://m.jlc.com/api/activity/sign/signIn,script-path=https://raw.githubusercontent.com/LAD0516/Scripts/main/Task/JLC.js
[mitm]
hostname = m.jlc.com
*/
const $ = new Env("嘉立创")
const Notify = getEnv('JLCNotify', 1);            // 默认开启通知 1
const debug = getEnv('JLCDebug', 0);              // 默认关闭调试 0
const Diagnostics = getEnv('JLCDiagnostics', 1);  // 默认开启诊断 1
const maxRetries = getEnv('JLCMaxRetries', 3);    // 默认请求重试 3 次
const { min: minDelay, max: maxDelay } = getDelayRange();
const MAX_RETRIES = Number.isFinite(Number(maxRetries)) && Number(maxRetries) >= 1 ? Math.floor(Number(maxRetries)) : 3;
let msg = '';
const SIGN_KEY_JLC = 'JLCCookie';
const isGetCookie = typeof $request !== 'undefined';
const NO_RETRY_STATUS = [400, 401, 403, 404]; // 不重试的 HTTP 状态码
// 默认请求头 UA
const DEFAULT_UA = 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0_3 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.78(0x18004e22) NetType/WIFI Language/zh_CN';
const REFERER = 'https://servicewechat.com/wx6c7b851c877dba42/161/page-frame.html';
const MP_VERSION = '1.123.0';
const API_ASSETS = 'https://m.jlc.com/api/appPlatform/center/assets/selectPersonalAssetsInfo';
const API_SIGNIN = 'https://m.jlc.com/api/activity/sign/signIn?platformType=MP-WEIXIN&source=2';
function getEnv(key, defaultValue) {
  let val;
  if ($.isNode() && typeof process !== 'undefined' && process.env) {
    val = process.env[key];
  } else {
    val = $.getdata(key);
  }
  if (val === undefined || val === null || val === '') return defaultValue;
  const str = String(val).trim().toLowerCase();
  if (['true', '1'].includes(str)) return 1;
  if (['false', '0'].includes(str)) return 0;
  const num = Number(val);
  return Number.isFinite(num) ? num : defaultValue;
}
function getDelayRange() {
  let min = getEnv('JLCMinDelay', 3);
  let max = getEnv('JLCMaxDelay', 8);
  min = Number.isFinite(Number(min)) ? Math.max(0, Number(min)) : 3;
  max = Number.isFinite(Number(max)) ? Math.max(0, Number(max)) : 8;
  if (max < min) [min, max] = [max, min];
  return { min, max };
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, ms)));
}
function randomDelayMs() {
  const seconds = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  return seconds * 1000;
}

function maskToken(token) {
  const str = String(token || '');
  if (!str) return '(空)';
  if (str.length <= 8) return str[0] + '***';
  return `${str.slice(0, 4)}***${str.slice(-4)}`;
}
async function httpRequestWithRetry(options, method = 'get', retries = MAX_RETRIES, retryDelay = 2000) {
  const total = Number.isFinite(Number(retries)) && Number(retries) >= 1 ? Math.floor(Number(retries)) : 1;
  const verb = method.toLowerCase() === 'post' ? 'post' : 'get';
  let lastReason = '未知原因';

  for (let attempt = 1; attempt <= total; attempt++) {
    if (debug) {
      console.log(`\n---------------- [DEBUG HTTP ${verb.toUpperCase()}] ----------------`);
      console.log(`[请求 URL]: ${options.url}`);
      console.log(`[请求 Headers]: ${JSON.stringify(options.headers, null, 2)}`);
      if (options.body) console.log(`[请求 Body]: ${options.body}`);
    }

    const res = await new Promise((resolve) => {
      const httpFunc = verb === 'post' ? $.post.bind($) : $.get.bind($);
      httpFunc(options, (err, resp, data) => resolve({ err, resp, data }));
    });

    const status = res.resp ? (res.resp.status || res.resp.statusCode) : '无状态码';

    if (debug) {
      console.log(`[HTTP 状态码]: ${status}`);
      if (res.err) console.log(`[请求 异常]:`, res.err);
      console.log(`[返回 Data]: ${res.data ? String(res.data).trim() : '（返回内容为空）'}`);
      console.log(`--------------------------------------------------\n`);
    }

    if (!res.err && res.data) {
      // 拿到响应即返回；业务层再判断 code。仅当响应不是 JSON 时才继续重试。
      if (looksLikeJson(res.data)) return res.data;
      lastReason = '返回内容不是合法 JSON';
    } else if (res.err) {
      lastReason = JSON.stringify(res.err);
    } else {
      lastReason = 'data 为空';
    }

    if (NO_RETRY_STATUS.includes(Number(status))) {
      console.log(`⚠️ HTTP ${status}（令牌可能已失效），不再重试：${options.url}`);
      return res.data || null;
    }

    console.log(`⚠️ 第 ${attempt} 次请求失败 (${options.url}) | 状态码: ${status} | 原因: ${lastReason}`);

    if (attempt < total) {
      console.log(`等待 ${retryDelay / 1000} 秒后进行第 ${attempt + 1} 次重试...`);
      await sleep(retryDelay);
    }
  }
  return null;
}

function looksLikeJson(data) {
  if (typeof data !== 'string') return false;
  const str = data.trim();
  if (!str.startsWith('{') && !str.startsWith('[')) return false;
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

// 统一构造请求头，消除 info/signin 之间的重复
function buildHeaders(signheaders, extra = {}) {
  return Object.assign({
    'User-Agent': signheaders['User-Agent'] || DEFAULT_UA,
    'Accept': 'application/json, text/plain, */*',
    'Accept-Encoding': 'gzip,compress,br,deflate',
    'X-JLC-ClientType': 'MP-WEIXIN',
    'content-type': 'application/json',
    'X-JLC-AccessToken': signheaders['X-JLC-AccessToken'] || '',
    'X-JLC-MP-AppId': signheaders['X-JLC-MP-AppId'] || '',
    'X-JLC-MP-Env': 'release',
    'secretkey': signheaders['secretkey'] || '',
    'X-JLC-MP-Version': MP_VERSION,
    'Referer': REFERER
  }, extra);
}

function requestJLC(url, signheaders, extraHeaders) {
  return httpRequestWithRetry({
    url,
    headers: buildHeaders(signheaders, extraHeaders),
    body: ''
  }, 'get');
}
function parseAccount(accStr) {
  if (accStr.startsWith('{')) {
    let obj;
    try {
      obj = JSON.parse(accStr);
    } catch (e) {
      throw new Error('JSON 格式解析失败，请检查抓包内容是否完整');
    }
    const headers = obj.headers || {};
    if (!headers['X-JLC-AccessToken']) {
      throw new Error('缺少 X-JLC-AccessToken，请重新抓包或改用简写格式');
    }
    return { headers, body: obj.body || '' };
  }

  const arr = accStr.split('&');
  const headers = {
    'X-JLC-AccessToken': arr[0] ? arr[0].trim() : '',
    'X-JLC-MP-AppId': arr[1] ? arr[1].trim() : '',
    'secretkey': arr[2] ? arr[2].trim() : '',
    'User-Agent': arr[3] ? arr[3].trim() : ''
  };
  if (!headers['X-JLC-AccessToken']) {
    throw new Error('简写格式缺少 AccessToken（格式：AccessToken&AppId&secretkey&UA）');
  }
  return { headers, body: '' };
}
// 去重键：两种格式都优先用令牌，抓包格式补上 Cookie 兜底
function accountKey(accountData) {
  const h = accountData.headers || {};
  return h['X-JLC-AccessToken'] || h['Cookie'] || '';
}

if (isGetCookie) {
  !(async () => {
    const session = {
      url: $request.url,
      body: $request.body,
      headers: $request.headers
    };
    if (debug) {
      console.log(`[抓包] ${session.url} | AccessToken: ${maskToken((session.headers || {})['X-JLC-AccessToken'])}`);
    }

    const sessionStr = JSON.stringify(session);
    const savedData = $.getdata(SIGN_KEY_JLC) || '';
    const newKey = accountKey(session);

    if (!savedData) {
      $.setdata(sessionStr, SIGN_KEY_JLC);
      $.subt = `获取会话成功：已保存第 1 个账号!`;
    } else {
      const accounts = savedData.split('@').filter((item) => item.trim() !== '');
      let updated = false;

      if (newKey) {
        for (let i = 0; i < accounts.length; i++) {
          let acc = null;
          try {
            acc = parseAccount(accounts[i].trim());
          } catch (e) {
            acc = null;
          }
          if (acc && accountKey(acc) === newKey) {
            accounts[i] = sessionStr;
            updated = true;
            $.subt = `获取会话成功：已更新第 ${i + 1} 个账号!`;
            break;
          }
        }
      }
      if (!updated && session.headers && session.headers['Cookie']) {
        for (let i = 0; i < accounts.length; i++) {
          try {
            const acc = JSON.parse(accounts[i]);
            if (acc.headers && acc.headers['Cookie'] === session.headers['Cookie']) {
              accounts[i] = sessionStr;
              updated = true;
              $.subt = `获取会话成功：已更新第 ${i + 1} 个账号!`;
              break;
            }
          } catch (e) { /* 非 JSON 账号，跳过 */ }
        }
      }

      if (!updated) {
        accounts.push(sessionStr);
        $.subt = `获取会话成功：已追加第 ${accounts.length} 个账号!`;
      }
      $.setdata(accounts.join('@'), SIGN_KEY_JLC);
    }

    console.log($.subt);
    $.msg($.name, $.subt, '可在 BoxJS 中查看/编辑 JLCCookie 变量');
  })()
    .catch((e) => $.logErr(e))
    .finally(() => $.done());
} else {
  !(async () => {
    const envCookie = ($.isNode() && typeof process !== 'undefined' && process.env)
      ? process.env.JLCCookie
      : '';
    const rawCookies = envCookie || $.getdata(SIGN_KEY_JLC);

    if (!rawCookies) {
      const text = '未检测到 Cookie，请先获取 Cookie！';
      console.log(text);
      $.msg($.name, text);
      return;
    }

    const accountList = rawCookies.split('@').filter((item) => item.trim() !== '');
    console.log(`共检测到 ${accountList.length} 个账号，准备开始执行签到...`);

    const results = [];

    for (let index = 0; index < accountList.length; index++) {
      const label = `第 ${index + 1}/${accountList.length} 个账号`;
      console.log(`\n============== 开始执行 ${label} ==============`);

      let accountData = null;
      try {
        accountData = parseAccount(accountList[index].trim());
      } catch (e) {
        const text = `账号【${label}】数据解析失败：${e.message || e}`;
        console.log(text);
        msg += `❌ ${text}\n`;
        results.push({ index, name: label, status: 'error', detail: e.message || String(e) });
        continue;
      }

      const waitMs = randomDelayMs();
      console.log(`等待 ${waitMs / 1000} 秒后执行...`);
      await sleep(waitMs);

      const userState = { name: '', point: 0, points: 0, signed: false };
      try {
        await info(accountData, userState);
        await sleep(500);
        await signin(accountData, userState);
        results.push({
          index,
          name: userState.name || label,
          status: userState.signed ? 'signed' : 'done',
          detail: userState.detail || ''
        });
      } catch (e) {
        const text = `账号【${userState.name || label}】执行异常：${e.message || e}`;
        console.log(text);
        msg += `❌ ${text}\n`;
        results.push({ index, name: userState.name || label, status: 'error', detail: e.message || String(e) });
      }
    }

    await SendMsg(buildSummary(results, msg));
  })()
    .catch((e) => $.logErr(e))
    .finally(() => $.done());
}
function buildSummary(results, detailMsg) {
  if (!results.length) return detailMsg || '';
  const lines = ['📋 签到结果'];
  for (const r of results) {
    let icon = '❔';
    if (r.status === 'done') icon = '✅';
    else if (r.status === 'signed') icon = '🆗';
    else if (r.status === 'error') icon = '❌';
    lines.push(`${icon} ${r.name}${r.detail ? ` | ${r.detail}` : ''}`);
  }
  const extra = String(detailMsg || '').trim();
  if (extra) lines.push('', '🔍 明细', extra.trim());
  return lines.join('\n');
}

async function info(accountData, userState) {
  const signheaders = accountData.headers || {};
  const data = await requestJLC(API_ASSETS, signheaders);

  if (!data) {
    console.log('账号积分查询失败：多次重试仍未返回数据，请检查网络或 Cookie 配置');
    if (Diagnostics) msg += `🔍 [积分查询] 接口多次请求未返回数据\n`;
    return;
  }

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    console.log('info 解析报错:', e);
    if (Diagnostics) msg += `🔍 [积分查询] 返回内容解析失败\n`;
    return;
  }

  if (result.code == 200 && result.data) {
    userState.name = result.data.customerCode || userState.name;
    userState.point = Number(result.data.integralVoucher) || 0;
    userState.points = userState.point;
    const text = `账号【${userState.name}】积分查询成功！当前积分：${userState.point}`;
    console.log(text);
    msg += `${text}\n`;
  } else {
    const text = `账号【${userState.name || '未知'}】积分查询失败：${result.message || '未知错误'}`;
    console.log(text);
    msg += `❌ ${text}\n`;
  }
}

async function signin(accountData, userState) {
  const signheaders = accountData.headers || {};
  const data = await requestJLC(API_SIGNIN, signheaders);

  if (!data) {
    console.log('账号签到失败：多次重试仍未返回数据，请检查网络或 Cookie 配置');
    if (Diagnostics) msg += `🔍 [签到] 接口多次请求未返回数据\n`;
    userState.detail = '请求未返回数据';
    return;
  }

  let result;
  try {
    result = JSON.parse(data);
  } catch (e) {
    console.log('signin 解析报错:', e);
    if (Diagnostics) msg += `🔍 [签到] 返回内容解析失败\n`;
    userState.detail = '返回内容解析失败';
    return;
  }

  const message = String(result.message || '');
  const gainNum = Number(result.data && result.data.gainNum);
  const alreadySigned = /已签|重复|已经/.test(message);

  if (alreadySigned) {
    const text = `账号【${userState.name}】今日已签到${message ? `：${message}` : ''} 总积分：${userState.point}`;
    console.log(text);
    msg += `🆗 ${text}\n`;
    userState.signed = true;
    userState.detail = `已签到 | 总积分 ${userState.point}`;
    return;
  }

  if (result.code == 200) {
    const gained = Number.isFinite(gainNum) ? gainNum : 0;
    userState.points = gained + (Number(userState.point) || 0);
    const text = `账号【${userState.name}】签到成功${message ? `：${message}` : ''}！获得积分：${gained}！总积分：${userState.points}`;
    console.log(text);
    msg += `✅ ${text}\n`;
    userState.detail = `+${gained} | 总积分 ${userState.points}`;
  } else {
    const text = `账号【${userState.name}】签到失败：${message || '未知错误'} 总积分：${userState.point}`;
    console.log(text);
    msg += `❌ ${text}\n`;
    userState.detail = `失败：${message || '未知错误'}`;
  }
}
async function SendMsg(message) {
  if (!message) return;
  if (Notify > 0) {
    if ($.isNode()) {
      let notify = null;
      try {
        notify = require('./sendNotify');
      } catch (e) {
        console.log('未找到 sendNotify 模块，改为控制台输出通知内容');
      }
      if (notify && typeof notify.sendNotify === 'function') {
        try {
          await notify.sendNotify($.name, message);
        } catch (e) {
          console.log('通知发送失败，改为控制台输出：', e.message || e);
          console.log(message);
        }
      } else {
        console.log(message);
      }
    } else {
      $.msg($.name, '', message);
    }
  } else {
    console.log(message);
  }
}

// prettier-ignore
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
