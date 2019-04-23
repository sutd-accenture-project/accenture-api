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
		return knex('tickets').where('admin_id', id).whereNot('status','deleted');
	},
	getUnsolvedTickets: function(id){
		return knex('tickets').where('admin_id',id).where('status', 'open').orWhere('status','pending');
	},
	getUrgentTickets: function(id){
		return knex('tickets').where('admin_id',id).where('priority',true).whereNot('status','deleted').whereNot('status','solved');
	},
	getUnsolvedCount: function(id){
		return knex('tickets').where('admin_id',id).where('status', 'open').orWhere('status','pending').count();
	},
	getPriorityCount: function(id){
		return knex('tickets').where('admin_id',id).where('priority',true).whereNot('status','deleted').whereNot('status','solved').count();
	},
	getNewCount: function(id){
		var d = new Date();
		d.setMinutes(d.getMinutes() - 30);
		return knex('tickets').where('admin_id',id).where('date_created', '>', d).whereNot('status','deleted').whereNot('status','solved').count('date_created');
	},
	getNewTickets: function(id){
		var d = new Date();
		d.setMinutes(d.getMinutes() - 30);
		return knex('tickets').where('admin_id',id).where('date_created', '>', d).whereNot('status','deleted').whereNot('status','solved');
	},
	getOpenCount: function(id){
		return knex('tickets').where('admin_id',id).where('status','open').count();
	},
	getPendingCount: function(id){
		return knex('tickets').where('admin_id',id).where('status','pending').count();
	},
	getSolvedCount: function(id){
		return knex('tickets').where('admin_id',id).where('status','solved').count();
	},
	getSolvedTickets: function(id){
		return knex('tickets').where('admin_id',id).where('status','solved');
	},
	getOpenTickets:function(id){
		return knex('tickets').where('admin_id',id).where('status','open');
	},
	getPendingTickets: function(id){
		return knex('tickets').where('admin_id',id).where('status','pending');
	},
	getDeletedTickets: function(id){
		return knex('tickets').where('admin_id',id).where('status','deleted');
	},
	getDeletedCount:function(id){
		return knex('tickets').where('admin_id',id).where('status','deleted').count();
	}
}