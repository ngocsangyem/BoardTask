const express = require('express');

const router = express.Router();

var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'root',
	socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock',
	database: 'demo_1'
})

router.get('/', (req, res, next) => {
	let obj = req.body;
	console.log(obj);
	connection.connect()
	// console.log('Done')
	let sql = 'SELECT * FROM `Users` ORDER BY id';
	// let sql = "INSERT INTO `Users` (`id`,`name`,`password`) VALUES (null , 'Sang','123')"
	connection.query(sql, function (err, result) {
		// console.log(result);
		res.render('database', {
			title: 'Users',
			data: result
		})
	})
	connection.end();
})

module.exports = router;
