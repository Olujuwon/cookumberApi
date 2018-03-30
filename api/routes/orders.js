const express = require('express');
const  router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).json({
        message: 'All orders retrieved!'
    })
})

router.post('/', (req, res, next) => {
    const order = {
        productId: req.body.productId,
        quantity:req.body.quantity
    }
    res.status(201).json({
        message: 'Order  Created!',
        myOrder: order
    })
})

router.get('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Order Detail!',
        userId: req.params.userId
    })
})

router.patch('/', (req, res, next) => {
    res.status(200).json({
        message: 'Order Edited!'
    })
})

router.delete('/:userId', (req, res, next) => {
    res.status(200).json({
        message: 'Order Deleted!',
        userId: req.params.userId
    })
})
module.exports = router;

