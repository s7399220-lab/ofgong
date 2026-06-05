# 데이터베이스 스키마

## 테이블 구조

### Universities (대학)
- id: ObjectId
- name: String (대학명)
- region: String (지역)
- officialUrl: String (공식 사이트)
- createdAt: Date
- updatedAt: Date

### Admissions (전형)
- id: ObjectId
- universityId: ObjectId (대학 참조)
- name: String (전형명)
- type: String (수시/정시)
- field: String (계열)
- major: String (학과)
- recruitmentNumber: Number (모집인원)
- suneungWeight: Number (수능 반영 비율)
- studentRecordType: String (학생부 반영 방식)
- hasInterview: Boolean (면접 여부)
- hasMinimumScore: Boolean (수능 최저학력기준 유무)
- minimumScore: String (수능 최저 기준)
- changedFrom2027: Boolean (2027 대비 변경 여부)
- source: String (출처 URL)
- createdAt: Date
- updatedAt: Date

### Users (사용자)
- id: ObjectId
- email: String (이메일)
- password: String (암호화된 비밀번호)
- userType: String (student/parent/teacher)
- createdAt: Date
- updatedAt: Date

### StudentProfiles (학생 프로필)
- id: ObjectId
- userId: ObjectId (사용자 참조)
- schoolType: String (일반고/특목고/자사고)
- field: String (계열)
- gradeLevel: Number (내신 등급대)
- subjects: Array (수강 과목)
- electiveSubjects: Boolean (진로선택 과목 이수 여부)
- createdAt: Date
- updatedAt: Date

### Bookmarks (북마크)
- id: ObjectId
- userId: ObjectId (사용자 참조)
- admissionId: ObjectId (전형 참조)
- createdAt: Date
