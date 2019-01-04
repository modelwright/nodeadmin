var client = null;
var mysql = require('mysql');

exports.connect = function (host, dbName, user, pass) {
    client = mysql.createPool({
        connectionLimit : 5,
        host: host,
        user: user,
        password: pass,
        database: dbName
    });
    //client.connect();
    return client;
};

// module.exports = {
//     mysql: {
//         host: '127.0.0.1',
//         user: 'root',
//         password: '',
//         database:'cms', // 前面建的user表位于这个数据库中
//         port: 3306
//     }
// }