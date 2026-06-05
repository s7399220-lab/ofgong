# API 명세서

## 기본 설정

- Base URL: `http://localhost:3001/api`
- Content-Type: `application/json`

## 전형 정보 API

### 1. 대학 목록 조회
```
GET /universities

응답:
{
  "data": [
    {
      "id": "...",
      "name": "서울대학교",
      "region": "서울",
      "officialUrl": "..."
    }
  ]
}
```

### 2. 전형 검색 및 필터
```
GET /admissions?university=서울대&field=humanities&type=susi&hasMinimumScore=true

응답:
{
  "filters": {...},
  "data": [
    {
      "id": "...",
      "name": "일반전형",
      "type": "수시",
      "suneungWeight": 0,
      "studentRecordType": "교과",
      "hasInterview": false,
      "hasMinimumScore": false
    }
  ]
}
```

### 3. 전형 비교
```
POST /admissions/compare

요청:
{
  "admissionIds": ["id1", "id2", "id3"]
}

응답:
{
  "data": [
    {
      "id": "...",
      "name": "전형1",
      "suneungWeight": 0,
      "studentRecordWeight": 100,
      "interviewWeight": 0,
      "minimumScore": null,
      "recruitmentNumber": 50
    },
    ...
  ]
}
```

## 전략 API

### 4. 전형 구조 해설
```
GET /strategies/explanations/:admissionId

응답:
{
  "data": {
    "admissionId": "...",
    "importantSkills": ["..."],
    "specialPoints": ["..."],
    "studentTypes": {
      "advantaged": ["..."],
      "disadvantaged": ["..."]
    },
    "source": "..."
  }
}
```

### 5. 학생 프로필 기반 전략 추천
```
POST /strategies/recommendation

요청:
{
  "schoolType": "regular",
  "field": "humanities",
  "gradeLevel": 2,
  "subjects": ["..."]
}

응답:
{
  "data": {
    "susiPriority": {
      "priority": "high",
      "reason": "..."
    },
    "susuIntegratedPriority": {
      "priority": "medium",
      "reason": "..."
    },
    "jeongsiPriority": {
      "priority": "low",
      "reason": "..."
    }
  }
}
```

## 사용자 인증 API

### 6. 회원가입
```
POST /users/register

요청:
{
  "email": "user@example.com",
  "password": "password123",
  "userType": "student"
}

응답:
{
  "data": {
    "id": "...",
    "email": "user@example.com",
    "userType": "student"
  }
}
```

### 7. 로그인
```
POST /users/login

요청:
{
  "email": "user@example.com",
  "password": "password123"
}

응답:
{
  "token": "jwt_token_here"
}
```
