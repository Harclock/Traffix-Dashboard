const overlay = document.querySelector(".overlay");
const sidebar = document.querySelector(".sidebar");
const openBtn = document.getElementById("open-sidebar-button");
const closeBtn = document.getElementById("close-sidebar-button");

openBtn.onclick = () => {
	sidebar.classList.add("open");
	overlay.style.opacity = "0.5";
};

closeBtn.onclick = () => {
	sidebar.classList.remove("open");
	overlay.style.opacity = "0";
};

overlay.onclick = () => {
	sidebar.classList.remove("open");
	overlay.style.opacity = "0";
};

/**
 * TODO: Quando switchiamo a VUE la sidebar andrebbe gestita con un component
 *
 */
