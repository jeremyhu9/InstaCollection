var pg = require('pg');
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

if(process.env.DATABASE_URL) {
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
}, {
  // Adds user auth methods
  instanceMethods: {
    authenticate: function(plainTextPwd) {
      return bcrypt.compareSync(plainTextPwd, hash);
    },

    encryptPassword: function(plainTextPwd) {
      var salt = bcrypt.genSaltSync(10);
      return bcrypt.hashSync(plainTextPwd, salt);
    }
  }
});

var pixInfo = sequelize.define('pictures', {
	imgurl: Sequelize.TEXT,
	username: Sequelize.STRING,
	link: Sequelize.STRING,
	uploader: Sequelize.STRING
});

User.beforeCreate(function(user, options){
  var hashedPassword = user.encryptPassword(user.dataValues.password);

  user.dataValues.password = hashedPassword;

  return;
})

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