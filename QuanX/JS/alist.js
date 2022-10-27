var url = $request.url;
var host = $prefs.valueForKey('alist_host') ?? '';

var headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36',
    'Content-Type': 'application/json'
};
var myResponse = {
    status: 'HTTP/1.1 200 OK',
};
var obj = {};

function hexToUtf8(hex) {
return decodeURIComponent('%' + hex.match(/.{1,2}/g).join('%'));
}

if (url.indexOf('/webapi/auth.cgi') != -1) {
    const body = $request.body;
    const host = decodeURIComponent(body.match(/account=([^&]*)/)[1]);
    $prefs.setValueForKey(host, 'alist_host');
    obj = {
        success: true,
        data: {
            sid: ''
        }
    };
    myResponse.body = JSON.stringify(obj);
    $done(myResponse);
} else if (url.indexOf('/webapi/entry.cgi') != -1) {
    const body = $request.body;
    if (typeof(body) === 'string') {
        if (body.indexOf('list_share') != -1 || body.indexOf('method=list') != -1) {
            var path = body.match(/folder_path=([^&]*)/) === null ? "/" : body.match(/folder_path=([^&]*)/)[1];
            path = decodeURIComponent(path);
            const isRootFolder = path === "/";
            const data = {
                page_num: 1,
                page_size: 100,
                password: '',
                path: path
            };
            const req = {
                url:  host + '/api/public/path',
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            };
            $task.fetch(req).then(res => {
                const items = JSON.parse(res.body).data.files;
                const parent = path === "/" ? "": path;
                var files = [];
                items.forEach(function(item) {
                    const file = {
                        isdir: item.type === 1,
                        path: parent + '/' + item.name,
                        name: item.name,
                        additional: {
                            size: item.size
                        }
                    };
                    files.push(file);
                });
                const result = isRootFolder ? {
                    total: 0,
                    offset: 0,
                    shares: files
                } : {
                    total: 0,
                    offset: 0,
                    files: files
                };
                obj = {
                    success: true,
                    data: result
                };
                myResponse.body = JSON.stringify(obj);
                $done(myResponse);
            });
        }
    } else {
        $done();
    }
} else if (url.indexOf('fbdownload') != -1) {
    const hex = url.match(/dlink=%22(.*)%22/)[1];
    const fileid = hexToUtf8(hex);
    console.log(fileid);
    $done({
        status: "HTTP/1.1 302 Found",
        headers: {
            "Location": host + '/d' + fileid
        }
    });
}
