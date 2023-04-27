const grid = document.querySelector("section.grid");
let mouseDown = false;
grid.addEventListener("mousemove", cellClickHandler);
grid.addEventListener("mousedown", checkMouseDown)
grid.addEventListener("mouseup", checkMouseUp)

for (let i = 1; i <= 2501; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-alive", "0");
    cell.setAttribute("data-order", i % 2 ? "odd" : "even");
    grid.insertAdjacentElement("beforeend", cell);
}

function cellClickHandler(event) {
    if (mouseDown) {
        event.target.dataset.alive = 1;
    }    
}

function checkMouseDown(event) {
    mouseDown = true;
    console.log(mouseDown)
}

function checkMouseUp(event) {
    mouseDown = false;
    console.log(mouseDown)
}