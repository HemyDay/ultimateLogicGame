allCells = document.querySelectorAll('.cell');

// Input Management
document.addEventListener('keydown', function (event){keyboardInput(event.key)});

// Default starting selectedCell = 0
let selectedCell = undefined;


// Function to handle selection of a cell
function clickedCell(cell){
    allCells.forEach(cell => {cell.setAttribute('selected', "false")});
    document.getElementById(cell.id).setAttribute('selected',"true");
    selectedCell = document.getElementById(cell.id);
}

// addEventListener to all cells
function addEventListenerForSelection(){
    allCells.forEach(function (cell) {
        if (cell.getAttribute("writeable") == "true") {
            cell.addEventListener("click", function (){clickedCell(cell);}); 
        }
    });
}


// Replace innerHTML of a cell with the inputed number between 1 and 9
function keyboardInput(input){

    let nbInput = Number(input);

    maxVal = selectedCell.getAttribute('max');
    minVal = selectedCell.getAttribute('min');

    if (nbInput >= minVal && nbInput <= maxVal) {
        selectedCell.setAttribute('value', nbInput);
        updateValueDisplayForCells();
    };

    
}

// Function that updates all cells so they display their VALUE
function updateValueDisplayForCells(){
    allCells.forEach(function (cell) {
        if (cell.getAttribute('value') != 'null') {
            cell.innerHTML = cell.getAttribute('value');
        }
    });
}

addEventListenerForSelection();
updateValueDisplayForCells();