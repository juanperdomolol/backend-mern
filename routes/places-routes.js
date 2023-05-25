const express = require('express');

const placesControllers = require('../controllers/place-controllers');

const router = express.Router();

router.get('/:pid', placesControllers.getPlacesById);

router.get('/user/:uid', placesControllers.getPlacesByUserId);

router.post('/', placesControllers.createPlace);

router.patch('/:pid', placesControllers.updatePlaceById)

router.delete('/:pid', placesControllers.deletePlaceById)
module.exports = router;
