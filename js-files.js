//start up grid size


const gridSize = document.querySelector("input")
const applyBtn = document.querySelector("button")
const container = document.querySelector(".container");
let colorPicker = document.querySelector('#colorPicker');
const randomColors = document.querySelector('#randomColors');
let items;
let bgColor = colorPicker.value;

let randomColorIsOn = false;
randomColors.addEventListener('click',()=>{
    randomColorIsOn = !randomColorIsOn;
    if(randomColorIsOn){
        randomColors.style.backgroundColor = "rgb(38, 152, 240)"
    }else{
        randomColors.style.backgroundColor = "aliceblue"
    }
})
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
            if(randomColorIsOn){
                e.target.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
            }else{
                e.target.style.backgroundColor = colorPicker.value
            }
            ;
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
let n = 16;
createGrid(n);




//apply grid when button is clicked
applyBtn.addEventListener('click', applyGrid );
//aply grid when enter key is pressed
gridSize.addEventListener('keydown', (e)=>{
    if(e.key === 'Enter'){
        applyGrid();
    }
})

