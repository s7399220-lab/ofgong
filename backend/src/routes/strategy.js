const express = require('express');
const router = express.Router();

// FR-04: 전형 구조 해설
router.get('/explanations/:admissionId', (req, res) => {
  // TODO: 전형 해설 조회
  res.json({
    message: 'Admission explanation',
    data: {
      importantSkills: [],
      specialPoints: [],
      studentTypes: []
    }
  });
});

// FR-05: 학생 프로필 기반 전략 추천
router.post('/recommendation', (req, res) => {
  const { schoolType, field, gradeLevel, subjects } = req.body;
  // TODO: AI/로직 기반 전략 추천
  res.json({
    message: 'Strategy recommendations',
    data: {
      susiPriority: {},
      susuIntegratedPriority: {},
      jeongsiPriority: {}
    }
  });
});

// FR-06: 5등급제 안내
router.get('/guide/five-tier-grading', (req, res) => {
  // TODO: 5등급제 설명 조회
  res.json({
    message: '5-tier grading system guide',
    data: {}
  });
});

// FR-07: 고교학점제 안내
router.get('/guide/credit-system', (req, res) => {
  // TODO: 고교학점제 설명 조회
  res.json({
    message: 'High school credit system guide',
    data: {}
  });
});

module.exports = router;
