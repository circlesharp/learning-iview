const { Sequelize, Model } = require('sequelize');
const { sequelize } = require('../../core/db');

class Flow extends Model {

}

Flow.init(
	{
		index: Sequelize.INTEGER,
		artId: Sequelize.INTEGER,
		type: Sequelize.TINYINT,
	},
	{
		sequelize,
		tableName: 'flow',
	},
);

module.exports = {
	Flow,
};
