const LoginType = {
	USER_MINI_PROGRAM: 100,
	USER_EMAIL: 101,
	USER_MOBILE: 102,
	ADMIN_EMAIL: 200,
	isThisType,
};

const AuthScope = {
	VISITOR: 4,
	USER: 8,
	ADMIN: 16,
	SUPER_ADMIN: 32,
	isThisType,
};

const ArtType = {
	MOVIE: 100,
	MUSIC: 200,
	SENTENCE: 300,
	BOOK: 400,
	isThisType,
};

function isThisType(val) {
	for (const key in this) {
		if (this[key] == val) {
			return true;
		}
	}
	return false;
}

module.exports = {
	LoginType,
	AuthScope,
	ArtType,
};
