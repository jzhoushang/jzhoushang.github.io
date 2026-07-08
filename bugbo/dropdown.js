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
        for (let option of datalist.children) {
            if (matches(option.innerText, id.value)) {
                option.style.display = "block";
                hide = false;
                if (!changed) {
                    autocomplete.innerText = id.value + option.innerText.substring(id.value.length);
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
            for (let option of datalist.children) {
                if (matches(option.innerText, id.value)) {
                    id.value = option.innerText;
                    id.dispatchEvent(new Event("input"));
                }
            }
        }
    });

    id.addEventListener("click", e => {
        id.dispatchEvent(new Event("input"));
    });


    document.addEventListener("click", e => {
        if (e.target.parentElement.id == datalistId) {
            id.value = e.target.innerText;
            id.dispatchEvent(new Event("input"));
        }
        if (e.target.id != datalistId && e.target.id != inputId) {
            datalist.style.display = "none";
        }
    });

    datalist.style.display = "none";
}

fancyDropdown("bugbo-input", "autocomplete", "buglist");
