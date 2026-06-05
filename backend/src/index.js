require('dotenv').config();
const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3001;

// cors 활성화
app.use(cors());
// json 파싱
app.use(express.json());

// api 라우트
app.use('/api', routes);

// 헬스체크
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 에러 처리
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`OFGONG Backend running on http://localhost:${PORT}`);
});

module.exports = app;
