const express = require('express');
const  router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'All users retrieved!'
    })
})

router.post('/', (req, res, next) => {
    res.status(201).json({
        message: 'User  Created!'
    })
})

router.get('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'User Detail!',
        userId: req.params.userId
    })
})

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: 'User Edited!'
    })
})

router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'User Deleted!',
        userId: req.params.userId
    })
})
module.exports = router;