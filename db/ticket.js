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
	},
	getTicketUserNameAdminID: function(ticket_id){
		return knex('tickets').where('id',ticket_id).select('requester','admin_id');
	},
	getTicketAdminName: function(admin_id){
		return knex('admin').where('id', admin_id).select('name');
	},
	changeTicketStatus: function(ticket_id,new_status){
		return knex('tickets').where('id', ticket_id).update({status: new_status})
	},
	increasePriority: function(ticket_id){
		return knex('tickets').where('id',ticket_id).update({priority:true})
	}
}