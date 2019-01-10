var express = require('express');
var bodyParser = require('body-parser');
const cors = require('cors');
const {exec} = require('child_process');

var app = express();
app.use(bodyParser.json());

var whitelist = ['https://prettycurl.sanbaofengs.com', 'http://local-pretty-curl.sanbaofengs.com'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));

app.get('/test', function (req, res) {
    res.json({
        code: 0,
        message: 'running',
        data: {
            status: 1
        }
    });
});

app.get('/hello-world', function (req, res) {
    res.json({
        code: 0,
        message: 'success',
      data: JSON.stringify({
        code: 0,
        message: 'success',
        data: {
          foo: 'hell world~'
        }
      })
    });
});

app.post('/pretty-curl', function (req, res) {
    if (!req.body) return res.sendStatus(400);
    const curlStr = req.body.curlStr;
    if (!curlStr) return res.sendStatus(400);
    exec(curlStr, (err, curlRes) => {
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
