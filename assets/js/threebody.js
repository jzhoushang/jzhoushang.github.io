const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const aspectRatio = canvas.clientWidth / canvas.clientHeight;

canvas.width = 3840;
canvas.height = canvas.width / aspectRatio;

const mainWidth = canvas.width * 0.5;
const paddingWidth = (canvas.width - mainWidth) / 2;
const mainHeight = canvas.height * 0.5;
const paddingHeight = (canvas.height - mainHeight) / 2;

const red = "#fe5186";
const blue = "#5186fe";
const green = "#86fe51"; 

const deltaTime = 1 / 60;
const g = 6.67e2;
const maxForce = 10000;

const collidedZone = 1;

let bodies = [];

const sleep = (ms) => new Promise(res => setTimeout(res, ms));

function vec2d(x, y) {
    return {x, y};
}

function scale2d(scalar, v) {
    return vec2d(v.x * scalar, v.y * scalar);
}

function add2d(v, u) {
    return vec2d(v.x + u.x, v.y + u.y);
}

function sub2d(v, u) {
    return vec2d(v.x - u.x, v.y - u.y);
}

function zero() {
    return vec2d(0, 0);
}

function randomPosition() {
    const x = paddingWidth + mainWidth * Math.random();
    const y = paddingHeight + mainHeight * Math.random();
    return {x, y};
}

function randomVelocity() {
    const x = (Math.random() - 0.5) * 1;
    const y = (Math.random() - 0.5) * 1;
    return {x, y};
}

function randomMass() {
    return Math.random() * 500 + 500;
}

function magnitude(v) {
    return Math.sqrt(v.x * v.x + v.y * v.y);
}

// gravitational force on a by b
function getGravitationalForce(a, b) {
    const r = sub2d(a.s, b.s);
    const rMagnitude = magnitude(r);
    let fMagnitude = g * (a.m * b.m) / (rMagnitude * rMagnitude); 
    if (fMagnitude > maxForce) fMagnitude = maxForce
    const rHat = scale2d(-1/rMagnitude, r);
    return scale2d(fMagnitude, rHat);
}


function drawBody(body, color) {
    ctx.beginPath();
    ctx.arc(body.s.x, body.s.y, Math.sqrt(body.m), 0, 2 * Math.PI);
    ctx.fillStyle = color;
    ctx.fill();
}

async function start() {
    bodies = [
        { s: randomPosition(), v: randomVelocity(), m: randomMass() },
        { s: randomPosition(), v: randomVelocity(), m: randomMass() },
        { s: randomPosition(), v: randomVelocity(), m: randomMass() },
    ];

    await simulate();
    for (let i = 0; i < 5/deltaTime; ++i) {
        await sleep(deltaTime * 1000);
        render();
        update();
    }
    await start();
}

function update() {
    // calc forces
    const f_net = [
        add2d(
            getGravitationalForce(bodies[0], bodies[1]),
            getGravitationalForce(bodies[0], bodies[2])
        ),
        add2d(
            getGravitationalForce(bodies[1], bodies[0]),
            getGravitationalForce(bodies[1], bodies[2])
        ),
        add2d(
            getGravitationalForce(bodies[2], bodies[0]),
            getGravitationalForce(bodies[2], bodies[1])
        )
    ];
    
    // update velocities and positions
    for (let i = 0; i < 3; ++i) {
        bodies[i].v = add2d(bodies[i].v, scale2d(deltaTime/bodies[i].m, f_net[i]));
        bodies[i].s = add2d(bodies[i].s, bodies[i].v);
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBody(bodies[0], red);
    drawBody(bodies[1], blue);
    drawBody(bodies[2], green);
}

function collided() {
    for (let i = 0; i < 3; ++i) {
        for (let j = i + 1; j < 3; ++j) {
            const r = sub2d(bodies[i].s, bodies[j].s);
            const rMagnitude = magnitude(r);
            if (rMagnitude <= collidedZone) {
                return true
            };
        }
    }
    return false;
}

function outside() {
    let counter = 0;
    for (let i = 0; i < 3; ++i) {
        const x = bodies[i].s.x;
        const y = bodies[i].s.y;
        if (x < 0 || x > canvas.width) { counter++; continue; }
        if (y < 0 || y > canvas.height) { counter++; continue; }
    }
    return counter >= 2;
}

async function simulate() {
    render();
    update();

    if (collided() || outside()) {
        return;
    }    

    await sleep(deltaTime * 1000);
    await simulate();
}

start();
