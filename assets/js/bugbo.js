const bugs = await fetch("/json/buglist.json")
    .then(response => response.json())
    .catch(error => {
      console.error("Failed to load bug list", error);
    });

const buglist = document.getElementById("buglist");
for (let bug of bugs) {
    buglist.innerHTML += `<span>${bug.name}</option>`
}

const img = document.getElementById("bugbo-image");
img.src = "";

const link = document.getElementById("bugbo-link");

const form = document.getElementById("bugbo-form");
const guess = document.getElementById("bugbo-input");

const totalDisp = document.getElementById("bugbo-total");
const correctDisp = document.getElementById("bugbo-correct");
const accDisp = document.getElementById("bugbo-accuracy");

const result = document.getElementById("bugbo-result");

const apiEndpoint = "https://api.inaturalist.org/v1/observations?photos=true&order=random&per_page=1&term_id=1";
const photoDatabase = "https://inaturalist-open-data.s3.amazonaws.com/photos/"

let correct = "";
let natUrl = "";

let savedBlob = {
    name: "",
    photoUrl: "",
    blobUrl: "",
    natUrl: ""
};

async function getJson(id, larva) {
    let page = Math.floor(Math.random() * 10000 + 1);
    const initialUrl = `${apiEndpoint}&term_value_id=${larva ? larva : 2}&taxon_id=${id}&page=${page}`
    const response = await fetch(initialUrl)
    let json = await response.json();
    
    if (json.results.length == 0) {
        const max = Number.parseInt(json.total_results);
        page = Math.floor(Math.random() * (max > 10000 ? 10000 : max) + 1);
        const updatedUrl = `${apiEndpoint}&term_value_id=${larva ? larva : 2}&taxon_id=${id}&page=${page}`
        const response = await fetch(updatedUrl)
        json = await response.json();
    }
    
    return json;
}

async function getPhotoUrl(json) {
    const photos = json.results[0].photos;
    const photo = photos[Math.floor(Math.random() * photos.length)];
    return photo.url;
}

async function getBlobUrl(url) {
    const resp = await fetch(url);
    return URL.createObjectURL(await resp.blob());
}

async function getNewBlob() {
    try {
        const choice = bugs[Math.floor(Math.random() * (bugs.length))];
        let larva = 0
        if (choice.hasOwnProperty("larva")) {
            larva = Math.random() > 0.7 ? choice.larva : 0;
        }

        const json = await getJson(choice.id, larva);

        const photoUrl = await getPhotoUrl(json); 
        const finalUrl = photoUrl.substring(0, photoUrl.lastIndexOf("/")) + "/original" + photoUrl.substring(photoUrl.lastIndexOf("."));

        savedBlob.name = choice.name;
        savedBlob.photoUrl = finalUrl;
        savedBlob.blobUrl = await getBlobUrl(finalUrl).catch(e => savedBlob.blobUrl = finalUrl);
        savedBlob.natUrl = `https://www.inaturalist.org/observations/${json.results[0].id}`
    }
    catch (error) {
        console.error("Failed to load image", error);
        setTimeout(500, getNewBlob);
    }
}

async function loadSavedBlob() {
    URL.revokeObjectURL(img.src);
    correct = savedBlob.name;
    natUrl = savedBlob.natUrl;
    link.href = savedBlob.photoUrl; 
    img.src = savedBlob.blobUrl;
    await getNewBlob();
}

await getNewBlob();
await loadSavedBlob();

async function updateStats() {
    let t = localStorage.getItem("bugbo-total") || 0;
    let c = localStorage.getItem("bugbo-correct") || 0;
    let a = c / t;
    if (t == 0) a = 0;

    totalDisp.innerHTML = t;
    correctDisp.innerHTML = c;
    accDisp.innerHTML = `${(a * 100).toFixed(2)}%`;
}

await updateStats();

async function addTotal() {
    let t = Number.parseInt(localStorage.getItem("bugbo-total")) || 0;
    localStorage.setItem("bugbo-total", t + 1);
}

async function addCorrect() {
    let t = Number.parseInt(localStorage.getItem("bugbo-correct")) || 0;
    localStorage.setItem("bugbo-correct", t + 1);
}

form.addEventListener("submit", async (event) => {
    event.preventDefault();
    await addTotal();
    if (guess.value.toLowerCase() == correct.toLowerCase()) {
        await addCorrect();
        result.classList.add("result-correct"); 
        result.classList.remove("result-incorrect"); 
        result.innerHTML = `Correct! It was ${correct}.`
    } else {
        result.classList.add("result-incorrect"); 
        result.classList.remove("result-correct"); 
        result.innerHTML = `Incorrect! It was ${correct}. (<a target="_blank" href="${natUrl}">Misid?</a>)`
    }
    guess.value = "";
    guess.dispatchEvent(new Event("input"));
    await updateStats();
    await loadSavedBlob();
});

async function hint() {
    result.innerText = `First letter is ${correct.charAt(0)}`
    result.classList.remove("result-incorrect");
    result.classList.remove("result-correct");
}

document.getElementById("submit").onclick = () => form.dispatchEvent(new Event("submit"));
document.getElementById("reload").onclick = loadSavedBlob;
document.getElementById("hint").onclick = hint;
