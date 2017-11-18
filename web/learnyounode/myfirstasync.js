/*
var fs = require('fs');
var count = undefined;
var buff = undefined;
var str = undefined;

function add(callback) {
  fs.readFile(process.argv[2], function doneReading(err, fileContents){
  str = fileContents.toString();
  count = str.split('\n');
  callback();
});
}

function logCount() {
  console.log(count.length - 1);
}
add(logCount);
*/
 
var fs = require('fs')
var file = process.argv[2]

fs.readFile(file, function (err, contents) {
  if (err) {
    return console.log(err)
  }
  // fs.readFile(file, 'utf8', callback) can also be used
  var lines = contents.toString().split('\n').length - 1
  console.log(lines)
})
