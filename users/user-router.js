const express = require('express');
const bcrypt = require('bcryptjs');
const Users = require('./user-model');

const generateToken = require('../auth/generateToken');
const restricted = require('../auth/restricted-middleware');
const { validateUserBody } = require('../users/users-helper');

const router = express.Router();

// CREATE
router.post('/register', (req, res) => {
    const user = req.body;
    if(!user.username || !user.password || !user.department) {
        res.status(401).json({error: 'Please include the proper request body'})
    } else {
        const hash = bcrypt.hashSync(user.password, 10)
        user.password = hash;

        //const token = generateToken(user)

        Users.add(user)
            .then(saved => {
                 res.status(201).json(saved)
             })
            .catch(err => {
                 res.status(500).json(err)
            })
    }

    // const user = req.body;
    // const validateResult = validateUserBody(user);

    // if(validateResult.isSuccessful === true) {
    //     const hash = bcrypt.hashSync(user.password, 10)
    //     user.password = hash;

    //     const token = generateToken(user)

    //     Users.add(user)
    //         .then(saved => {
    //             res.status(201).json({ token })
    //         })
    //         .catch(err => {
    //             res.status(500).json(err)
    //         })
    // } else {
    //     res.status(400).json({
    //         message: 'Invalid use information, see error details',
    //         errors: errors.validateResult.errors
    //     })
    // }
    
})

router.post('/login', (req, res) => {
    let { username, password } = req.body;

    Users.findBy({ username })
    .first()
    .then(user => {
        if(user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user.username)


            res.status(200).json({
                message: `Welcome ${user.username}`,
                token
            })
        } else {
            res.status(401).json({message: 'Invalid credentials'})
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })

})


// READ 
router.get('/users', restricted, (req, res) => {
    Users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;