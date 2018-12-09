const express = require('express');

const router = express.Router();
const Utils = require('./helpers/utils');
var fs = require('fs');

router.get('/', (req, res, next) => {
	res.json({
		title: 'Sang Sang'
	});
});
router.get('/users', (req, res, next) => {
	res.json({
		title: 'Users'
	});
});
router.get('/archivetask', (req, res, next) => {
	res.json({
		title: 'archivetask'
	});
});
router.get('/settings', (req, res, next) => {
	res.json({
		title: 'settings'
	});
});

router.get('/products', (req, res, next) => {
	var obj;
	fs.readFile('./db/products.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		res.json(obj); // Dòng này chỉ bật khi viết API
	});
});

router.get('/product/:id', (req, res, next) => {
	var obj;
	fs.readFile('./db/products.json', 'utf8', function (err, data) {
		if (err) throw err;
		obj = JSON.parse(data);
		var filtered = obj.lists.filter(function (e) {
			return e.id == req.params.id;
		});
		let newjSON = {
			data: filtered[0]
		}
		res.json(newjSON); // Dòng này chỉ bật khi viết API
	});
});

module.exports = router;
