// 저장된 비교 목록 인덱스 불러오기
let compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
let allData = [];

// 데이터 불러온 후 비교표 그리기
async function loadAndRender() {
  const res = await fetch('data/universities.json');
  allData = await res.json();
  updateCompareBadge();
  renderTable();
}

// 비교표 그리기
function renderTable() {
  const emptyMsg = document.getElementById('empty-msg');
  const tableWrap = document.getElementById('compare-table-wrap');
  const btnWrap = document.getElementById('btn-wrap');
  const analysisBox = document.getElementById('analysis-box');
  const table = document.getElementById('compare-table');

  if (compareList.length === 0) {
    emptyMsg.style.display = 'block';
    tableWrap.style.display = 'none';
    btnWrap.style.display = 'none';
    analysisBox.style.display = 'none';
    return;
  }

  emptyMsg.style.display = 'none';
  tableWrap.style.display = 'block';
  btnWrap.style.display = 'flex';
  analysisBox.style.display = 'none';

  const items = compareList.map(i => allData[i]);

  const rows = [
    { label: '대학', key: 'university' },
    { label: '전형명', key: 'name' },
    { label: '전형 유형', key: 'type' },
    { label: '전형 방식', key: 'method' },
    { label: '모집인원', key: 'quota', suffix: '명' },
    { label: '면접', key: 'interview' },
    { label: '수능 최저', key: 'suneung' },
    { label: '변경사항', key: 'changedNote' },
  ];

  let html = '<thead><tr><th class="row-label">항목</th>';
  items.forEach((item, i) => {
    html += `<th>${item.university}<br>
      <span style="font-weight:400; font-size:0.85rem;">${item.name}</span>
      <button class="btn-remove" onclick="removeItem(${compareList[i]})">✕</button>
    </th>`;
  });
  html += '</tr></thead><tbody>';

  rows.forEach(row => {
    html += `<tr><td class="row-label">${row.label}</td>`;
    items.forEach(item => {
      let val = item[row.key] !== undefined ? item[row.key] : '-';
      if (row.suffix && val !== '-') val += row.suffix;
      if (!val || val === '') val = '-';
      const style = row.key === 'changedNote' && val !== '-' ? 'style="color:var(--accent);"' : '';
      html += `<td ${style}>${val}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody>';
  table.innerHTML = html;
}

// Gemini 기반 비교 분석 해설
async function analyzeCompare() {
  const items = compareList.map(i => allData[i]);
  const box = document.getElementById('analysis-box');
  const btn = document.querySelector('.btn-analyze');

  btn.textContent = '분석 중...';
  btn.disabled = true;
  box.style.display = 'block';
  box.innerHTML = '<h3>📊 AI 전형 분석 해설</h3><p style="color:var(--muted);">AI가 비교 분석을 작성하고 있어요...</p>';

  const prompt = `당신은 2028 대입전형 전문가입니다. 다음 전형들을 비교 분석해 주세요.

[비교 전형 목록]
${items.map((item, i) => `${i + 1}. ${item.university} ${item.name} (${item.type}, ${item.method}, 모집인원 ${item.quota}명, 면접 ${item.interview}, 수능최저 ${item.suneung}${item.changed ? ', 변경: ' + item.changedNote : ''})`).join('\n')}

다음 항목으로 분석해 주세요:
1. 전형들의 공통점과 차이점
2. 수능 최저 및 면접 부담 비교
3. 각 전형이 유리한 학생 유형
4. 변경사항 중 주의할 점
5. 전반적인 지원 전략 조언

친절하고 이해하기 쉽게 설명하고, 합격 보장이나 수치 예측은 하지 마세요.
각 항목은 핵심만 3~4줄로 간결하게 작성하고, 전체 답변이 너무 길어지지 않도록 해주세요.
마지막에 "최종 결정은 담임 선생님과 상의하세요"를 포함해 주세요.`;

  try {
    const reply = await callGemini(prompt);
    box.innerHTML = `<h3>📊 AI 전형 분석 해설</h3>${parseMarkdown(reply)}
      <p class="analysis-disclaimer">※ 위 해설은 AI가 생성한 참고 정보입니다. 최종 지원 결정은 담임 선생님 또는 진학 상담 교사와 상의하세요.</p>`;
  } catch (e) {
    box.innerHTML = '<h3>📊 AI 전형 분석 해설</h3><p style="color:var(--muted);">분석을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</p>';
  }

  btn.textContent = '📊 AI 분석 해설 보기';
  btn.disabled = false;
  box.scrollIntoView({ behavior: 'smooth' });
}

// 개별 항목 제거
function removeItem(index) {
  compareList = compareList.filter(i => i !== index);
  localStorage.setItem('compareList', JSON.stringify(compareList));
  updateCompareBadge();
  renderTable();
}

// 전체 초기화
function clearAll() {
  compareList = [];
  localStorage.setItem('compareList', JSON.stringify(compareList));
  updateCompareBadge();
  renderTable();
}

// 뱃지 업데이트
function updateCompareBadge() {
  const badge = document.getElementById('compare-badge');
  if (badge) {
    badge.textContent = compareList.length;
    badge.style.display = compareList.length > 0 ? 'inline-block' : 'none';
  }
}

loadAndRender();