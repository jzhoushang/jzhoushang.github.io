const pages = document.getElementsByClassName("page");
const scrollIndicator = document.getElementById("scroll-indicator");
let isScrolling = false;
let target = 0;

const deadzone = (a, b, deadzone) => {
    return Math.abs(a - b) < deadzone;
}

const onwheel = (e) => {    
    if (document.getElementById("sim-container").matches(":hover")) {
        return;
    }

    if (isScrolling) {
        e.preventDefault();
        if (deadzone(window.scrollY, target, 1)) {
            isScrolling = false;
        }
        return;
    }

    let deltaY = e.deltaY;
    switch (e.deltaMode) {
        case WheelEvent.DOM_DELTA_LINE: {
            deltaY *= 16;
            break;
        }
        case WheelEvent.DOM_DELTA_PAGE: {
            deltaY *= window.innerHeight;
            break;
        }
        default: break;
    }

    let dir = deltaY < 0 ? -1 : 1;

    if (dir == -1 && window.scrollY == 0) {
        e.preventDefault();
        return;
    }

    if (dir == -1 && window.scrollY + deltaY < pages[1].offsetTop + 1) {
        e.preventDefault();

        target = 0;
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        
        isScrolling = true;

        return;
    }

    if (dir == 1 && window.scrollY < pages[1].offsetTop - 1) {
        e.preventDefault();

        target = pages[1].offsetTop;
        window.scrollTo({
            top: pages[1].offsetTop,
            behavior: "smooth"
        });

        scrollIndicator.style.opacity = 0.0;

        isScrolling = true;
        
        return;
    }
};

window.addEventListener("wheel", onwheel, { passive: false });