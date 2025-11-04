const gridBtn = document.getElementById("grid_view");
const listBtn = document.getElementById("list_view");

const zoomInBtn = document.getElementById("zoomIn");
const zoomOutBtn = document.getElementById("zoomOut");
const zoomRange = document.getElementById("zoomRange");

var currentZoom = zoomRange.getAttribute("value");
const maxZoom = zoomRange.getAttribute("max");
const minZoom = zoomRange.getAttribute("min");
const zoomStep = 0.1; /* 10% */

gridBtn.onclick = () => {
    modules.classList.remove("list-view");
};

listBtn.onclick = () => {
    modules.classList.add("list-view");
};

zoomInBtn.onclick = () => {
    if(currentZoom > minZoom + zoomStep){
        currentZoom -= zoomStep;
        changeZoom();
    }
}

zoomOutBtn.onclick = () => {
    if(currentZoom < maxZoom - zoomStep){
        currentZoom += zoomStep;
        changeZoom();
    }
}

zoomRange.onchange = () => {
    changeZoom();
}

function changeZoom() {
    for (const sheet of document.styleSheets) {
        for (const rule of sheet.cssRules) {
            if (rule.selectorText === '.body_modules') {
                rule.style.zoom = currentZoom;
            }
        }
    }
}