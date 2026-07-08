const overlay = document.getElementById("overlay")
const overlayImage = document.getElementById("overlay-image");
const overlayClose = document.getElementById("overlay-close");

let hidden = true;

document.addEventListener("click", e => {
    if (e.target.tagName === "IMG") {
        overlayImage.src = e.target.src;
        overlay.style.display = "flex";
        hidden = false;
    }
});

overlay.addEventListener("click", e => {
    hidden = true;
    overlay.style.display = "none"; 
});

document.addEventListener("keydown", e => {
    if (e.key === "Escape") {
        overlay.dispatchEvent(new Event("click"));
    }
});
