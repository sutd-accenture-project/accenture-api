const knex = require('./connection');

module.exports = {
	getOne: function(id) {
		return knex('admin_department').where('id', id);
	}
}