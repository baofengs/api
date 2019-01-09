var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
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

var whitelist = ['https://pretty-curl.sanbaofengs.com', 'http://local-pretty-curl.sanbaofengs.com'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.post('/pretty-curl', cors(corsOptions), function (req, res) {
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
