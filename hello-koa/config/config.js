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
	wx: {
		appId: 'wx6dd75fce179d1514',
		appSecret: '82ab403d493ffdb53130f89b7148f870',
		loginUrl: 'https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&js_code=%s&grant_type=authorization_code',
	}
};
