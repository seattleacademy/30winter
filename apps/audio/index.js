var alexa = require('alexa-app');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1; //When 0, you need to relaunch the server

// Define an alexa-app
var app = new alexa.app('audio');
app.launch(function(req, res) {
    res.say("Say either hello or goodbye and Alexa will play the mp3 file.");
    res.shouldEndSession(false);

});
app.intent('CommandIntent', {
    "slots": { "COMMAND": "LITERAL" },
    "utterances": ["{say} {hello|goodbye|COMMAND}","{hello|goodbye|COMMAND}"]
}, function(req, res) {
    res.say('You Said ' + req.slot('COMMAND'));
    if (req.slot('COMMAND') == 'hello') {
        res.say("<audio src='https://seattleacademy.software/garyanderson/28winterb/apps/audio/hello.mp3'/>")
    } else
    if (req.slot('COMMAND') == 'goodbye') {
        res.say("<audio src='https://seattleacademy.software/garyanderson/28winterb/apps/audio/goodbye.mp3'/>")
    } else{
    	res.say("Did not find the audio file you said.  Please upload it.")
    }
});
module.exports = app;
