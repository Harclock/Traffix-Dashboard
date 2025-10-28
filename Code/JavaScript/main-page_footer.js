const gridBtn = document.getElementById("grid_view");
const listBtn = document.getElementById("list_view");

gridBtn.onclick = () => {
    modules.classList.remove("list-view");
};

listBtn.onclick = () => {
    modules.classList.add("list-view");
};