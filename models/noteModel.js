const knex = require("knex")
const configKnex = require('../knexfile').development

const db = knex(configKnex)

const createNotes = async({text, userId}) => {
    return db('notes').insert({text, user_id: userId}).returning('id')
}

module.exports={
    createNotes
}