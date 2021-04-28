const { Sequelize, Model, Op } = require('sequelize');
const { sequelize } = require('../../core/db');
const { ArtType } = require('../lib/enum');
const { Art } = require('./art');

class Favor extends Model {
	static async like(artId, type, uid) {
		const favor = await Favor.findOne({
			where: { artId, type, uid }
		});
		if (favor) {
			throw new global.$errs.LikeError();
		}

		/* 点赞事务 */
		return sequelize.transaction(async transaction => {
			/* 任务 1: Favor 表增加记录 */
			await Favor.create({ artId, type, uid }, { transaction });

			/* 任务 2: 在 Classic 表中 favNums 字段加一 */
			const art = await Art.getData(artId, type);
			await art.increment('favNums', { by: 1, transaction });
		});
	}

	static async dislike(artId, type, uid) {
		const favor = await Favor.findOne({
			where: { artId, type, uid }
		});
		if (!favor) {
			throw new global.$errs.DislikeError();
		}

		/* 取消点赞事务 */
		return sequelize.transaction(async transaction => {
			/* 任务 1: Favor 表删除记录 (force 标记是否硬删除) */
			await favor.destroy({ force: true, transaction });

			/* 任务 2: 在 Classic 表中 favNums 字段减一 */
			const art = await Art.getData(artId, type);
			await art.decrement('favNums', { by: 1, transaction });
		});
	}

	static async userLikeIt(artId, type, uid) {
		const favor = await Favor.findOne({
			where: { artId, type, uid }
		});

		return !!favor;
	}

	static async getMyClassicFavors(uid) {
		const artInfos = await Favor.findAll({
			where: {
				uid,
				type: {
					[Op.not]: ArtType.BOOK,
				},
			}
		});

		if (!artInfos.length) {
			throw new global.$errs.NotFound();
		}

		/* 切忌：循环查询数据库 */
		const arts = await Art.getList(artInfos);

		return arts;
	}
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
