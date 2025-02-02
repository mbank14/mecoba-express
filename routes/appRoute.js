// const { auth } = require('../auth/auth');
require('dotenv').config()


module.exports = (db) => {
    const userController = require('../controllers/usersControlers')
    const noteController = require('../controllers/noteController')
    const router = require('express').Router();

    const jwt = require("jsonwebtoken")

    const auth = (req, res, next) => {
        const token = req.header('Authorization')?.replace('Bearer ', '').trim()
        console.log(token); 

        if (!token) return res.status(401).json({ error: "Akses tidak diizinkan !!!" });

        // const tokensplit = token.split(' ')

        function verifyToken(token) {
            return new Promise((resolve, reject) => {
                jwt.verify(token, process.env.SECRET_KEY, {}, (err, decoded) => {
                    if (err !== null && err instanceof jwt.TokenExpiredError) {
                        reject('TOKEN_EXP');
                    } else if (err instanceof jwt.JsonWebTokenError) {
                        reject('IN_VALID_TOKEN');
                    } else {
                        resolve(decoded);  // Jika token valid, kembalikan decoded token
                    }
                });
            });
        }

        verifyToken(token)
            .then((decoded) => {
                console.log('Decoded Token:', decoded);
            })
            .catch((err) => {
                if (err === 'TOKEN_EXP') {
                    // Tangani token expired
                    console.log('Token expired');
                } else if (err === 'IN_VALID_TOKEN') {
                    // Tangani token invalid
                    console.log('Invalid token');
                }
            });
    }


    // get all user
    router.get('/coba/users', userController.getUsers)
    router.get('/coba/note', userController.getNoteUser)

    // get user from id
    router.get('/coba/users/:id', userController.getUserById)

    // create user
    router.post('/coba/users', userController.createUsers)

    router.post('/coba/login', userController.loginUser)

    router.post('/coba/add_note', auth, noteController.createNotesC)

    router.post('/users', async (req, res) => {
        const { name, phone } = req.body;
        try {
            const [id] = await db('users').insert({ name, phone });
            res.status(201).json({ id, name, phone });
        } catch (error) {
            res.status(500).json({ error: 'Failed to add user' });
        }
    });

    return router
}

