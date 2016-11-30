const pushover  = require('pushover');
const repos     = pushover('tmp/repos');
const http      = require('http');
const exec      = require('child_process').exec;
const fs        = require('fs');
const path      = require('path');

var key_filename = '/root/.ssh/id_rsa';

if (fs.existsSync(key_filename)) {
    console.log('The file with a private key already exists.');
} else {
    var dirname = path.dirname(key_filename);

    if (!fs.existsSync(dirname)) {
        exec('mkdir -p ' + dirname +
            '; chmod 700 ' + dirname + ' echo $PRIVATE_KEY > ' + key_filename +
            '; chmod 600 ' + key_filename +
            '; echo StrictHostKeyChecking no > ' + dirname + 'config'
        );
    }
}

repos.on('info', function(info) {
    exec(info.exists
        ? 'cd ' + info.cwd + '; git fetch -p'
        : 'git clone --bare ' + info.repo + ' ' + info.cwd, function(err) {
        if (!err) {
            info.accept();
        } else {
            info.reject();
        }
    })
});

var server = http.createServer(function (req, res) {
    repos.handle(req, res);
});

server.listen(process.env.PORT || 8080);