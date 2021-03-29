const { sequelize } = require('../../core/db');

const { Sequelize, Model } = require('sequelize');

class User extends Model {

}

User.init(
	// 参数1 设置各字段
	{
		id: {
			type: Sequelize.INTEGER,
			primaryKey: true, // 设置为主键
			autoIncrement: true, // 自增 也可使用 CUID
		},
		nickname: Sequelize.STRING,
		email: Sequelize.STRING,
		password: Sequelize.STRING,
		openid: {
			type: Sequelize.STRING(64),
			unique: true, // 唯一
		},
	},
	// 参数2
	{
		sequelize,
		tableName: 'user',
	}
);
