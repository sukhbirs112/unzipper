var fs = require('fs');
var extract = require('extract-zip');
var path = require('path');

/*
This app monitors a folder and unzips all zipped folders that are moved to the
monitored folder.
The contents are all moved to a destination folder.
I should make a process version so that multiple folders can be monitored and 
*/


var watchers = [];

process.argv.forEach((val, index) => {
  console.log(`${index}: ${val}`);
});



var numPaths = process.argv.length;
if (process.argv[2] === "--rel") {
  var prefix = __dirname;;
  var start = 3;
  var rem = 1;
}
else {
  var prefix = ""
  var start = 2;
  var rem = 0;
}


if (rem === numPaths % 2) {
  console.log("Now Monitoring...");
  for (let i = start; i < numPaths; i += 2) {
    var src = path.join(prefix, process.argv[i]); // path of folder to be monitored
    var dest = path.join(prefix, process.argv[i + 1]); // path of folder to place extracted contents
    watchers.push(fs.watch(src, { encoding: 'utf8' }, (eventType, filename) => {
      if (eventType && filename) {
        if (eventType === "rename") {
          if (filename.endsWith('.zip') && fs.existsSync(src)) {
            extract(path.join(src, filename), { dir: dest }, function (err) {
              // extraction is complete. make sure to handle the err
            });
          }
        }
      }
    }));
    
  }

  watchers.forEach((elm) => {
    console.log(elm);
  });
}


else {
  console.log("Err: Not enought arguments");
}
