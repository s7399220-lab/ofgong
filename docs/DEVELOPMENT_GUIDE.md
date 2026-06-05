# 개발 가이드

## 개발 환경 설정

### 사전 요구사항
- Node.js 18+
- MongoDB 5.0+
- Git

### 초기 설정

```bash
# 저장소 클론
git clone https://github.com/s7399220-lab/ofgong.git
cd ofgong

# 루트 의존성 설치
npm install

# 백엔드 환경 설정
cd backend
cp .env.example .env
npm install

# 프론트엔드 의존성 설치
cd ../frontend
npm install

# 루트로 돌아가기
cd ..
```

## 개발 서버 실행

```bash
# 모든 서비스 동시 실행 (루트 디렉토리에서)
npm run dev

# 또는 개별 실행
# 백엔드: npm run dev --workspace=backend
# 프론트엔드: npm run dev --workspace=frontend
```

## 코드 스타일

### JavaScript/Node.js
- ESLint 설정 준수
- 2칸 들여쓰기
- 세미콜론 필수

### React
- 함수형 컴포넌트 사용
- Hooks 활용
- PropTypes 또는 TypeScript 타입 정의

## 브랜치 전략

- `main`: 프로덕션 배포 준비
- `develop`: 개발 메인 브랜치
- `feature/*`: 새 기능 개발
- `fix/*`: 버그 수정
- `docs/*`: 문서 작성

## Commit 메시지 규칙

```
<type>: <subject>

<body>

<footer>
```

### Type
- `feat`: 새 기능
- `fix`: 버그 수정
- `docs`: 문서
- `style`: 코드 스타일 변경
- `refactor`: 코드 리팩토링
- `test`: 테스트 추가
- `chore`: 빌드, 의존성 업데이트 등

### 예시
```
feat: Add admission comparison feature

Implement FR-03 admission comparison functionality
allowing users to compare up to 5 admissions side by side.

Closes #123
```

## 테스트

```bash
# 모든 테스트 실행
npm test

# 특정 패키지 테스트
npm test --workspace=backend

# 커버리지 리포트
npm test -- --coverage
```

## 문제 해결

### MongoDB 연결 오류
- MongoDB 서비스 실행 확인
- .env 파일의 MONGODB_URI 확인

### 포트 충돌
- 백엔드: PORT 변수 변경
- 프론트엔드: vite.config.js에서 port 변경

## 추가 리소스

- [Express.js 문서](https://expressjs.com/)
- [React 문서](https://react.dev/)
- [Mongoose 문서](https://mongoosejs.com/)
- [Vite 문서](https://vitejs.dev/)
