// View mode toggles (grid/list) using class-based selectors
const modules = document.querySelector(".modules");

const gridBtn = document.getElementById("grid-view-btn");
const listBtn = document.getElementById("list-view-btn");

gridBtn.onclick = () => {
	modules.classList.remove("list-view");
};

listBtn.onclick = () => {
	modules.classList.add("list-view");
};
