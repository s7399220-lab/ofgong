const express = require('express');
const router = express.Router();

// FR-01: 대학 목록 조회
router.get('/', (req, res) => {
  // TODO: DB에서 대학 목록 조회
  res.json({
    message: 'Universities endpoint',
    data: []
  });
});

// 대학 상세 정보 조회
router.get('/:id', (req, res) => {
  // TODO: 특정 대학의 전형 정보 조회
  res.json({
    message: `University ${req.params.id} details`,
    data: {}
  });
});

module.exports = router;
