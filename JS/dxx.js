dxx();
function dxx(){
const url = `http://dxx.howtion.cn/api/study`;
const method = `POST`;
const headers = {
'X-Requested-With' : `XMLHttpRequest`,
'Connection' : `keep-alive`,
'Accept-Encoding' : `gzip, deflate`,
'Content-Type' : `application/x-www-form-urlencoded; charset=UTF-8`,
'Origin' : `http://dxx.howtion.cn`,
'User-Agent' : `Mozilla/5.0 (iPhone; CPU iPhone OS 15_0_2 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 MicroMessenger/8.0.16(0x18001042) NetType/4G Language/zh_CN`,
'Cookie' : `XSRF-TOKEN=eyJpdiI6ImRzNFNwMm5IaU9kc1JxaG9Mc1k0OXc9PSIsInZhbHVlIjoiZlFKWlVtYnFrQmR1SnFcL2pUSEJVemJ2anJXdUY2YXRFZWM5NWNqNHVYaFhwc0owNHh3THRmV0VPXC9OXC9LNmZ5cSIsIm1hYyI6ImY3ZTU4OGY4ODcyYjdjMjhkZTg5OTRkMzZkN2E1Y2E5NWU5YTE0ZDJlYmM0ZTc1NWNhMTgwOGRmZmVkYmM0MTQifQ%3D%3D; dxx_session=eyJpdiI6Imh0XC9LNjNxV3ppMjFUQWMzTVcwR1h3PT0iLCJ2YWx1ZSI6IjU5MUg1QlE2VVlFd29lMU1WTnpzSWY4XC93cWZHMTJNWnZpMHlRNFR1RFlTdDhQTUEzK3JDNWxublM5MUEzTVc3IiwibWFjIjoiN2YwYzZlODZkZjM4YTQyMTY0M2ZlM2ZjMWZjZWM1MTZjMzljMTE2YTk3NjlmYzMxNmI3NGM3ZDgxMGZjNDJlNSJ9; zg_85cff599563946b7a8b18d4c3d4a4eab=%7B%22sid%22%3A%201652073427220%2C%22updated%22%3A%201652073427220%2C%22info%22%3A%201652069602856%2C%22superProperty%22%3A%20%22%7B%5C%22Number%5C%22%3A%20%5C%22Year2022_12%5C%22%7D%22%2C%22platform%22%3A%20%22%7B%7D%22%2C%22utm%22%3A%20%22%7B%7D%22%2C%22referrerDomain%22%3A%20%22dxx.howtion.cn%22%2C%22zs%22%3A%200%2C%22sc%22%3A%200%2C%22firstScreen%22%3A%201652073427220%7D; zg_did=%7B%22did%22%3A%20%22180a7059621247-0b5fd90a8825da8-3e230620-5a900-180a7059622c01%22%7D; wdlast=1652073427; CNZZDATA1278610394=439486924-1652061634-%7C1652061634; CNZZDATA1280621303=1628406356-1652065048-%7C1652065048; zycna=pwWYjcNTr10BAXSy6GMME4uQ; opId=eyJpdiI6IjF5Y0ZSNmFiNk5STGloWGhZRks0OWc9PSIsInZhbHVlIjoienFpdXpyOWNhVDExV21PZ1J6aUdJYUdYYW9KdCtEb3ZQMFdEVXBtcXNYRT0iLCJtYWMiOiI5OGY2NzNhMmJkN2ZiNTBkMzlhNTdlMGE5N2UzNThhZGMxNThjNDE1MTkzYjJjYTdmNzFlZjRjMmY5ZWMxYTY0In0%3D; wdcid=4ae8cc7bef3c8b35; UM_distinctid=180a7057fd526-0a5a91332026d98-3e230620-5a900-180a7057fd6864`,
'Host' : `dxx.howtion.cn`,
'Referer' : `http://dxx.howtion.cn/study.html`,
'Accept-Language' : `zh-CN,zh-Hans;q=0.9`,
'Accept' : `application/json, text/javascript, */*; q=0.01`
};
const body = `stutime=77&status=2&lessonid=44&chapterid=93`;

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
});}
