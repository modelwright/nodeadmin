'use strict';

module.exports = {
	port: parseInt(process.env.PORT, 10) || 8001,
	// url: 'mongodb://localhost:27017/elm',
	session: {
		name: 'SID',
		secret: 'SID',
		cookie: {
			httpOnly: true,
	    secure:   false,
	    maxAge:   365 * 24 * 60 * 60 * 1000,
		}
	},
	mysql: {
        host: '127.0.0.1',
        user: 'root',
        password: '123456',
        database:'nodesql', // 前面建的user表位于这个数据库中
        port: 3306
    }
}