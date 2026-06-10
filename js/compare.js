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
  const clearWrap = document.getElementById('clear-wrap');
  const table = document.getElementById('compare-table');

  if (compareList.length === 0) {
    emptyMsg.style.display = 'block';
    tableWrap.style.display = 'none';
    clearWrap.style.display = 'none';
    return;
  }

  emptyMsg.style.display = 'none';
  tableWrap.style.display = 'block';
  clearWrap.style.display = 'block';

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
    html += `<th>${item.university}<br><span style="font-weight:400; font-size:0.85rem;">${item.name}</span>
      <button class="btn-remove" onclick="removeItem(${compareList[i]})">✕</button></th>`;
  });
  html += '</tr></thead><tbody>';

  rows.forEach(row => {
    html += `<tr><td class="row-label">${row.label}</td>`;
    items.forEach(item => {
      let val = item[row.key] !== undefined ? item[row.key] : '-';
      if (row.suffix && val !== '-') val += row.suffix;
      if (!val || val === '') val = '-';
      // 변경사항 있으면 주황색 표시
      const style = row.key === 'changedNote' && val !== '-' ? 'style="color:var(--accent);"' : '';
      html += `<td ${style}>${val}</td>`;
    });
    html += '</tr>';
  });

  html += '</tbody>';
  table.innerHTML = html;
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