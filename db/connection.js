const Sequelize = require("sequelize");

const sequelize = new Sequelize("social_media_db", 'user', 'pass', { 
	host: 'localhost', 
	dialect: "mysql", 
	// operatorsAliases: false
});

module.exports = sequelize;