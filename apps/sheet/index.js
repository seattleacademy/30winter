var alexa = require('alexa-app');
var gsjson = require('google-spreadsheet-to-json');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('sheet');

function sayCell(req, res) {
    gsjson({
            spreadsheetId: '1bU7pdEcJtwOw_EkPW2Aigbw0hIvwLdCd2tvgYeSGvF8',
            listOnly: true,
            includeHeader: true,

            // other options...
        })
        .then(function(result) {
            num = res.session('num');
            console.log(num, result.length, "result", result);
            if (num < result.length) {
                res.shouldEndSession(false);
                res.say(num + " is " + result[num][0]);
            } else {
                res.say("You have reached the end of the list");
            }
            res.send();
        })
        .catch(function(err) {
            console.log("error", err.message);
            res.say("There was a sheet error " + err.message);
            res.send();
        });
}

app.launch(function(req, res) {
    res.session('num', 0);
    sayCell(req, res);
    return false;
});
app.intent('CommandIntent', {
    "slots": {
        "COMMAND": "LITERAL"
    },
    "utterances": ["{next|previous|exit|COMMAND}}"]
}, function(req, res) {
    console.log("command:", req.slot("COMMAND"));
    var com = req.slot("COMMAND");
    num = res.session('num');

    if (com == 'next') {
        console.log("next called");
        num = num + 1;
    } else if (com == "previous") {
        num = num - 1;
        console.log("previous called")
    }

    res.session('num', num)
    sayCell(req, res);
    return false;
});
module.exports = app;
