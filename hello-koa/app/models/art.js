const { ArtType } = require('../lib/enum');
const { Movie, Music, Sentence } = require('./classic');

class Art {
	static async getData(artId, type, useScope = true) {
		let art;
		const finder = { where: { id: artId } };
		const scope = useScope ? 'noDate' : null;

		switch (type) {
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
}

module.exports = {
	Art
};
