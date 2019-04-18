const knex = require('./connection');

module.exports = {
	getAll: function() {
		return knex('tickets');
	},
	getAvailable: function(){
		return knex('tickets').where('admin_id',null);
	},
	assignTicket: function(ticket_id,admin__id){
		return knex('tickets').where('id',ticket_id).update({admin_id: admin__id});
	}
}