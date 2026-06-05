const express = require('express');
const router = express.Router();

// 사용자 회원가입
router.post('/register', (req, res) => {
  const { email, password, userType } = req.body;
  // TODO: 사용자 가입 로직
  res.status(201).json({
    message: 'User registered successfully',
    data: {}
  });
});

// 사용자 로그인
router.post('/login', (req, res) => {
  const { email, password } = req.body;
  // TODO: 인증 로직
  res.json({
    message: 'User logged in successfully',
    token: null
  });
});

// 사용자 프로필 조회
router.get('/profile', (req, res) => {
  // TODO: 인증 미들웨어 추가
  res.json({
    message: 'User profile',
    data: {}
  });
});

// 학생 프로필 저장 (FR-05)
router.post('/profile', (req, res) => {
  const { schoolType, field, gradeLevel, subjects, electiveSubjects } = req.body;
  // TODO: 프로필 저장 로직
  res.json({
    message: 'Student profile saved',
    data: {}
  });
});

module.exports = router;
