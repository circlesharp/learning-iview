const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../../core/db');
const { Art } = require('./art');

class Favor extends Model {
	static async like(artId, type, uid) {
		const favor = await Favor.findOne({
			where: { artId, type, uid }
		});
		if (favor) {
			throw new global.$errs.LikeError();
		}

		/* 事务 */
		sequelize.transaction(async transaction => {
			/* 任务 1: Favor 表增加记录 */
			await Favor.create({ artId, type, uid }, { transaction });

			/* 任务 2: 在 Classic 表中 favNums 字段加一 */
			const art = await Art.getData(artId, type);
			art.increment('favNums', { by: 1, transaction });
		});
	}

	// static async dislike(artId, type, uid) {
	// 	//
	// }
}

Favor.init(
	{
		uid: Sequelize.INTEGER,
		artId: Sequelize.INTEGER,
		type: Sequelize.INTEGER,
	},
	{
		sequelize,
		tableName: 'favor',
	},
);

module.exports = { Favor };
