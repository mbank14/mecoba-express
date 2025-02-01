const knex = require('knex')
const configKnex = require('../knexfile').development

const db = knex(configKnex)

const getAllUser = async () =>{
    return await db('users').select('*')
}

const getIdUser = async (id) => {
    return await db('users').where({id}).first()
}

const createUser = async ({name, phone}) => {
    return await db('users').insert({ name, phone})
}

const updateUser = async ({id,name, phone}) => {
    return await db('users').where({id}).update({name, phone})
}

const deletUser = async (id) => {
    return db('users').where({id}).del()
}

module.exports = {
    getAllUser,
    getIdUser,
    createUser,
    updateUser,
    deletUser
}