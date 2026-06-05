const express = require('express');
const router = express.Router();

const universityRoutes = require('./university');
const admissionRoutes = require('./admission');
const userRoutes = require('./user');
const strategyRoutes = require('./strategy');

router.use('/universities', universityRoutes);
router.use('/admissions', admissionRoutes);
router.use('/users', userRoutes);
router.use('/strategies', strategyRoutes);

module.exports = router;
