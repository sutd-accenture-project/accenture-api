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
	}
}