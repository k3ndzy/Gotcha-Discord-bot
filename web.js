var express = require('express');
var request = require('request');
var bodyparser = require('body-parser');
 
var app = express();
app.use(bodyparser.urlencoded({extended: true}));
 
var webhook = "https://discordapp.com/api/webhooks/382325473864318991/B5g2gK8jNQda0nfLYnvzYO1gwpyK_6rQqBKGFcoz9owUN2kpM-L8SEmvnssCLBM4H3yI";
 
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
 
app.post('/359598227336462338', (req, res) => {
    request({
        method: 'POST',
        url: 'https://discordapp.com/api/webhooks/382325473864318991/B5g2gK8jNQda0nfLYnvzYO1gwpyK_6rQqBKGFcoz9owUN2kpM-L8SEmvnssCLBM4H3yI',
        json: {
            "content": req.body.msg,
            "username": "1km/min"
        }
    });
 
    res.redirect('/');
});
 