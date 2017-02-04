var alexa = require('alexa-app');
var Xray = require('x-ray');
var x = Xray();

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1; //When 0, you need to relaunch the server

// Define an alexa-app
var app = new alexa.app('scrape');
app.launch(function(req, res) {
    function getArticle(err, result) {
        console.log(result)
        res.say(result);
        res.send();
    }
    x('https://news.google.com/', '.esc-lead-snippet-wrapper')(getArticle);

    return false;
});
app.intent('CommandIntent', {
    "slots": { "COMMAND": "LITERAL" },
    "utterances": ["{hello|goodbye|COMMAND}}"]
}, function(req, res) {
    res.say('You Said ' + req.slot('COMMAND'));
});
module.exports = app;
