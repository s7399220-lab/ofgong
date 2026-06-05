const express = require('express');
const router = express.Router();

// 라우트 import
const universityRoutes = require('./university');
const admissionRoutes = require('./admission');
const userRoutes = require('./user');
const strategyRoutes = require('./strategy');

// 각 경로별 라우터 연결
router.use('/universities', universityRoutes);
router.use('/admissions', admissionRoutes);
router.use('/users', userRoutes);
router.use('/strategies', strategyRoutes);

module.exports = router;
