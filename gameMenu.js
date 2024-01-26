function generateGameMenu(gameType){
    let menu = document.querySelector(`.${gameType} > .gameMenu`);
    let min = Number(findGridMin(gameType));
    let max = Number(findGridMax(gameType));
    generateNbButtons(gameType, menu, min, max);
}


// Generates in the .menu element a grid with all the possible numbers writeable in the gamegrid
function generateNbButtons(gameType, menu, min, max){

    // Creates a container for the nb buttons and stores it in nbMenu
    menu.innerHTML = `<div class=" .${gameType} nbMenu"></div>`;
    let nbMenu = document.querySelector(`.${gameType} .nbMenu`)

        // for the nb of possible inputs, create a button in the menu
        for (let i = min; i < max+1; i++) {
            // Generate button html
            nbMenu.innerHTML += `<div class='nbButton' value='${i}'>${i}</div>`
        }

        
    // adds an event listener to all buttons that simulates a keyboard input
    let buttons = document.querySelectorAll(`.nbButton`);
    buttons.forEach(function (button) {
        let val = Number(button.getAttribute('value'))
        button.addEventListener("click", function (){handleCellValueChange(val)});
    });
    
}

// Find the biggest max attribute amongst the propreties of all the cells of the game grid
function findGridMax(gameType){
    allCellsForThisGameType = document.querySelectorAll(`.cell.${gameType}`);
    maxFoundValue = 1;
    allCellsForThisGameType.forEach(function (cell) {
        if (cell.getAttribute('max') > maxFoundValue){
            maxFoundValue = cell.getAttribute('max');
        }
    });
    return maxFoundValue;
}

// Find the smallest min attribute amongst the propreties of all the cells of the game grid
function findGridMin(gameType){
    allCellsForThisGameType = document.querySelectorAll(`.cell.${gameType}`);
    minFoundValue = 1;
    allCellsForThisGameType.forEach(function (cell) {
        if (cell.getAttribute('min') < minFoundValue && cell.getAttribute('min') !== 'null' ){
            minFoundValue = cell.getAttribute('min');
        }
    });
    return minFoundValue;
}

