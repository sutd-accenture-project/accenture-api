const knex = require('./connection');

module.exports = {
	getOne: function(id) {
		return knex('user').where('id', id).first();
	},
	getOneByEmail: function (email){
		return knex('user').where('email', email).first();
	},
	create: function(user){
		return knex('user').insert(user, 'id').then(ids =>{
			return ids[0];
		});
	},
	insertTicket: function(email,ticket){
		return knex('user').where({email: email}).insert({tickets: ticket});
	}
}