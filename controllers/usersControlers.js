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


module.exports = {
    getUsers
}
