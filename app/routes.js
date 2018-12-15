/* eslint-disable global-require, func-names */

module.exports = function (app) {
	app.use('/api/v1', require('./apis'));
	// Trang chủ
	app.use('/', require('./controllers/home'));
	// Trang Users
	app.use('/users', require('./controllers/users'));
	// Trang lưu trữ
	app.use('/archivetask', require('./controllers/archivetask'));
	// Trang cài đặt
	app.use('/settings', require('./controllers/settings'));
	// Trang thêm task
	app.use('/addtask', require('./controllers/addtask'));
	// Trang login
	app.use('/login', require('./controllers/login'));
	// Trang check
	app.use('/check', require('./controllers/check'));
	// Trang DS SP
	app.use('/products', require('./controllers/products'));
	// Trang SP Chi tiết
	app.use('/details', require('./controllers/products-details'));
};
