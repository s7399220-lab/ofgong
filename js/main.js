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
      <div class="card-actions">
        <button class="btn-compare ${isAdded ? 'added' : ''}" onclick="toggleCompare(${realIndex})">
          ${isAdded ? '✓ 비교 추가됨' : '+ 비교에 추가'}
        </button>
        <button class="btn-ai-explain" onclick="showAIExplain(${realIndex}, this)">
          ✦ AI 해설
        </button>
      </div>
      <div class="ai-explain-box" id="explain-${realIndex}" style="display:none;"></div>
    `;
    grid.appendChild(card);
  });
}

// AI 전형 해설 생성
async function showAIExplain(index, btn) {
  const item = allData[index];
  const box = document.getElementById(`explain-${index}`);

  // 이미 열려있으면 닫기
  if (box.style.display === 'block') {
    box.style.display = 'none';
    btn.textContent = '✦ AI 해설';
    return;
  }

  btn.textContent = '생성 중...';
  btn.disabled = true;
  box.style.display = 'block';
  box.innerHTML = '<span style="color:var(--muted); font-size:0.82rem;">AI가 해설을 작성하고 있어요...</span>';

  const prompt = `당신은 2028 대입전형 전문가입니다. 다음 전형에 대해 고등학생이 이해하기 쉽게 해설해 주세요.

대학: ${item.university}
전형명: ${item.name}
전형유형: ${item.type}
전형방식: ${item.method}
모집인원: ${item.quota}명
면접: ${item.interview}
수능최저: ${item.suneung}
변경사항: ${item.changedNote || '없음'}

다음 세 가지 항목으로 200자 이내로 간결하게 설명해 주세요.
1. 이 전형의 핵심 특징
2. 유리한 학생 유형
3. 주의할 점
합격 보장이나 수치 예측은 하지 마세요.`;

  try {
    const reply = await callGemini(prompt);
    box.innerHTML = parseMarkdown(reply);
  } catch (e) {
    box.innerHTML = '<span style="color:var(--muted);">해설을 불러오지 못했어요. 잠시 후 다시 시도해 주세요.</span>';
  }

  btn.textContent = '✦ AI 해설 닫기';
  btn.disabled = false;
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
  localStorage.setItem('compareList', JSON.stringify(compareList));
  updateCompareBadge();
  applyFilter();
}

// 상단 비교 뱃지 업데이트
function updateCompareBadge() {
  const badge = document.getElementById('compare-badge');
  if (badge) {
    badge.textContent = compareList.length;
    badge.style.display = compareList.length > 0 ? 'inline-block' : 'none';
  }
}

// 모든 필터 + 검색어 적용
function applyFilter() {
  const search = document.getElementById('search-univ').value.trim();
  const type = document.getElementById('filter-type').value;
  const method = document.getElementById('filter-method').value;
  const suneung = document.getElementById('filter-suneung').value;
  const changed = document.getElementById('filter-changed').checked;

  let result = allData;
  if (search) result = result.filter(d => d.university.includes(search));
  if (type) result = result.filter(d => d.type === type);
  if (method) result = result.filter(d => d.method.includes(method));
  if (suneung) result = result.filter(d => d.suneung === suneung);
  if (changed) result = result.filter(d => d.changed);

  render(result);
}

// 필터/검색 이벤트 연결
document.getElementById('search-univ').addEventListener('input', applyFilter);
document.getElementById('filter-type').addEventListener('change', applyFilter);
document.getElementById('filter-method').addEventListener('change', applyFilter);
document.getElementById('filter-suneung').addEventListener('change', applyFilter);
document.getElementById('filter-changed').addEventListener('change', applyFilter);

// 페이지 로드 시 실행
loadData();