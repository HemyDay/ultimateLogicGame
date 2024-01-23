
// AN ARRY OF COLOR TO USE TO DIFERENCIATE STUFF
const COLORS = ['aliceblue','chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan', 'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 'darkkhaki', 'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue', 'firebrick', 'floralwhite', 'forestgreen', 'fuchsia', 'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow', 'honeydew', 'hotpink', 'indianred', 'indigo', 'ivory', 'khaki', 'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen', 'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid'];

// CSS properties for border of zones
const ACCENT_BORDER_STYLE = '1px solid black'


//  ---------------------------------------------------------------- GAME TEMPLATES  ----------------------------------------------------------------  //

// STORED TEMPLATE FOR A SUDOKU GRID
const GRID_TEMPLATE_SUDOKU = [ 
    {
    values : [
        [    9 , null ,    4 , null ,    5 , null ,    3 , null ,    6 ] ,
        [ null ,    3 ,    6 ,    3 , null ,    1 ,    9 ,   7  , null ] ,
        [    1 , null , null ,    8 , null,     6 , null , null ,    5 ] ,
        [ null ,    1 , null , null ,    3 , null , null ,    2 , null ] ,
        [ null ,    9 ,    7 ,    2 , null ,    4 ,    6 ,    5 , null ] ,
        [ null ,    3 , null , null ,    7 , null , null ,    8 , null ] ,
        [    3 , null , null ,    5 , null ,    7 , null , null ,    2 ] ,
        [ null ,    6 ,    8 ,    1 , null ,    9 ,    5 ,    3 , null ] ,
        [    2 , null ,    1 , null ,    6 , null ,    8 , null ,    7 ] ] ,

    zones : [
        [ '1.1' , '1.2' , '1.3' , '2.1' , '2.2' , '2.3' , '3.1' , '3.2' , '3.3' ] ,
        [ '1.4' , '1.5' , '1.6' , '2.4' , '2.5' , '2.6' , '3.4' , '3.5' , '3.6' ] ,
        [ '1.7' , '1.8' , '1.9' , '2.7' , '2.8' , '2.9' , '3.7' , '3.8' , '3.9' ] ,
        [ '4.1' , '4.2' , '4.3' , '5.1' , '5.2' , '5.3' , '6.1' , '6.2' , '6.3' ] ,
        [ '4.4' , '4.5' , '4.6' , '5.4' , '5.5' , '5.6' , '6.4' , '6.5' , '6.6' ] ,
        [ '4.7' , '4.8' , '4.9' , '5.7' , '5.8' , '5.9' , '6.7' , '6.8' , '6.9' ] ,
        [ '7.1' , '7.2' , '7.3' , '8.1' , '8.2' , '8.3' , '9.1' , '9.2' , '9.3' ] ,
        [ '7.4' , '7.5' , '7.6' , '8.4' , '8.5' , '8.6' , '9.4' , '9.5' , '9.6' ] ,
        [ '7.7' , '7.8' , '7.9' , '8.7' , '8.8' , '8.9' , '9.7' , '9.8' , '9.9' ] ,

        ]
    }
]

// STORED TEMPLATE FOR A BINERO GRID
const GRID_TEMPLATE_BINERO = [
    {
    values : [
        [ null , null , null , null ,    0 , null ,    1 , null , null , null ] ,
        [ null ,    0 ,    1 , null , null , null , null , null ,    0 ,    0 ] ,
        [ null , null , null ,    0 , null , null ,    1 , null , null , null ] ,
        [    0 , null ,    1 , null , null , null , null , null ,    1 , null ] ,
        [ null ,    0 , null , null ,    1 , null , null , null ,    1 ,    1 ] ,
        [    1 , null , null ,    1 ,    1 , null ,    0 , null , null , null ] ,
        [    1 , null , null , null , null ,    0 , null , null , null ,    0 ] ,
        [ null ,    0 , null , null , null , null , null , null ,    0 , null ] ,
        [ null , null , null , null ,    0 , null , null ,    1 , null , null ] ,
        [    0 ,    1 , null , null ,    1 , null ,    0 , null , null ,    1 ] ] ,
    zones : []
    }    
]

// STORED TEMPLATE FOR A TECTONIC GRID
const GRID_TEMPLATE_TECTONIC = [ 
    {
    values : [
        [ null ,    3 , null , null , null ,    2 ] ,
        [ null , null , null , null ,    4 , null ] ,
        [ null ,    5 , null , null , null,  null ] ,
        [ null , null , null ,    4 , null , null ] ,
        [    3 , null , null , null , null ,    2 ] ,
        [ null , null , null ,    3 , null , null ] ] ,

    zones : [
        [ '1.1' ] ,
        [ '1.2' , '1.3' , '1.4' , '1.5' , '1.6' ] ,
        [ '2.1' , '2.2' , '3.1' , '3.2' , '3.3' ] ,
        [ '2.3' , '2.4' , '2.5' , '2.6' , '3.4' ] ,
        [ '4.1' , '5.1' , '5.2' , '6.1' , '6.2' ] ,
        [ '6.3' ] ,
        [ '4.2' , '4.3' , '5.3' , '5.4' , '6.4' ] ,
        [ '4.4' , '4.5' , '4.6' , '3.5' , '3.6' ] ,
        [ '6.6' , '5.6' , '5.5' , '6.5' ] ,

        ]
    }
]

// STORED TEMPLATE FOR A YAKAZU GRID
const GRID_TEMPLATE_YAKAZU = [ 
    {
    values : [
        [    2 , null ,    3 , null , null , 'bk' , null , null , null ] ,
        [ null , null , 'bk' , 'bk' , null ,    3 , null , null , null ] ,
        [ 'bk' , 'bk' , null , null , null , 'bk' , null , 'bk' ,    6 ] ,
        [ null , null , 'bk' , null , null , null , null ,    2 , null ] ,
        [ null , null , null , null , 'bk' , null , null , null , null ] ,
        [    3 , 'bk' , null , 'bk' , 'bk' ,    2 , null , 'bk' , null ] ,
        [    2 , null , null , null , 'bk' , null , null , 'bk' , 'bk' ] ,
        [ null , 'bk' , null , null ,    1 , 'bk' , 'bk' , null , null ] ,
        [ null ,    7 , null , null , null ,    8 , null , null , 'bk' ] ] ,

    zones : []
    }
]


//  ---------------------------------------------------------------- FUNCTIONS DECLARATIONS  ----------------------------------------------------------------  //


function drawBorderOfZones(gameType){
    let allCells = document.querySelectorAll(`.cell.${gameType}`)
    allCells.forEach( function (cell) {
        let cellID = cell.getAttribute("id").split(".");
        let R = Number(cellID[0]);     // row number
        let C = Number(cellID[1]);     // column number
        let Z = Number(cellID[2]);     // zone number

        // CHECK LEFT 
        if (document.querySelector(`.${gameType}[id='${R}.${C-1}.${Z}']`) == null) {cell.style.borderLeft = ACCENT_BORDER_STYLE;}

        // CHECK UP
        if (document.querySelector(`.${gameType}[id='${R-1}.${C}.${Z}']`) == null) {cell.style.borderTop = ACCENT_BORDER_STYLE;}

        // CHECK RIGHT
        if (document.querySelector(`.${gameType}[id='${R}.${C+1}.${Z}']`) == null) {cell.style.borderRight = ACCENT_BORDER_STYLE;}

        // CHECK DOWN
        if (document.querySelector(`.${gameType}[id='${R+1}.${C}.${Z}']`) == null) {cell.style.borderBottom = ACCENT_BORDER_STYLE;}


        
    });
}

function drawZones(template, gameType){
    // Pour chaque index dans le .zone (le nombre de zones)
    for (let z = 0; z < template.zones.length; z++) {

        // pour chaque élément de cette zone
        for (let o = 0; o < template.zones[z].length; o++) {

            // récupère l'élément correspondant à l'id dans l'array zone
            cell = document.querySelector(`.${gameType}[id="${template.zones[z][o]}"]`)

            // lui donne une couleur en fonction de sa zone
            // cell.style.backgroundColor = COLORS[z];

            // change son id en ajoutant son numéro de zone
            cell.setAttribute('id', `${cell.getAttribute('id')}.${z+1}`)
        }
    }

    // DRAW THE BORDERS OF THE ZONE
    drawBorderOfZones(gameType);
}

function generateGrid(template, elementHTML, gameType){
    // SET GRID ENVIRONEMENT
    elementHTML.style.display = "grid";
    elementHTML.style.gridTemplateRows = `repeat(${template.values.length}, 50px)`
    elementHTML.style.gridTemplateColumns = `repeat(${template.values[0].length}, 50px)`


    // PRINT ALL CELLS WITH AN ID OF ROW.COL
    for (let i = 0; i < template.values.length; i++) {
        for (let j = 0; j < template.values[i].length; j++) {
            if (template.values[i][j] == 'bk') {
                elementHTML.innerHTML += `
                <div 
                writable='false'
                class='cell ${gameType} block' 
                id='${i+1}.${j+1}'> 
                
                </div>`
            } else if (template.values[i][j] !== null) {
                elementHTML.innerHTML += `
                <div 
                writable='false'
                class='cell ${gameType}' 
                id='${i+1}.${j+1}'>
                    ${template.values[i][j]}
                </div>`
            } else {
                elementHTML.innerHTML += `
                <div 
                writable='true'
                class='cell ${gameType}' 
                id='${i+1}.${j+1}'> 
                
                </div>`
            }
        }

    }

    // IF THE GAME HAS ZONES, DETERMINE THE ZONES AND ADD THEIR NUMBER TO THE ID OF THE CELL
    if (template.zones[0] !== undefined) { 
        drawZones(template, gameType)
    };

}

//  ---------------------------------------------------------------- EXECUTED CODE  ----------------------------------------------------------------  //

const GRID_ELEMENT_SUDOKU = document.getElementById('sudokuGrid');
generateGrid(GRID_TEMPLATE_SUDOKU[0], GRID_ELEMENT_SUDOKU, 'sudoku');

const GRID_ELEMENT_BINERO = document.getElementById('bineroGrid');
generateGrid(GRID_TEMPLATE_BINERO[0] , GRID_ELEMENT_BINERO, 'binero');

const GRID_ELEMENT_YAKAZU = document.getElementById('yakazuGrid');
generateGrid(GRID_TEMPLATE_YAKAZU[0] , GRID_ELEMENT_YAKAZU, 'yakazu');

const GRID_ELEMENT_TECTONIC = document.getElementById('tectonicGrid');
generateGrid(GRID_TEMPLATE_TECTONIC[0], GRID_ELEMENT_TECTONIC, 'tectonic');
