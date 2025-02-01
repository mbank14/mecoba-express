module.exports = (db) => {
    const userController = require('../controllers/usersControlers')
    const router = require('express').Router();

    router.use((req, res, next) => {
        console.log('Middleware untuk posts');
        next();
    });

    // get all user
    router.get('/coba/users', userController.getUsers)
    
    // get user from id
    router.get('/coba/users/:id', userController.getUserById)

    // create user
    router.post('/coba/users', userController.createUsers)

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

