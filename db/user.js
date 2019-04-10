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
	insertTicket: function(ticket,id,priority,unsolved,admin_id,date_created){
		const id_int = parseInt(id);
		const admin_id_int = parseInt(admin_id);
		var priority_bool = (priority == 'true');
		var unsolved_bool = (unsolved == 'true');

		return knex('tickets').insert({subject: ticket, user_id: id_int, priority:priority_bool, unsolved:unsolved_bool,admin_id:admin_id_int,date_created:date_created});
	}
}