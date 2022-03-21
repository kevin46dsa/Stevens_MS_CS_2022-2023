module.exports = {
	checkId(id) {
		if (!id) throw 'Error: You Must provide an id to search for';
		if (typeof id !== 'string') throw 'Error: Id must be a string';
		id = id.trim();
		if (id.length === 0)
			throw 'Error: id cannot be an empty string or just spaces';
		id = Number(id);
		if (!Number.isInteger(id)) throw 'Error: ID needs to be a Integer';
		if (!(id > 0)) throw 'Error: id needs to be a positive integer';
		return id;
	},
};
