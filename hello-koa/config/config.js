module.exports = {
	// environment: 'prod',
	environment: 'dev',
	database: {
		dbName: 'koa_island',
		host: 'localhost',
		port: 3306,
		user: 'trz',
		password: '123',
	},
	security: {
		secretKey: 'I_am_a_f**king_secret_key',
		expiresIn: 60 * 60 * 24 * 31, // 1个月
		// expiresIn: 10, // 10秒
	},
};
