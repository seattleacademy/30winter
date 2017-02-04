var gsjson = require('google-spreadsheet-to-json');

    gsjson({
            spreadsheetId: '1QW5jpQjCORczJNuc5s_CHrqocmY0_pN9FS2AjzOMubQ',
            listOnly:false,
            includeHeader:true,
            beautify:true,
            //vertical:true,
            //listOnly:false,
            // other options...
        })
        .then(function(result) {
            console.log("result", result.length, result[0][0]);
            for (var i = result.length - 1; i >= 0; i--) {
                console.log(i,result[i])
            }
        })
        .catch(function(err) {
            console.log("error", err.message);
        });