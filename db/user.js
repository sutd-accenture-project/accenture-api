const knex = require('./connection');

module.exports = {
	getOne: function(id) {
		return knex('user').where('id', id).first();
	},
	getAll: function(){
		return knex('user');
	},
	getOneByEmail: function (email){
		return knex('user').where('email', email).first();
	},
	create: function(user){
		return knex('user').insert(user, 'id').then(ids =>{
			return ids[0];
		});
	},
	insertTicket: function(userTicket){
		return knex('tickets').insert(userTicket, 'id').then(id =>{
			return id[0];
		});
	},
	getNameEmail: function(id){
		return knex('user').where('id',id).select('name','email');
	}
}