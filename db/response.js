const knex = require('./connection');

module.exports = {
	insertResponse: function(response){
		return knex('responses').insert(response, 'id').then(id =>{
			return id[0];
		});;
	},
	getResponses: function(tix_id){
		return knex('responses').where('ticket_id',tix_id).orderBy('id','desc');
	},
}