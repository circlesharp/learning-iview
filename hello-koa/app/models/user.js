const bcrypt = require('bcryptjs');
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../../core/db');

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
		email: {
			type: Sequelize.STRING(128),
			unique: true, // 唯一
		},
		password: {
			// 观察者模式 Reflect
			type: Sequelize.STRING,
			set(val) {
				const salt = bcrypt.genSaltSync(2);
				const pwd = bcrypt.hashSync(val, salt);
				this.setDataValue('password', pwd);
			}
		},
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

module.exports = { User };
