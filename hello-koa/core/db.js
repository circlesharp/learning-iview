const Sequelize = require('sequelize');

const {
	dbName,
	host,
	port,
	user,
	password,
} = global.$config.database;

const sequelize = new Sequelize(dbName, user, password, {
	dialect: 'mysql', // dialect 方言 土话
	host,
	port,
	logging: i => i, // log 操作的 sql
	timezone: '+08:00',
	define: {
		// create_time, update_time, deleted_time, 软删除
		timestamps: true,
		paranoid: true,

		// 驼峰 -> 下划线
		underscored: true,
		// createAt: 'create_at',
		// updateAt: 'update_at',
		// deletedAt: 'deleted_at',
	},
});

// 自动将模型创建到数据库 千万不要将 force 设置为 true
sequelize.sync();

module.exports = { sequelize };
