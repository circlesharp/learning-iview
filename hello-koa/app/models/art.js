const { ArtType } = require('../lib/enum');
const { Movie, Music, Sentence } = require('./classic');

class Art {
	static async getData(artId, type) {
		let art = null;
		const finder = { where: { id: artId } };

		switch (type) {
			case ArtType.MOVIE:
				art = await Movie.findOne(finder);
				break;
			case ArtType.MUSIC:
				art = await Music.findOne(finder);
				break;
			case ArtType.SENTENCE:
				art = await Sentence.findOne(finder);
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
