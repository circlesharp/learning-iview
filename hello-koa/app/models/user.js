const bcrypt = require('bcryptjs');
const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../../core/db');

class User extends Model {
	static async verifyEmailPassword(email, plainPassword) {
		const user = await User.findOne({
			where: { email },
		});
		if (!user) {
			throw new global.$errs.AuthFailed('账号不存在');
		}

		const correct = bcrypt.compareSync(plainPassword, user.password);
		if (!correct) {
			throw new global.$errs.AuthFailed('密码不正确');
		}

		return user;
	}

	static async getUserByOpenid(openid) {
		const user = await User.findOne({
			where: { openid },
		});
		return user;
	}
	static async registerByOpenid(openid) {
		const user = await User.create({ openid });
		return user;
	}
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
