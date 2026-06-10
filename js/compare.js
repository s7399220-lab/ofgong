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

  // 비교할 전형 데이터
  const items = compareList.map(i => allData[i]);

  // 비교 항목 목록
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

// 규칙 기반 전형 분석 해설 생성
function analyzeCompare() {
  const items = compareList.map(i => allData[i]);
  const box = document.getElementById('analysis-box');
  const lines = [];

  // 선택 전형 수
  lines.push(`<p>📋 <strong>${items.length}개 전형</strong>을 비교 분석한 결과입니다.</p>`);

  // 수능 최저 분석
  const withMin = items.filter(i => i.suneung === '있음');
  const withoutMin = items.filter(i => i.suneung === '없음');
  if (withMin.length > 0 && withoutMin.length > 0) {
    lines.push(`<p>📌 수능 최저가 <strong>있는 전형</strong>: ${withMin.map(i => `${i.university} ${i.name}`).join(', ')} — 수능 준비가 병행되어야 합니다.</p>`);
    lines.push(`<p>✅ 수능 최저가 <strong>없는 전형</strong>: ${withoutMin.map(i => `${i.university} ${i.name}`).join(', ')} — 내신·서류 준비에 집중할 수 있습니다.</p>`);
  } else if (withMin.length === items.length) {
    lines.push(`<p>⚠️ 선택한 전형 <strong>모두 수능 최저학력기준이 있습니다.</strong> 수능 준비를 반드시 병행해야 합니다.</p>`);
  } else {
    lines.push(`<p>✅ 선택한 전형 <strong>모두 수능 최저학력기준이 없습니다.</strong> 내신·서류 준비에 집중할 수 있습니다.</p>`);
  }

  // 면접 분석
  const withInterview = items.filter(i => i.interview === '있음');
  if (withInterview.length > 0) {
    lines.push(`<p>🎤 면접이 있는 전형: <strong>${withInterview.map(i => `${i.university} ${i.name}`).join(', ')}</strong> — 면접 대비가 필요합니다.</p>`);
  } else {
    lines.push(`<p>✅ 선택한 전형 모두 면접이 없습니다.</p>`);
  }

  // 전형 방식별 분석
  const methods = {};
  items.forEach(i => {
    methods[i.method] = (methods[i.method] || []);
    methods[i.method].push(`${i.university} ${i.name}`);
  });
  const methodKeys = Object.keys(methods);
  if (methodKeys.length > 1) {
    lines.push(`<p>📚 다양한 전형 방식이 포함되어 있습니다: <strong>${methodKeys.join(', ')}</strong> — 각 전형에 맞는 준비 전략이 필요합니다.</p>`);
  } else {
    lines.push(`<p>📚 선택한 전형은 모두 <strong>${methodKeys[0]}</strong> 방식입니다.</p>`);
  }

  // 모집인원 분석
  const maxItem = items.reduce((a, b) => a.quota > b.quota ? a : b);
  const minItem = items.reduce((a, b) => a.quota < b.quota ? a : b);
  if (maxItem !== minItem) {
    lines.push(`<p>👥 모집인원이 가장 많은 전형은 <strong>${maxItem.university} ${maxItem.name}(${maxItem.quota}명)</strong>, 가장 적은 전형은 <strong>${minItem.university} ${minItem.name}(${minItem.quota}명)</strong>입니다.</p>`);
  }

  // 변경사항 분석
  const changed = items.filter(i => i.changed);
  if (changed.length > 0) {
    lines.push(`<p>🔄 2027 대비 변경된 전형: <strong>${changed.map(i => `${i.university} ${i.name}`).join(', ')}</strong> — 변경사항을 반드시 확인하세요.</p>`);
  }

  // 수시/정시 혼합 여부
  const types = [...new Set(items.map(i => i.type))];
  if (types.length === 2) {
    lines.push(`<p>💡 수시와 정시 전형이 함께 포함되어 있습니다. 수시 지원 시 정시 준비도 병행하는 전략을 고려해보세요.</p>`);
  }

  // 면책 고지
  lines.push(`<p class="analysis-disclaimer">※ 위 해설은 공시 자료 기반의 참고 정보입니다. 최종 지원 결정은 담임 선생님 또는 진학 상담 교사와 상의하세요.</p>`);

  box.innerHTML = `<h3>📊 전형 분석 해설</h3>${lines.join('')}`;
  box.style.display = 'block';
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