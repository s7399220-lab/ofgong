// Gemini API 공통 호출 함수 (503 시 자동 재시도)
async function callGemini(prompt, retry = 0) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{
        parts: [{ text: prompt }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4096,
      }
    })
  });

  if (!res.ok) {
    // 503(서버 과부하)이면 2초 기다렸다가 최대 3번까지 재시도
    if (res.status === 503 && retry < 3) {
      await new Promise(r => setTimeout(r, 2000));
      return callGemini(prompt, retry + 1);
    }
    const err = await res.json();
    console.error('Gemini API 오류:', err);
    throw new Error(err.error?.message || 'API 오류');
  }

  const data = await res.json();

  if (data.candidates && data.candidates[0]) {
    return data.candidates[0].content.parts[0].text;
  }
  throw new Error('응답을 받지 못했어요.');
}

// 마크다운 → HTML 변환
function parseMarkdown(text) {
  return text
    // 제목 (#### ### ## #)
    .replace(/^#### (.*$)/gm, '<h4 style="margin:14px 0 6px; color:var(--primary-dark);">$1</h4>')
    .replace(/^### (.*$)/gm, '<h4 style="margin:14px 0 6px; color:var(--primary-dark);">$1</h4>')
    .replace(/^## (.*$)/gm, '<h3 style="margin:16px 0 8px; color:var(--primary-dark);">$1</h3>')
    .replace(/^# (.*$)/gm, '<h3 style="margin:16px 0 8px; color:var(--primary-dark);">$1</h3>')
    // 굵게
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    // 구분선
    .replace(/^---$/gm, '<hr style="border:none; border-top:1px solid var(--border); margin:14px 0;">')
    // 리스트 (* 또는 -)
    .replace(/^[\*\-] (.*$)/gm, '<li>$1</li>')
    // 줄바꿈
    .replace(/\n/g, '<br>');
}