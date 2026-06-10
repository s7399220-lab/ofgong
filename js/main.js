// 전체 데이터를 담는 배열
let allData = [];

// 비교 목록 (최대 5개)
let compareList = JSON.parse(localStorage.getItem('compareList') || '[]');

// JSON 파일에서 데이터 불러오기
async function loadData() {
  const res = await fetch('data/universities.json');
  allData = await res.json();
  render(allData);
  updateCompareBadge();
}

// 카드 목록 화면에 그리기
function render(data) {
  const grid = document.getElementById('card-grid');
  const noResult = document.getElementById('no-result');
  grid.innerHTML = '';

  if (data.length === 0) {
    noResult.style.display = 'block';
    return;
  }
  noResult.style.display = 'none';

  data.forEach((item) => {
    // 전체 데이터에서 원래 인덱스 찾기
    const realIndex = allData.indexOf(item);
    const isAdded = compareList.includes(realIndex);

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      ${item.changed ? '<span class="badge-changed">변경</span>' : ''}
      <div class="card-univ">${item.university}</div>
      <div class="card-name">${item.name}</div>
      <div class="card-tags">
        <span class="tag">${item.type}</span>
        <span class="tag">${item.method}</span>
        <span class="tag ${item.suneung === '있음' ? 'accent' : ''}">수능최저 ${item.suneung}</span>
      </div>
      <div class="card-info">
        <span>모집인원: ${item.quota}명</span>
        <span>면접: ${item.interview}</span>
        ${item.changed ? `<span style="color:var(--accent)">📌 ${item.changedNote}</span>` : ''}
      </div>
      <button class="btn-compare ${isAdded ? 'added' : ''}" onclick="toggleCompare(${realIndex})">
        ${isAdded ? '✓ 비교 추가됨' : '+ 비교에 추가'}
      </button>
    `;
    grid.appendChild(card);
  });
}

// 비교 목록에 추가/제거
function toggleCompare(index) {
  if (compareList.includes(index)) {
    compareList = compareList.filter(i => i !== index);
  } else {
    if (compareList.length >= 5) {
      alert('최대 5개까지 비교할 수 있어요.');
      return;
    }
    compareList.push(index);
  }
  // 로컬스토리지에 저장해서 페이지 이동 후에도 유지
  localStorage.setItem('compareList', JSON.stringify(compareList));
  updateCompareBadge();
  applyFilter();
}

// 상단 비교 버튼 뱃지 업데이트
function updateCompareBadge() {
  const badge = document.getElementById('compare-badge');
  if (badge) {
    badge.textContent = compareList.length;
    badge.style.display = compareList.length > 0 ? 'inline-block' : 'none';
  }
}

// 필터 조건에 맞게 데이터 걸러내기
function applyFilter() {
  const type = document.getElementById('filter-type').value;
  const method = document.getElementById('filter-method').value;
  const suneung = document.getElementById('filter-suneung').value;
  const changed = document.getElementById('filter-changed').checked;

  let result = allData;
  if (type) result = result.filter(d => d.type === type);
  if (method) result = result.filter(d => d.method.includes(method));
  if (suneung) result = result.filter(d => d.suneung === suneung);
  if (changed) result = result.filter(d => d.changed);

  render(result);
}

// 필터 값이 바뀔 때마다 자동으로 적용
document.getElementById('filter-type').addEventListener('change', applyFilter);
document.getElementById('filter-method').addEventListener('change', applyFilter);
document.getElementById('filter-suneung').addEventListener('change', applyFilter);
document.getElementById('filter-changed').addEventListener('change', applyFilter);

// 페이지 로드 시 실행
loadData();