module.exports = (db) => {
    const userController = require('../controllers/usersControlers')
    const router = require('express').Router();

    router.use((req, res, next) => {
        console.log('Middleware untuk posts');
        next();
    });

    router.get('/coba/users', userController.getUsers)

    
    router.get('/users', async (req,res) => {
        try {
            const users = await db('users').select('*')
            res.json(users)
            users.length > 0 ? console.log('isi'): console.log('kososng');;
            console.log('res');
        } catch (error) {
            res.status(500).json({error: 'Failed'})
        }
    })

    router.get('/users/:id', async (req,res) => {
        const id  = req.params.id
        try {
            const users = await db('users').wheres('id', id).first()
            users ? res.json(users) : res.status(404).end()
            // res.json()
        } catch (error) {
            res.status(500).json({error: 'Failed'})
        }
    })

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

