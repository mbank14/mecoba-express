const logger = require('../utils/logger')
const userModel = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()



const getUsers = async (req, res) => {
    try {
        const user = await userModel.getAllUser()
        logger.info(user)
        res.json(user)
    } catch (error) {
        logger.error(error)        
    }
}
const getNoteUser = async (req, res) => {
    try {
        const user = await userModel.getNoteUser()
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
    const {name, phone, username, password} = req.body

    const saltRound = 10
    const passHash = await bcrypt.hash(password, saltRound)

    console.log({name, phone, username, passHash});

    try {
        const [id] = await userModel.createUser({name, phone, username, password: passHash})
        res.status(201).json({id, name, phone, username, passHash})
        logger.info([id])
    } catch (error) {
        res.status(500).json({"name": name, "phone": phone, "password": password})   
        logger.error(error)
    }
}

const loginUser = async (req,res) => {
    
    const {username, password} = req.body

    const user = await userModel.getAllUser()

    const isMatch = user.find(item => item.username == username)
    const pass = await bcrypt.compare(password, isMatch.password)

    console.log(pass);// true

    // const isPass = user.find(item => item.password == password)

    if (username != isMatch.username) return res.status(400).json({error: 'User tidak ditemukan'}) 

    if(!pass) return res.status(400).json({error: 'Gagal'})

    console.log("lolos login");

  
    const token = jwt.sign({userId: isMatch.id}, process.env.SECRET_KEY, {expiresIn: '1h'})

    res.status(200).send({"token": token})

}

module.exports = {
    getUsers,
    getUserById,
    createUsers,
    getNoteUser,
    loginUser
}
