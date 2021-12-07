//电视家随机提现

const url = `http://api.gaoqingdianshi.com/api/v2/cash/withdrawal?code=randTx&rs=1LBafGBJ2SFwfxNADSdKO4mZt0JKjf&sign=3ae3805c6ef8f7dd4b2910fe26037873`;
const method = `GET`;
const headers = {
'Accept-Encoding' : `gzip, deflate`,
'AppVerCode' : `243`,
'userid' : `1d8c5d052c5781206299e3e5497d6dbc`,
'language' : `zh_CN`,
'Host' : `api.gaoqingdianshi.com`,
'AppVerName' : `1.98`,
'hwModel' : `iPhone11,8`,
'hwBrand' : `iPhone`,
'countryCode' : ``,
'ssid' : `7d57ca85-cbde-4cc0-9dd5-c8361163a592`,
'Connection' : `keep-alive`,
'uuid' : `88888888888888888888888888888888`,
'Cache-Control' : `no-cache`,
'ispId' : ``,
'Accept-Language' : `zh-Hans;q=1`,
'User-Agent' : `Dsj/Client1.2`,
'MarketChannelName' : `Iphone`,
'hwMac' : ``,
'Generation' : `com.dianshijia.mobile.ios`,
'Accept' : `*/*`,
'Authorization' : `Tm1ObU5XRTFOekJqTkRkaVptSmhPR0ZrWkdKbE1UVmlaREU1WXpWak1qYz18MTYzNTQ3OTI0MzE3NTMyNzYyMHwyY2EzZjYwYjQ0Nzg4NTU0YWVlM2Y0MDc5NzEzNzhlYWE3MDY0NDZk`,
'appId' : `19227f89ea1a166451593601eb8a1b4f`,
'cityCode' : `650100`,
'erid' : `45347`,
'routerMac' : ``,
'ethMac' : ``,
'areaCode' : `650000`,
'cuuid' : `4e3c9eca45368f7cf228f16ace1d212e`,
'gpsCityCode' : ``
};
const body = ``;

const myRequest = {
    url: url,
    method: method,
    headers: headers,
    body: body
};

$task.fetch(myRequest).then(response => {
    console.log(response.statusCode + "\n\n" + response.body);
    $done();
}, reason => {
    console.log(reason.error);
    $done();
});
