var db = require('./db').connect('127.0.0.1', 'nodesql', 'root', '123456');

exports.index = function (sql, callback) {
    callback = callback || function(){};
    db.query(sql, function (err, result) {
        if (err === null) {
            if (isEmptyObject(result)) {
                result = [];
            }
            callback(result);
        }
    });
}

function isEmptyObject(obj) {
    for (var key in obj) {
        return false;
    }
    return true;
}