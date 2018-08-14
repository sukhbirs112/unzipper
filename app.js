var fs = require('fs');
var extract = require('extract-zip');

/*
This app monitors a folder and unzips all zipped folders that are moved to the
monitored folder
*/


fs.watch(__dirname, { encoding: 'utf8' }, (eventType, filename) => {
    console.log('eventType: ' + eventType);
    console.log('filename: ' + filename);
    console.log("\n\n");
    if (eventType && filename) {
        if (eventType === "rename") {
            if (filename.endsWith('.zip') && fs.existsSync(filename)) {
                console.log('h1');
                extract(filename, { dir: __dirname }, function (err) {
                    // extraction is complete. make sure to handle the err
                });
            }
        }
    }
});