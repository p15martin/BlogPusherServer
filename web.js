var express = require('express');
var Pusher = require('node-pusher');

var pusher = new Pusher({
    appId: '12951',
    key: '4e91c8882e4d888bac00',
    secret: '9b92adbf6e2708d18ab6'
});

var channel = 'test_channel';
var event = 'my_event';

var math = {
    add: function(a, b, fn){

        console.log('add');

        var result = a + b;

        var message = a + " + " + b + " = " + result;

        pusher.trigger(channel, event, message, null, function(err, req, res) {
            console.log("pushed");
        });

        fn(null, result);
    },
    sub: function(a, b, fn){
        fn(null, a - b);
    }
};

var date = {
    time: function(fn){
        fn(null, new Date().toUTCString());
    }
};

var port = process.env.PORT || 3000;

express.createServer(
    require('connect-jsonrpc')(math, date)
).listen(port);

console.log('server listening on port ' + port);