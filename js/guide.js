// 비교 뱃지 업데이트 (다른 페이지에서 추가한 항목 수 표시)
const compareList = JSON.parse(localStorage.getItem('compareList') || '[]');
const badge = document.getElementById('compare-badge');
if (badge && compareList.length > 0) {
  badge.textContent = compareList.length;
  badge.style.display = 'inline-block';
}