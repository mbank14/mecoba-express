const logger = require('../utils/logger')
const userModel = require('../models/userModel')

const getUsers = async (req, res) => {
    try {
        const user = await userModel.getAllUser()
        logger.info(user)
        res.json(user)
    } catch (error) {
        logger.error(error)        
    }
}

const getUserById = async( req, res) => {
    const id = req.params.id
    try {
        const user = await userModel.getIdUser(id)
        logger.info(user)
        res.json(user)
    } catch (error) {
        res.status(400).end()
        logger.error(error)
    }
}

const createUsers = async (req, res) => {
    const {name, phone} = req.body
    try {
        const [id] = await userModel.createUser({name, phone})
        res.status(201).json({id, name, phone})
        logger.info([id])
    } catch (error) {
        res.status(500).json({"name": name, "phone": phone})   
        logger.error(error)
    }
}

module.exports = {
    getUsers,
    getUserById,
    createUsers
}
