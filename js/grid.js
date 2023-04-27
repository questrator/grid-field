let isMouseDown = false;
const h = 61;
const v = 41;
const grid = document.querySelector("section.grid");
grid.addEventListener("click", cellClickHandler);
grid.addEventListener("mousemove", cellMoveHandler);
grid.addEventListener("mousedown", () => isMouseDown = true);
grid.addEventListener("mouseup", () => isMouseDown = false);
const playButton = document.querySelector(".next");
playButton.addEventListener("click", play);
let interval = 0;
const cells = [];

for (let i = 0; i < v * h; i++) {
    const alive = randomAlive();
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-id", i);
    cell.setAttribute("data-alive", alive);
    cell.setAttribute("data-order", i % 2 ? "odd" : "even");
    grid.insertAdjacentElement("beforeend", cell);
    cells[i] = { id: i, alive, row: Math.trunc(i / h), col: i % h, neighbors: getNeighbors(i) }
}

function cellClickHandler(event) {
    event.target.dataset.alive = 1;
    cells[event.target.dataset.id].alive = 1;
}

function cellMoveHandler(event) {
    if (isMouseDown) {
        event.target.dataset.alive = 1;
        cells[event.target.dataset.id].alive = 1;
    }
}

function randomAlive() {
    return Math.random() < 0.09 ? 1 : 0;
}

function getNeighbors(id) {
    const n1 = Math.trunc(id / h) === 0 || id % h === h - 1 ? null : id + 1 - h;
    const n2 = id % h === h - 1 ? null : id + 1;
    const n3 = Math.trunc(id / h) === v - 1 || id % h === h - 1 ? null : id + 1 + h;
    const n4 = Math.trunc(id / h) === v - 1 ? null : id + h;
    const n5 = Math.trunc(id / h) === v - 1 || id % h === 0 ? null : id - 1 + h;
    const n6 = id % h === 0 ? null : id - 1;
    const n7 = Math.trunc(id / h) === 0 || id % h === 0 ? null : id - 1 - h;
    const n8 = Math.trunc(id / h) === 0 ? null : id - h;
    return [n1, n2, n3, n4, n5, n6, n7, n8].filter(e => e !== null);
}

function refreshCells() {
    for (let i = 0; i < cells.length; i++) {
        const n = getAliveNeighbors(cells[i].neighbors);
        const cell = grid.querySelector(`[data-id='${i}']`);
        if (cells[i].alive === 0 && n === 3) {
            cells[i].alive = 1;
            cell.dataset.alive = 1;
        }
        if (cells[i].alive === 1 && (n < 2 || n > 3)) {
            cells[i].alive = 0;
            cell.dataset.alive = 0;
        }
    }
}

function getAliveNeighbors(array) {
    return array.map(id => cells[id].alive).reduce((r, e) => r + e, 0);
}

function play(event) {
    if (event.target.dataset.play == 0) {
        interval = setInterval(refreshCells, 75);
        playButton.dataset.play = 1;
        playButton.textContent = "Pause";
    }
    else {
        playButton.dataset.play = 0;
        clearInterval(interval);
        playButton.textContent = "Play";
    }
    console.log(interval);
}

console.log(cells);