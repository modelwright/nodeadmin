'use strict';

import formidable from 'formidable'
// import UserInfoModel from '../../models/v2/userInfo'
import adminModel from '../../models/admin/admin'
// import crypto from 'crypto'
// import dtime from 'time-formater'

class User {
	async login(req, res, next){
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if(err){
				res.send({
					status: 0,
					type: 'FORM_DATA_ERROR',
					message: '表单信息错误'
				})
				return
			}
			const {account, password, status = 1} = fields;
			try{
				if (!account) {
					throw new Error('用户名参数错误')
				}else if(!password){
					throw new Error('密码参数错误')
				}
			}catch(err){
				console.log(err.message, err);
				res.send({
					status: 0,
					type: 'GET_ERROR_PARAM',
					message: err.message,
				})
				return
			}
			var arr;
			console.log(req,res)
			adminModel.login(req,res,account,password,function(err,result) {
				arr = JSON.parse(result);
				if(result.length <= 0){
					res.send({
						status: 404,
						data: result,
						message: '账户名或密码错误',
					})
				}else{
					res.send({
						status: 200,
						data: '登录成功',
						message: '',
					})
				}
			});
		})
	}
	async register(req, res, next){
		const form = new formidable.IncomingForm();
		form.parse(req, async (err, fields, files) => {
			if (err) {
				res.send({
					status: 0,
					type: 'FORM_DATA_ERROR',
					message: '表单信息错误'
				})
				return
			}
			const {username, password, status = 1} = fields;
			try{
				if (!username) {
					throw new Error('用户名不能为空')
				}else if(!password){
					throw new Error('密码不能为空')
				}
			}catch(err){
				console.log(err.message, err);
				res.send({
					status: 0,
					type: 'GET_ERROR_PARAM',
					message: err.message,
				})
				return
			}
			try{
				const admin = await AdminModel.findOne({username})
				adminModel.regsUser(req,res,function(err,result) {
					arr =JSON.parse(result);
					res.send({
						status: 200,
						data: arr,
						message: '',
					})
				});
				if (admin) {
					console.log('该用户已经存在');
					res.send({
						status: 0,
						type: 'USER_HAS_EXIST',
						message: '该用户已经存在',
					})
				}else{
					const adminTip = status == 1 ? '管理员' : '超级管理员'
					const admin_id = await this.getId('admin_id');
					const newpassword = this.encryption(password);
					const newAdmin = {
						user_name, 
						password: newpassword, 
						id: admin_id,
						create_time: dtime().format('YYYY-MM-DD'),
						admin: adminTip,
						status,
					}
					await AdminModel.create(newAdmin)
					req.session.admin_id = admin_id;
					res.send({
						status: 1,
						message: '注册管理员成功',
					})
				}
			}catch(err){
				console.log('注册管理员失败', err);
				res.send({
					status: 0,
					type: 'REGISTER_ADMIN_FAILED',
					message: '注册管理员失败',
				})
			}
		})
	}
}

export default new User()