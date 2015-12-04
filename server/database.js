var pg = require('pg');
var Sequelize = require('sequelize');

// var connectionString = process.env.DATABASE_URL || 'postgres://localhost/instacollection';

if(process.env.DATABASE_URLL) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',

    pool:{
      max: 5,
      min: 0,
      idle: 10000
    }
  });

} else {
	var sequelize = new Sequelize('instacollection', 'postgres', '', {
		host: 'localhost',
		dialect: 'postgres',

		pool:{
		  max: 5,
		  min: 0,
		  idle: 10000
		}
	})
}


var User = sequelize.define('users', {
  username: {type: Sequelize.STRING, unique: true, allowNull: false},
  password: {type: Sequelize.STRING},
});

var pixInfo = sequelize.define('pictures', {
	imgurl: Sequelize.TEXT,
	username: Sequelize.STRING,
	link: Sequelize.STRING,
	uploader: Sequelize.STRING
});

global.db = {
	Sequelize: Sequelize,
	sequelize: sequelize,
	User: User,
	pixInfo: pixInfo
}

User.hasMany(pixInfo);
pixInfo.belongsTo(User);

exports.User = User;
exports.pixInfo = pixInfo;
module.exports = global.db;