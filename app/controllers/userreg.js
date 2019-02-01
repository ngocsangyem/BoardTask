const express = require('express');
const router = express.Router();

var mysql = require('mysql');
var multer = require('multer');
var User = require("../models/user.model")
var bcrypt = require("bcrypt")
var crypto = require("crypto")
var con = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
	database: 'demo_1'
})


console.log('1223444');

router.post('/' , upload.array('file', 12), (req, res, next) => {
	let username = req.body.username;
	// let  id = req.body.username;
	let password = req.body.password;
	let ava = req.body.file;
	let sql = 'INSERT INTO `Users`(`id`,`name`,`password`,`image`) VALUES (null , "' + username + '" , "' + password + '" , "' + ava + '")';
	con.connect()
	// console.log('Oke');

	con.query(sql, function (err, result) {
		console.log(result);
		var storage = multer.diskStorage({
			destination: function (req, file, cb) {
				cb(null, '../../public/upload')
			},
			filename: function (req, file, cb) {
				cb(null, file.fieldname + '-' + Date.now())
			}
		})

		var upload = multer({
			storage: Storage
		}).array(
			"file",
			10
		);
	})
	res.redirect('/database')
})

module.exports = router;
