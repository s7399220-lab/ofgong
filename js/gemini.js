// Gemini API 호출 (Netlify 함수 경유, 503 시 자동 재시도)
async function callGemini(prompt, retry = 0) {
  const res = await fetch('/.netlify/functions/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt })
  });

  if (!res.ok) {
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
    .replace(/^#### (.*$)/gm, '<h4 style="margin:14px 0 6px; color:var(--primary-dark);">$1</h4>')
    .replace(/^### (.*$)/gm, '<h4 style="margin:14px 0 6px; color:var(--primary-dark);">$1</h4>')
    .replace(/^## (.*$)/gm, '<h3 style="margin:16px 0 8px; color:var(--primary-dark);">$1</h3>')
    .replace(/^# (.*$)/gm, '<h3 style="margin:16px 0 8px; color:var(--primary-dark);">$1</h3>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/^---$/gm, '<hr style="border:none; border-top:1px solid var(--border); margin:14px 0;">')
    .replace(/^[\*\-] (.*$)/gm, '<li>$1</li>')
    .replace(/\n/g, '<br>');
}