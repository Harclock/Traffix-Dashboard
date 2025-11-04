// View mode toggles (grid/list) using class-based selectors
const gridBtn = document.querySelector('.grid-view-btn') || document.getElementById('grid_view');
const listBtn = document.querySelector('.list-view-btn') || document.getElementById('list_view');

gridBtn.onclick = () => {
  modules.classList.remove('list-view');
};

listBtn.onclick = () => {
  modules.classList.add('list-view');
};
