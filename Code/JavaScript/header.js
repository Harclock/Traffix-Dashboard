const overlay = document.querySelector(".overlay");
const sidebar = document.querySelector(".sidebar");
const openBtn = document.querySelector(".open-sidebar");
const closeBtn = document.querySelector(".close-sidebar");

openBtn.onclick = () => {
	sidebar.classList.add("open");
	overlay.style.display = "block";
};

closeBtn.onclick = () => {
	sidebar.classList.remove("open");
	overlay.style.display = "none";
};

overlay.onclick = () => {
	sidebar.classList.remove("open");
	overlay.style.display = "none";
};

/**
 * TODO: Quando switchiamo a VUE la sidebar andrebbe gestita con un component
 *
 */
