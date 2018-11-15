var express = require('express');
var socket = require('socket.io');
var app = express();
var server = app.listen(3000, function () {
    console.log("listen to 3000");
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.use(express.static('./')); //!!!!!!!!用他媽的./就好用屁public!
var io = socket(server);


io.on('connection', function (socket) {
    console.log("a script submit");
    socket.on("script", function (script) {
        //從伺服端拿到script的資訊
        //內容有：
        //input: "some input"
        //language: "程式語言"
        //script: "程式碼""
        console.log(script);
        console.log("--------------------");
        sendScriptToApi(script.script, script.input, script.language, socket);

    })

})


var request = require('request');

function heredoc(fn) {
    return fn.toString().split('\n').slice(1, -1).join('\n') + '\n'
}

var sendScriptToApi = function (script, input, language, socket) {

    var program = {
        stdin: input,
        script: script,
        language: language,
        versionIndex: "0",
        clientId: "6bae7e59775c3636b4bf78cdaed7c898",
        clientSecret: "88c23aa459149f14b0bf2b1ee57b834e727f8fd612848c2290a755b83145cde2"
    };


    var answer = {
        error: "",
        statusCode: "",
        body: ""
    }
    request({
            url: 'https://api.jdoodle.com/execute',
            method: "POST",
            json: program
        },
        function (error, response, body) {
            answer.error = error;
            answer.statusCode = response;
            answer.body = body;


            socket.emit('answer', answer);
        });
}