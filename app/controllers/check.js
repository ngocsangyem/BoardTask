const express = require('express');
const router = express.Router();
const md5 = require('md5');
var fs = require('fs');

router.post('/' , (req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE');
	res.header('Access-Control-Allow-Headers', 'Content-Type');
	
	console.log(res.body);
	
	var obj;
	fs.readFile('./db/users.json', 'utf8' , function(err , data){
		if (err) throw err;
		obj = JSON.parse(data)

		console.log(req.body);
		
		let username = req.body.usersname;
		// let password = md5(req.body.password);
		let flag = 0;
		let datatmp = {};
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				let objUsers = obj[key].username
				// let objPassword = obj[key].password
				let objDes = obj[key].des
				if (objUsers === username) {
					if (objPassword === password) {
						flag = 1;
						datatmp = {
							username : objUsers,
							// password: objPassword,
							description: objDes,
							messages: 'Login success'
						}
						break;
					} else {
						flag = 2;
					}
				} else {
					flag = 3;
				}
			}
		}

		flag === 1 ? res.json({status: 200 , data: datatmp}) : res.json({status: 404 , data: datatmp})
		
	})
})

module.exports = router;