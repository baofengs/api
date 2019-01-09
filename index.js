var express = require('express');
var bodyParser = require('body-parser');
const { execFileSync, exec, execSync } = require('child_process');

var app = express();
app.use(bodyParser.json());

app.get('/test', function (req, res) {
    res.json({
        code: 0,
        message: 'running',
        data: {
            status: 1
        }
    });
});

app.post('/pretty-curl', function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const curlStr = req.body.curlStr;
    if (!curlStr) return res.sendStatus(400);
    console.log('/pretty-curl: ', req.body, curlStr);
    exec(curlStr, (err, curlRes) => {
        console.log('curlRes: ', curlRes);
        res.json({
            code: 0,
            message: 'success',
            data: curlRes
        });
    });
});

app.listen(1234, function () {
    console.log('app is running on port 1234!');
});
