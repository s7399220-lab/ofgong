# OFGONG Backend

Node.js/Express 기반 백엔드 API 서버

## 설치 및 실행

```bash
# 의존성 설치
npm install

# 환경 변수 설정
cp .env.example .env

# 개발 모드 실행
npm run dev

# 프로덕션 모드 실행
npm start
```

## API 엔드포인트

### 대학 정보 (Universities)
- `GET /api/universities` - 대학 목록 조회
- `GET /api/universities/:id` - 대학 상세 정보

### 전형 정보 (Admissions)
- `GET /api/admissions` - 전형 검색 및 필터
- `POST /api/admissions/compare` - 전형 비교
- `GET /api/admissions/:id` - 전형 상세 정보

### 사용자 (Users)
- `POST /api/users/register` - 회원가입
- `POST /api/users/login` - 로그인
- `GET /api/users/profile` - 프로필 조회
- `POST /api/users/profile` - 프로필 저장

### 전략 및 해설 (Strategies)
- `GET /api/strategies/explanations/:id` - 전형 해설
- `POST /api/strategies/recommendation` - 전략 추천
- `GET /api/strategies/guide/five-tier-grading` - 5등급제 안내
- `GET /api/strategies/guide/credit-system` - 고교학점제 안내

## 테스트

```bash
npm test
```

## 린팅

```bash
npm run lint
```
