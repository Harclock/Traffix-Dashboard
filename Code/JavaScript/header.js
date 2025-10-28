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