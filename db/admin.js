const knex = require('./connection');

module.exports = {
	getOne: function(id) {
		return knex('admin').where('id', id).first();
	},
	getOneByEmail: function (email){
		return knex('admin').where('email', email).first();
	},
	create: function(admin){
		return knex('admin').insert(admin, 'id').then(ids =>{
			return ids[0];
		});
	},
	getAll: function(){
		return knex('admin');
	},
	getName: function(id){
		return knex('admin').where('id', id).select('name');
	},
	getAllTickets: function(id){
		return knex('tickets').where('admin_id', id);
	},
	getUnsolvedTickets: function(id){
		return knex('tickets').where('admin_id',id).where('status', 'open').orWhere('status','pending');
	},
	getUrgentTickets: function(id){
		return knex('tickets').where('admin_id',id).where('priority',true);
	},
	getUnsolvedCount: function(id){
		return knex('tickets').where('admin_id',id).where('status', 'open').orWhere('status','pending').count();
	},
	getPriorityCount: function(id){
		return knex('tickets').where('admin_id',id).count('priority',true);
	},
	getNewCount: function(id){
		var d = new Date();
		d.setMinutes(d.getMinutes() - 30);
		return knex('tickets').where('admin_id',id).where('date_created', '>', d).count('date_created');
	},
	getNewTickets: function(id){
		var d = new Date();
		d.setMinutes(d.getMinutes() - 30);
		return knex('tickets').where('admin_id',id).where('date_created', '>', d);
	}
}