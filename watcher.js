const chokidar = require('chokidar');
const path = require('path');
const fs = require('fs-extra');

let source = path.resolve( __dirname, 'src');
let destination = path.resolve( __dirname, 'example/src');


// One-liner for current directory, ignores .dotfiles
chokidar.watch('.', {ignored: /(^|[\/\\])\..|node_modules|.git|example|docs|watcher.js|README.md|package.json|yarn.lock/}).on('all', (event, path) => {
  fs.copy(source, destination)
    .then()
    .catch( err => {
    })
});
