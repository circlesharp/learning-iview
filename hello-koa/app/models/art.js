const { Op } = require('sequelize');
const { ArtType } = require('../lib/enum');
const { Movie, Music, Sentence } = require('./classic');

class Art {
	constructor(artId, type) {
		this.artId = artId;
		this.type = type;
	};

	static async getList(artInfos) {
		let arts = [];
		const artIdsObj = {
			[ArtType.MOVIE]: [],
			[ArtType.MUSIC]: [],
			[ArtType.SENTENCE]: [],
		};

		for (const artInfo of artInfos) {
			artIdsObj[artInfo.type].push(artInfo.artId);
		}

		for (const key in artIdsObj) {
			/* 原则：for 循环里面的逻辑如果复杂，最好抽象成函数 */
			const artIds = artIdsObj[key];
			if (!artIds.length) {
				continue;
			}
			const oneTypeArts = await Art._getListByType(artIds, +key);
			arts = [...arts, ...oneTypeArts];
		}

		return arts;
	}

	static async getData(artId, type, useScope = true) {
		let art;
		const finder = { where: { id: artId } };
		const scope = useScope ? 'noDate' : null;

		switch (+type) {
			case ArtType.MOVIE:
				art = await Movie.scope(scope).findOne(finder);
				break;
			case ArtType.MUSIC:
				art = await Music.scope(scope).findOne(finder);
				break;
			case ArtType.SENTENCE:
				art = await Sentence.scope(scope).findOne(finder);
				break;
			case ArtType.BOOK:
				break;
			default:
				break;
		}

		return art;
	}

	static async _getListByType(artIds, type) {
		let arts = [];
		const finder = { where: { id: { [Op.in]: artIds } } };
		const scope = 'noDate';

		switch (+type) {
			case ArtType.MOVIE:
				arts = await Movie.scope(scope).findAll(finder);
				break;
			case ArtType.MUSIC:
				arts = await Music.scope(scope).findAll(finder);
				break;
			case ArtType.SENTENCE:
				arts = await Sentence.scope(scope).findAll(finder);
				break;
			case ArtType.BOOK:
				break;
			default:
				break;
		}

		return arts;
	}
}

module.exports = {
	Art
};
