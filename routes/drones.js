const express = require('express');
const router = express.Router();
const Drone = require('../models/Drone.model');

// require the Drone model here

router.get('/drones', (req, res, next) => {
  Drone.find()
    .then(drones => {
      res.render('drones/list', { drones });
    })
    .catch((err) => next(err));
});

// GET route to show the create drone form
router.get('/drones/create', (req, res) => {
  res.render('drones/create-form');
});

// POST route to save a new drone
router.post('/drones/create', (req, res, next) => {
  const { name, propellers, maxSpeed } = req.body;
  const newDrone = { name, propellers, maxSpeed };

  Drone.create(newDrone)
    .then(() => {
      res.redirect('/drones');
    })
    .catch((err) => next(err));
});



router.get('/drones/:id/edit', (req, res) => {
  const { id } = req.params;

  Drone.findById(id)
    .then(drone => {
      res.render('drones/update-form', { drone });
    })
    .catch((err) => next(err));
});

router.post('/drones/:id/edit', (req, res) => {
  const { id } = req.params;
  const { name, propellers, maxSpeed } = req.body;

  Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed })
    .then(() => {
      res.redirect('/drones');
    })
    .catch(error => {
      console.error('Error updating drone:', error);
      res.render('drones/update-form', { drone: { _id: id, name, propellers, maxSpeed } });
    });
});


router.post('/drones/:id/delete', (req, res, next) => {
  const droneId = req.params.id;

  Drone.findByIdAndDelete(droneId)
    .then(() => {
      res.redirect('/drones');
    })
    .catch((err) => next(err));
});

module.exports = router;
