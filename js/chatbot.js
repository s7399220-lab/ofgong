// 대화 기록 (Gemini에 문맥 전달용)
let chatHistory = [];

// 시스템 프롬프트 (AI 역할 설정)
const SYSTEM_PROMPT = `당신은 2028학년도 대한민국 대입전형 전문 상담사입니다.
다음 내용을 바탕으로 고등학생과 학부모에게 친절하고 정확하게 답변해 주세요.

[핵심 지식]
- 2028학년도부터 내신 5등급제 시행: 성취도(A~E)와 석차등급(1~5등급) 병기. 대학은 두 지표 중 상위 등급 반영.
- 융합선택과목 9개(여행지리, 역사로 탐구하는 현대 세계 등)는 성취도만 기재하는 순수 절대평가.
- 2028 수능: 선택과목 폐지, 통합사회+통합과학 공통 응시. 미적분Ⅱ·기하 제외.
- 고교학점제: 192학점 이수, 진로선택 과목 이수 이력이 학종에서 중요.
- 대학들이 수능 변별력 하락을 우려해 정시에서도 내신 반영 비중을 높이는 추세.
- 서울대 정시: 1단계 수능 등급합(3배수), 2단계 수능 60점+교과역량평가 40점.

[주요 15개 대학 전형 특징]
- 서울대: 수시 전형 수능최저 없음, 정시에 교과역량평가 신설
- 연세대: 추천형(교과), 종합인재형(종합), 논술전형 운영
- 고려대: 학교추천(교과+수능최저), 학업우수(종합+면접), 계열적합(종합 서류100)
- 서강대: 지역균형(교과), 일반Ⅰ/Ⅱ(종합), 논술. 정시 지역균형 전형 신설
- 성균관대: 추천인재(교과), 융합인재(종합), 성균인재(면접형 종합), 논술우수
- 한양대: 학생부교과, 학생부종합(면접없음), 논술
- 중앙대: 지역균형(교과), 탐구하는 학종/모두의 학종, 모두의 논술/재학생 논술
- 경희대: 지역균형(교과), 네오르네상스(종합), 논술우수자
- 한국외대: 학교장추천(교과), 학종면접형/서류형, 논술
- 이화여대: 고교추천(교과), 미래인재(종합), 논술
- 서울시립대: 지역균형(교과), 학생부종합, 논술
- 건국대: 지역균형(교과), KU자기추천(종합), 논술우수자
- 동국대: 학교장추천인재(교과), Do Dream(종합), 논술우수자
- 홍익대: 학교장추천자(교과), 학교생활우수자(종합), 논술
- 숙명여대: 지역균형(교과), 숙명인재면접형(종합), 논술우수자

[답변 규칙]
1. 친절하고 이해하기 쉽게 설명하세요.
2. 합격 보장이나 수치 예측은 절대 하지 마세요.
3. 답변 마지막에 "최종 결정은 담임 선생님과 상의하세요"를 포함하세요.
4. 모르는 내용은 솔직히 모른다고 하세요.
5. 답변은 500자 이내로 간결하게 해주세요.`;

// 메시지 전송
async function sendMessage() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg) return;

  // 추천 질문 숨기기
  document.getElementById('suggest-wrap').style.display = 'none';

  // 사용자 메시지 표시
  appendMessage('user', msg);
  input.value = '';

  // 로딩 표시
  const loadingId = appendLoading();

  try {
    // 대화 기록에 추가
    chatHistory.push({ role: 'user', content: msg });

    // Gemini 호출용 프롬프트 구성
    const fullPrompt = `${SYSTEM_PROMPT}\n\n[대화 기록]\n${chatHistory.map(h => `${h.role === 'user' ? '학생' : 'AI'}: ${h.content}`).join('\n')}\n\nAI:`;

    const reply = await callGemini(fullPrompt);

    // 로딩 제거 후 답변 표시
    removeLoading(loadingId);
    appendMessage('bot', reply);

    // 대화 기록에 AI 답변 추가
    chatHistory.push({ role: 'bot', content: reply });

  } catch (e) {
    removeLoading(loadingId);
    appendMessage('bot', '죄송해요, 답변을 가져오는 중 오류가 발생했어요. 잠시 후 다시 시도해 주세요.');
  }
}

// 채팅창에 메시지 추가
function appendMessage(role, text) {
  const window = document.getElementById('chat-window');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = `<div class="chat-bubble">${parseMarkdown(text)}</div>`;
  window.appendChild(div);
  window.scrollTop = window.scrollHeight;
}

// 로딩 말풍선 추가
function appendLoading() {
  const id = 'loading-' + Date.now();
  const window = document.getElementById('chat-window');
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  div.id = id;
  div.innerHTML = `<div class="chat-bubble loading-bubble">답변을 생성하고 있어요<span class="dots">...</span></div>`;
  window.appendChild(div);
  window.scrollTop = window.scrollHeight;
  return id;
}

// 로딩 말풍선 제거
function removeLoading(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

// 추천 질문 클릭 시 입력창에 채우기
function fillQuestion(text) {
  document.getElementById('chat-input').value = text;
  document.getElementById('chat-input').focus();
}