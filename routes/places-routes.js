const {check}=require('express-validator');
const express = require('express');
const router = express.Router();
const placesController = require('../models/places-controller');


router.get('/:pid', placesController.getPlacebyId);


router.get('/user/:uid', placesController.getPlacebyUser);

router.post(
    '/', 
    [
        check('title').not().isEmpty(),
        check('description').isLength({min: 6}),
        check('address').not().isEmpty()
    ]
    ,
    placesController.createPlace);
 
//editar un lugar
router.patch('/:pid', 
    [
        check('title').not().isEmpty(),
        check('description').isLength({min: 6})
    ]
    ,
    placesController.updatePlace);


router.delete('/:pid', placesController.deletePlace);

module.exports= router;