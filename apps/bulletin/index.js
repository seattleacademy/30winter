var alexa = require('alexa-app');
var request = require('request');
var docURL = "https://docs.google.com/document/export?format=txt&id=";

var docId = "1NWsJGeDsZ_uRsHKUJYRjbKB-gTLW-9gygEPNjmm6DHA";
// Allow this module to be reloaded by hotswap when changed
module.change_code = 1; //When 0, you need to relaunch the server

// Define an alexa-app
var app = new alexa.app('bulletin');
app.launch(function(req, res) {
    request(docURL + docId, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            res.card({
                type: "Standard",
                text: body,
            })
            res.say(body).send();
            console.log(body);
        }
        else{
            error = "Error "+ error + " status code " + response.statusCode
            res.say(error).send();
            console.log(error);        }
    })
    return false;
});
app.intent('CommandIntent', {
    "slots": { "COMMAND": "LITERAL" },
    "utterances": ["{hello|goodbye|COMMAND}}"]
}, function(req, res) {
    res.say('You Said ' + req.slot('COMMAND'));
});
module.exports = app;