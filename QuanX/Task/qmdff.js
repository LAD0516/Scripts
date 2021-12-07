
/*
下载地址：
http://fhnc-ii-share.xlzxtj.cn/fhnc_ii/share/html/download_share.html?invitation=14659726
Tg群 t.me/ningmengwj
注意 需要屏蔽越狱 不然黑号/黑号了不要换小号 不然跟着黑

获取数据方法：
随便种个什么然后点钻石加速收取了

由于我已经黑了 无法看广告领取那些
所以只写了每天领红包和刷钻石

如果提示没有了手动种植一下 如果还是没有 那么今天已经上限了

【黑号专用】别管有没有广告 挂着刷着就行了

[rewrite_local]
https://fhnc-ii-game.lw0591.com/ws\Sparam=\S+UserID\S+TokenID\S+MsgID\S+Type\S+Diamonds\S+ url script-request-header http://nm66.top/qmdff.js

hostname = *.lw0591.com
*/

// [task_local]
// */1 * * * * http://nm66.top/qmdff.js, tag=柠檬全民大丰收, img-url=http://nm66.top/1.jpg, enabled=true

const qmdff = '全民大丰收'
const $ = Env('全民大丰收')


let status;
status = (status = ($.getval("qmdffstatus") || "1") ) > 1 ? `${status}` : ""; 
qmdffheaderArr = []
qmdffurlArr = []
let qmdffheader = $.getdata('qmdffheader')
let qmdffurl = $.getdata('qmdffurl')
const logs =0;


let isGetCookie = typeof $request !== 'undefined'
if (isGetCookie) {
   GetCookie();
   $.done()
} 
qmdffurlArr.push($.getdata('qmdffurl'))
qmdffheaderArr.push($.getdata('qmdffheader'))
    let qmdffcount = ($.getval('qmdffcount') || '1');
  for (let i = 2; i <= qmdffcount; i++) {
    qmdffheaderArr.push($.getdata(`qmdffheader${i}`))
qmdffurlArr.push($.getdata(`qmdffurl${i}`))
  }
!(async () => {
if (!qmdffheaderArr[0]) {
    $.msg($.name, '【提示】请先获取数据 随便种个什么然后点钻石加速收取了')
    return;
  }
   console.log(`------------- 共${qmdffheaderArr.length}账号----------------\n`)
  for (let i = 0; i < qmdffheaderArr.length; i++) {
    if (qmdffheaderArr[i]) {
      message = ''
      qmdffheader = qmdffheaderArr[i];
      qmdffurl = qmdffurlArr[i];
      $.index = i + 1;
      console.log(`\n开始【全民大丰收${$.index}】`)
     
       await hb1()
       await hb2()
       await hb3()
       await zs()
       
  }
 }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())
    
    
function GetCookie() {
if($request&&$request.url.indexOf("UserID")>=0) {
   const qmdffurl = JSON.stringify($request.url)
   const qmdffheader = JSON.stringify($request.headers)
if(qmdffurl)    $.setdata(qmdffurl,`qmdffurl${status}`)
    if(qmdffheader)    $.setdata(qmdffheader,`qmdffheader${status}`)
    $.log(`[${qmdff}] 获取请求: 成功,qmdffheader: ${qmdffurl}`)
$.log(`[${qmdff}] 获取: 成功: ${qmdffurl}`)
    $.msg(`全民大丰收${status}: 成功`, ``)
}
}



//红包1
async function hb1(){
 return new Promise((resolve) => {

    user = qmdffurl.match(/serID%22%3A(\d+)%2C%22T/)[1]
    token = qmdffurl.match(/TokenID%22%3A(\d+)%/)[1]

    let plant6_url = {
     url: `https://fhnc-ii-game.lw0591.com/ws?param=%7B%22UserID%22%3A`+user+`%2C%22TokenID%22%3A`+token+`%2C%22MsgID%22%3A2001%2C%22Type%22%3A6%7D`,
        
        
    }
   $.get(plant6_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.MsgID == 2001)
          $.log("刷红包 "+result.RedMoney+"\n如果不加了手动去种植一个然后收取了")
    
       if(result.ErrCode == 2103)
          
          $.log("小伙子 今天红包刷完了或者手动去种植一个然后收取了"+result.RedMoney)
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
async function hb2(){
 return new Promise((resolve) => {

   

    let plant6_url = {
     url: `https://fhnc-ii-game.lw0591.com/ws?param=%7B%22UserID%22%3A`+user+`%2C%22TokenID%22%3A`+token+`%2C%22MsgID%22%3A2001%2C%22Type%22%3A5%7D`,
        
        
    }
   $.get(plant6_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
   if(result.MsgID == 2001)
          $.log("刷红包 "+result.RedMoney+"\n如果不加了手动去种植一个然后收取了")
    
       if(result.ErrCode == 2103)
          
          $.log("小伙子 今天红包刷完了或者手动去种植一个然后收取了"+result.RedMoney)
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  async function hb3(){
 return new Promise((resolve) => {

   

    let plant6_url = {
     url: `https://fhnc-ii-game.lw0591.com/ws?param=%7B%22UserID%22%3A`+user+`%2C%22TokenID%22%3A`+token+`%2C%22MsgID%22%3A2001%2C%22Type%22%3A7%7D`,
        
        
    }
   $.get(plant6_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
  if(result.MsgID == 2001)
          $.log("刷红包 "+result.RedMoney+"\n如果不加了手动去种植一个然后收取了")
    
       if(result.ErrCode == 2103)
          
          $.log("小伙子 今天红包刷完了或者手动去种植一个然后收取了"+result.RedMoney)
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
  //钻石
    async function zs(){
 return new Promise((resolve) => {

    let plant6_url = {
     url: `https://fhnc-ii-game.lw0591.com/ws?param=%7B%22UserID%22%3A`+user+`%2C%22TokenID%22%3A`+token+`%2C%22MsgID%22%3A2003%2C%22Type%22%3A6%2C%22Diamonds%22%3A100%7D`,
        
        
    }
   $.get(plant6_url,async(error, response, data) =>{
    try{
        const result = JSON.parse(data)
        if(logs)$.log(data)
        if(result.ErrCode == 2103)
          $.log("小伙子 今天钻石刷完了")
         
        if(result.MsgID == 2003)
          $.log("小伙子 刷100钻石成功")
          
        }catch(e) {
          $.logErr(e, response);
      } finally {
        resolve();
      } 
    })
   })
  }
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
