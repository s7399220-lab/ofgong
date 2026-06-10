// Gemini API 공통 호출 함수
async function callGemini(prompt) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${CONFIG.GEMINI_API_KEY}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await res.json();

  // 응답에서 텍스트 추출
  if (data.candidates && data.candidates[0]) {
    return data.candidates[0].content.parts[0].text;
  }
  throw new Error('응답을 받지 못했어요.');
}

// 마크다운 굵게(**text**) → <strong> 변환
function parseMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br>');
}