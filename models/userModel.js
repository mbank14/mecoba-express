const knex = require('knex')
const configKnex = require('../knexfile').development

const db = knex(configKnex)

const getNoteUser = async () =>{
    return await db('users').join('notes', 'users.id', '=', 'notes.user_id').select('users.name', 'notes.text')
}
const getAllUser = async () =>{
    return await db('users').select('*')
}

const getIdUser = async (id) => {
    return await db('users').where({id}).first()
}

const createUser = async ({name, phone, username, password}) => {
    return await db('users').insert({ name, phone, username, password})
}

const updateUser = async ({id,name, phone}) => {
    return await db('users').where({id}).update({name, phone, username,password})
}

const deletUser = async (id) => {
    return db('users').where({id}).del()
}


module.exports = {
    getAllUser,
    getIdUser,
    createUser,
    updateUser,
    getNoteUser
}