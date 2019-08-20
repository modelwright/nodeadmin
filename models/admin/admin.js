var mysql = require('mysql');
var dbconfig = require("../../config/default");

//使用连接池
var pool = mysql.createPool(dbconfig.mysql);

module.exports = {
    showUser : function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            //定义查询语句
            var sql = "SELECT * FROM `admin`";
            connection.query(sql,function(err,result) {
                result = JSON.stringify(result);
                callback(err,result);
                // 释放连接
                connection.release();
            })
        });
    },
    regsUser : function(req,res,callback) {
        pool.getConnection(function(err, connection) {
            //定义查询语句
            var sql = "SELECT * FROM `admin`";
            connection.query(sql,function(err,result) {
                result = JSON.stringify(result);
                callback(err,result);
                // 释放连接
                connection.release();
            })
        });
    },
    login :function(req,res,account,password,callback){
        console.log("model层里的",account,password)
        pool.getConnection(function(err, connection) {
            //定义查询语句
            var sql = "select * from admin where account = '"+account+"' and password = '"+password+"'";
            connection.query(sql,function(err,result) {
                result = JSON.stringify(result);
                callback(err,result);
                // 释放连接
                connection.release();
            })
        });
    }
}