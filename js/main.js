// 전체 데이터를 담는 배열
let allData = [];

// JSON 파일에서 데이터 불러오기
async function loadData() {
  const res = await fetch('data/universities.json');
  allData = await res.json();
  render(allData);
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

  data.forEach(item => {
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
    `;
    grid.appendChild(card);
  });
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