function matches(option, text) {
    return option.toUpperCase().startsWith(text.toUpperCase());
}

function fancyDropdown(inputId, autocompleteId, datalistId) {
    const id = document.getElementById(inputId);
    const autocomplete = document.getElementById(autocompleteId);
    const datalist = document.getElementById(datalistId);
    var minWidth = datalist.offsetWidth;

    function outputsize() {
        if (id.offsetWidth < minWidth) {
            datalist.style.minwidth = id.parentElement.offsetWidth + 'px';
        } else {
            datalist.style.width = id.parentElement.offsetWidth + 'px';
        }
    }

    new ResizeObserver(outputsize).observe(id);

    id.addEventListener("input", e => {
        datalist.style.display = "block";
        let hide = true;
        let changed = false;
        for (let option of datalist.options) {
            if (matches(option.value, id.value)) {
                option.style.display = "block";
                hide = false;
                if (!changed) {
                    autocomplete.innerText = id.value + option.value.substring(id.value.length);
                    changed = true;
                }
            } else {
                option.style.display = "none";
            }
        }
        if (hide) {
            datalist.style.display = "none";
            autocomplete.innerText = "";
        }
        if (id.value === "") {
            autocomplete.innerText = "";
        }
    });

    id.addEventListener("keydown", e => {
        if (e.key === "Tab") {
            e.preventDefault();
            for (let option of datalist.options) {
                if (matches(option.value, id.value)) {
                    id.value = option.value;
                    id.dispatchEvent(new Event("input"));
                }
            }
        }
    });

    id.addEventListener("click", e => {
        let hide = true;
        for (let option of datalist.options) {
            if (window.getComputedStyle(option, null).display == "block") 
            	hide = false;
        }

        if (datalist.style.display == "block" || hide) {
            datalist.style.display = "none";
        } else {
            datalist.style.display = "block";
        }
    });


    document.addEventListener("click", e => {
        if (e.target.tagName == "OPTION") {
            id.value = e.target.value;
        }
        if (e.target.tagName !== "DATALIST" && e.target.tagName !== "INPUT") {
            datalist.style.display = "none";
        }
    });

    datalist.style.display = "none";
}

fancyDropdown("bugbo-input", "autocomplete", "buglist");
