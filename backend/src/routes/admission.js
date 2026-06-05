const express = require('express');
const router = express.Router();

// FR-02: 전형 검색 및 필터
router.get('/', (req, res) => {
  const { university, field, type, hasMinimumScore } = req.query;
  // TODO: 다차원 필터링 로직
  res.json({
    message: 'Search and filter admissions',
    filters: { university, field, type, hasMinimumScore },
    data: []
  });
});

// FR-03: 전형 비교
router.post('/compare', (req, res) => {
  const { admissionIds } = req.body;
  if (!Array.isArray(admissionIds) || admissionIds.length > 5) {
    return res.status(400).json({
      error: 'Maximum 5 admissions can be compared'
    });
  }
  // TODO: 전형 비교 로직
  res.json({
    message: 'Compare admissions',
    data: []
  });
});

// 전형 상세 정보
router.get('/:id', (req, res) => {
  // TODO: 전형 상세 정보 조회
  res.json({
    message: `Admission ${req.params.id} details`,
    data: {}
  });
});

module.exports = router;
