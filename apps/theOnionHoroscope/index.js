var alexa = require('alexa-app');
var Xray = require('x-ray');
var x = Xray();

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1; //When 0, you need to relaunch the server


function getSign(req, res, cmd){

    function getArticle(err, result) {
        console.log("cmd", cmd, "result", result)
        res.say(result);
        res.send();
    }
    x('http://www.theonion.com/features/horoscope', '.astro-' + cmd)(getArticle);

    
}

// Define an alexa-app
var app = new alexa.app('theOnionHoroscope');
app.launch(function(req, res) {
    
    res.say("What is your sign?");
    res.shouldEndSession(false);
});
app.intent('CommandIntent', {
    "slots": { "COMMAND": "LITERAL" },
    "utterances": ["{hello|goodbye|COMMAND}}"]
}, function(req, res) {
    res.say('You Said ' + req.slot('COMMAND'));
    getSign(req,res,req.slot("COMMAND"));
    return false;
});
module.exports = app;
