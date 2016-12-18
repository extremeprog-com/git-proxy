const REPOS_PATH = 'tmp/repos';

const pushover   = require('pushover');
const repos      = pushover(REPOS_PATH);
const http       = require('http');
const exec       = require('child_process').exec;
const fs         = require('fs');
const path       = require('path');

var key_filename = '/root/.ssh/id_rsa';

var locked = {};

function lock(key, real_action, continue_action) {

    function remove_lock(result) {
        if(!locked[key]) return;
        locked[key].map(function(cb){try{cb(result)}catch(e){console.error(e)}});
        delete locked[key];
    }

    if(!locked[key]) {
        setTimeout(function() { remove_lock(null); }, 10000);
        locked[key] = [continue_action];
        real_action(remove_lock)
    } else {
        locked[key].push(continue_action);
    }
}

if (fs.existsSync(key_filename)) {
    console.log('The file with a private key already exists.');
} else {
    var dirname = path.dirname(key_filename);

    if (!fs.existsSync(dirname)) {
        exec('mkdir -p ' + dirname +
            '; echo "$PRIVATE_KEY" > ' + key_filename +
            '; (echo "Host *"; echo "StrictHostKeyChecking no") > ' + dirname + '/config' +
            '; chmod 600 ' + key_filename +
            '; chmod 400 ' + dirname + '/config' +
            '; chmod 700 ' + dirname
        );
    }
}

repos.on('info', function(info) {

    lock(
        info.repo,
        function(cb) {
            exec(info.exists
                    ? 'cd ' + info.cwd + '; git fetch --all -p'
                    : 'git clone --mirror ' + info.repo + ' ' + info.cwd,
                cb)
        },
        function(err) {
            if (!err) {
                info.accept();
            } else {
                info.reject();
            }
        }
    )
});

var server = http.createServer(function (req, res) {
    if(req.url.match(/\.git$/)) {
        res.statusCode = 200;
        res.end('ok');
    } else {
        repos.handle(req, res);
    }
});

server.listen(process.env.PORT || 8080);
