//start up grid size


const gridSize = document.querySelector("input")
const applyBtn = document.querySelector("button")
const container = document.querySelector(".container");
let colorPicker = document.querySelector('#colorPicker');
const randomColors = document.querySelector('#randomColors');
const progressiveDarkness = document.querySelector('#progressiveDarkness')
let items;
let bgColor = colorPicker.value;
let progressiveDarknessIsOn = false;
let randomColorIsOn = false;
randomColors.addEventListener('click',()=>{
    randomColorIsOn = !randomColorIsOn;
    if(randomColorIsOn){
        randomColors.style.backgroundColor = `rgb(${random(254)}, ${random(254)}, ${254})`
        progressiveDarknessIsOn = false
        progressiveDarkness.setAttribute('style', "background-color: aliceblue; color: black; border-color: #555");
    }else{
        randomColors.style.backgroundColor = "aliceblue"
    }
})
progressiveDarkness.addEventListener('click', () => {
    progressiveDarknessIsOn = !progressiveDarknessIsOn
    if(progressiveDarknessIsOn){
        randomColorIsOn = false;
        randomColors.style.backgroundColor = "aliceblue"
        progressiveDarkness.setAttribute('style', "background-color: rgb(80, 88, 88); color: rgb(74, 299, 232); border-color: rgb(74, 299, 232);");
    }else{
        progressiveDarkness.setAttribute('style', "background-color: aliceblue; color: black; border-color: #555");

    }
})

function random(n){
    return Math.floor(Math.random() * n );
}
function hexToRgb(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
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
    
    //color styling
    items.forEach((item)=>{
        item.dataset.opacity = 0;

        item.addEventListener('mouseenter', (e)=>{
            if(randomColorIsOn){
                item.style.backgroundColor = `rgb(${random(255)}, ${random(255)}, ${random(255)})`;
            }else if(progressiveDarknessIsOn){
                let opacity = Number(item.dataset.opacity);

                // Increase opacity by 0.1 (10%)
                if(opacity < 1){
                    opacity += 0.1;
                    opacity = Math.min(opacity, 1); // cap at 1

                    // Store new opacity
                    item.dataset.opacity = opacity;
                    // Apply new opacity
                    const [r, g, b] = hexToRgb(colorPicker.value);
                    item.style.backgroundColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
                }



                
            }else{
                item.style.backgroundColor = colorPicker.value;
                
            }
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


const clearBtn = document.querySelector(".clear");
clearBtn.addEventListener('click', () =>{
    items.forEach(item => item.style.backgroundColor = 'aliceblue');
})