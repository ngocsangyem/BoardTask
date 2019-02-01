var mysql = require('mysql');
var Schema = mysql.Schema;

var userSchema = new Schema({
	id: {type: 'increments', nullable: false, primary: true},
	username: {type: 'string', maxlength: 150, nullable: false},
	password: {type: 'integer', maxlength: 150, nullable: false},
	avatar: {type: 'string', maxlength: 200, nullable: false}
})

var User = mysql.model('User', userSchema)

module.exports = User
