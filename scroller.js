const pages = document.getElementsByClassName("page");
const scrollIndicator = document.getElementById("scroll-indicator");
const scrollIndicator2 = document.getElementById("scroll-indicator-2");
const scrollIndicator3 = document.getElementById("scroll-indicator-3");
const hints = document.getElementById("hints")

const simContainer = document.getElementById("sim-container");

let isScrolling = false;
let target = 0;

const scrollButton = (scrollTo, callback) => {
    return (e) => {
        if (isScrolling) {
            if (deadzone(window.scrollY, target, 1)) {
                isScrolling = false;
            } else {
                return;
            }
        }

        target = scrollTo;
        window.scrollTo({
            top: scrollTo,
            behavior: "smooth"
        });
        isScrolling = true;

        if (callback) callback();
    }
}

scrollIndicator.addEventListener("click", scrollButton(pages[1].offsetTop, () => {
    simContainer.dispatchEvent(new Event("autorotate"));
    scrollIndicator.style.opacity = 0.0;
    hints.style.opacity = 0.0;
}));

scrollIndicator2.addEventListener("click", scrollButton(0, () => {
    simContainer.dispatchEvent(new Event("autorotate"));
    scrollIndicator.style.opacity = 1.0;
    hints.style.opacity = 1.0;
}));

scrollIndicator3.addEventListener("click", scrollButton(pages[2].offsetTop));

const deadzone = (a, b, deadzone) => {
    return Math.abs(a - b) < deadzone;
}

const onwheel = (e) => {    
    if (simContainer.matches(":hover")) {
        e.preventDefault();
        simContainer.dispatchEvent(new Event("scroll", e));
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

    if (dir == -1 && window.scrollY + deltaY < pages[1].offsetTop + 1) {
        e.preventDefault();

        scrollIndicator2.dispatchEvent(new Event("click"));

        return;
    }

    if (dir == -1 && window.scrollY + deltaY < pages[2].offsetTop + 1) {
        e.preventDefault();

        target = pages[1].offsetTop;
        window.scrollTo({
            top: pages[1].offsetTop,
            behavior: "smooth"
        });

        isScrolling = true;
        
        return;
    }

    if (dir == 1 && window.scrollY < pages[1].offsetTop - 1) {
        console.log("hello world!")
        e.preventDefault();
        scrollIndicator.dispatchEvent(new Event("click"))

        return;
    }


    if (dir == 1 && window.scrollY < pages[2].offsetTop - 1) {
        e.preventDefault();

        target = pages[2].offsetTop;
        window.scrollTo({
            top: pages[2].offsetTop,
            behavior: "smooth"
        });

        isScrolling = true;
        
        return;
    }
};

window.addEventListener("wheel", onwheel, { passive: false });
window.addEventListener("resize", (e) => { isScrolling = false; });