const express = require('express');
const router = express.Router();
const md5 = require('md5');
var fs = require('fs');

router.post('/' , (req, res, next) => {

	var obj;
	fs.readFile('./db/users.json', 'utf8' , function(err , data){
		if (err) throw err;
		obj = JSON.parse(data)
		let username = req.body.usersname;
		let password = md5(req.body.password);
		let flag = 0
		for (let key in obj) {
			if (obj.hasOwnProperty(key)) {
				let objUsers = obj[key].username
				let objPassword = obj[key].password
				if (objUsers === username) {
					if (objPassword === password) {
						flag = 1;
						break;
					} else {
						flag = 2;
					}
				} else {
					flag = 3;
				}
			}
		}

		flag === 1 ? res.redirect('/') : res.redirect('/login')
		
	})
})

module.exports = router;