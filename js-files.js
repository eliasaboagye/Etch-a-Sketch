//start up grid size
let n = 16;

const gridSize = document.querySelector("input")
const applyBtn = document.querySelector("button")
const container = document.querySelector(".container");
let items;
// let color = "blue"
// n = gridSize;

function random(n){
    return Math.floor(Math.random() * n + 1);
}
function createGrid(n){
    for(let i = 0; i<n*n; i++){
    const box = document.createElement("div");
    box.className = "item"
    container.appendChild(box);
    }
    items = document.querySelectorAll(".item");

    items.forEach((item)=>{
        item.style.flexBasis = `${100/n}%`;
    })

    items.forEach((item)=>{

        item.addEventListener('mouseenter', (e)=>{
            e.target.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
            })
    })
}

function applyGrid(){

    n = gridSize.value;
    if(isNaN(n) || n > 100 ){
        return;
    }
    items.forEach((item) => {
        item.style.display = "none"
    })
    createGrid(n);
}
createGrid(n);

//apply grid when button is clicked
applyBtn.addEventListener('click', applyGrid );
//aply grid when enter key is pressed
gridSize.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        applyGrid();
    }
})

