const knex = require('./connection');

module.exports = {
	getOne: function(id) {
		return knex('ticket_category').where('id', id);
	}
}