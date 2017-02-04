var alexa = require('alexa-app');
var gsjson = require('google-spreadsheet-to-json');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

// Define an alexa-app
var app = new alexa.app('keyvalue');

function sayCell(req, res, com) {
    gsjson({
            //this is adress to a published Google spreadsheet labeled with A1 'key' B1 'value'
            //with collumns below
            spreadsheetId: '1bU7pdEcJtwOw_EkPW2Aigbw0hIvwLdCd2tvgYeSGvF8',
            

            // other options...
        })
        .then(function(result) {
            
            console.log(result.length, "command", com, "result", result);
            var sayThis =  "the key " + com + " was not found";

            for(i=0;i<result.length;i++){
                console.log("com", com, "key", result[i].key)
                if(result[i].key == com){
                    sayThis = "the value for the key " + com + " is equal to " + result[i].value;
                    break;  
                }
            }
            
            res.say(sayThis);
            res.send();
        })
        .catch(function(err) {
            
            console.log("error", err.message);
            res.say("There was a sheet error " + err.message);
            res.send();

        });
}

app.launch(function(req, res) {
    res.shouldEndSession(false);
    
    res.say("Say which key you need the value for");
    return true;
});
app.intent('Keyintent', {
    "slots": {
        "KEY": "LITERAL"
    },
    "utterances": ["{beta|gamma|delta|KEY}"]
}, function(req, res) {
    console.log("command:", req.slot("KEY"));
    var com = req.slot("KEY");
  
    sayCell(req, res, com);
    return false;
});
module.exports = app;
