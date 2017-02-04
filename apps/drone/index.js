var alexa = require('alexa-app');
var request = require('request');
port = 1535;
var docURL = "http://math.seattleacademy.org:"+port+"cmd=";

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1; //When 0, you need to relaunch the server

// Define an alexa-app

function tellDrone(command){
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
}
var app = new alexa.app('drone');
app.launch(function(req, res) {
    
    res.say("Give the drone a command like take off, land, or flip");
});
app.intent('CommandIntent', {
    "slots": { "COMMAND": "LITERAL" },
    "utterances": ["{land|flip|COMMAND}}"]
}, function(req, res) {
    res.say('You told the drone to ' + req.slot('COMMAND'));
    tellDrone(req.slot('COMMAND'));
});
module.exports = app;