//                  WHAT TO CHECK                 //      //          THE EFFECT          //

// SUDOKU
    // DOUBLE                   | ROW ________________________ BOTH CELLS       | ERROR         DONE
    // DOUBLE                   | COL ________________________ BOTH CELLS       | ERROR         DONE
    // DOUBLE                   | ZONE _______________________ BOTH CELLS       | ERROR         DONE
    // SAME VALUE               | ALL GRID ___________________ ALL DUPLICATES   | HIGHLIGHT

// BINERO
    // 3 OF SAME IN A ROW       | ROW ________________________ THREE CELLS      | ERROR         DONE
    // 3 OF SAME IN A ROW       | COL ________________________ THREE CELLS      | ERROR         DONE
    // MAXED NUMBER             | ROW ________________________ ALL DUPLICATES   | ERROR         
    // MAXED NUMBER             | COL ________________________ ALL DUPLICATES   | ERROR
    // IDENTICAL                | OTHER ROW __________________ BOTH ROW         | ERROR
    // IDENTICAL                | OTHER COL __________________ BOTH COL         | ERROR

// TECTONIC
    // DOUBLE                   | 8 AROUND ___________________ ALL DUPLICATES   | ERROR
    // DOUBLE                   | ZONE _______________________ ALL DUPLICATES   | ERROR
    // SAME VALUE               | ALL GRID ___________________ ALL DUPLICATES   | HIGHLIGHT

// YA'KAZU
    // DOUBLE                   | ROW ________________________ BOTH CELLS       | ERROR         DONE
    // DOUBLE                   | COL ________________________ BOTH CELLS       | ERROR         DONE
    // ISN'T POSSIBLE (LENGTH)  | ROW ________________________ CHECKED CELL     | ERROR         (impossible to input in the first place)
    // ISN'T POSSIBLE (LENGTH)  | COL ________________________ CHECKED CELL     | ERROR         (impossible to input in the first place)


    
function checkCell(cell){
    let gameType = cell.className.split(' ')[1];
    let cellID = cell.getAttribute("id").split(".");
    let rowMatch = undefined;
    let colMatch = undefined;
    let zoneMatch = undefined;

    switch (gameType) {
        case 'sudoku':
            rowMatch = findMatchingSection(cellID[0], gameType, 0);
            findDuplicateWithinSelection(rowMatch, 'errorRow');

            colMatch = findMatchingSection(cellID[1], gameType, 1);
            findDuplicateWithinSelection(colMatch, 'errorCol');

            zoneMatch = findMatchingSection(cellID[2], gameType, 2);
            findDuplicateWithinSelection(zoneMatch, 'errorZone');
        break;
        case 'tectonic':
            zoneMatch = findMatchingSection(cellID[2], gameType, 2);
            findDuplicateWithinSelection(zoneMatch, 'errorZone');
        break;
        case 'binero':
            rowMatch = findMatchingSection(cellID[0], gameType, 0);
            findMultipleInARowWithinSelection(rowMatch, 'errorRow');
            colMatch = findMatchingSection(cellID[1], gameType, 1);
            findMultipleInARowWithinSelection(colMatch, 'errorCol');
            checkIdenticalRowOrCol(0, 'errorZone' , gameType);
            checkIdenticalRowOrCol(1, 'errorZoneTwo' , gameType);
            
        break;
    
        default:
            break;
    }
    if (gameType === 'sudoku'){
        
    }
}


// Returns an array with the cell elements of the same row, column or zone
function findMatchingSection(targetSection, gameType, index){
    let foundMatches = []
    let allCells = document.querySelectorAll(`.cell.${gameType}`);

    allCells.forEach(function (cell) {
        if (cell.getAttribute("id").split(".")[index] === targetSection) {
            foundMatches.push(cell);
        }
    });

    return foundMatches;
}

// Function to finde duplicate within set section (col, row, zone or zoneTwo)
function findDuplicateWithinSelection(section, errorType){


    for (let i = 0; i < section.length; i++) {
        let duplicate = 0;

        for (let j = 0; j < section.length; j++) {

            if (section[i].getAttribute("value") !== 'null'){
                if (section[i].getAttribute("id") !== section[j].getAttribute("id") && section[i].getAttribute("value") == section[j].getAttribute("value") ){
                    section[i].setAttribute(errorType, 'true');
                    section[i].setAttribute(errorType, 'true');

                    duplicate++;
                }
            } 
            
        }

        if (duplicate === 0) (section[i].setAttribute(errorType, 'false'));
        
    }

}

// Function to check if there are 3 or more of the same value in a row
function findMultipleInARowWithinSelection(section, errorType){
    for (let i = 0; i < (section.length); i++) {

        duplicate = 0

        // If the cell value isn't null
        if (section[i].getAttribute("value") !== 'null'){

            // Checks the cells i-2 , i-1 and i
            if (section[i-1] !== undefined && section[i-2] !== undefined) {
                if (section[i-1].getAttribute("value") == section[i].getAttribute("value") 
                &&  section[i-2].getAttribute("value") == section[i].getAttribute("value")){
                    duplicate++
                }
            }

            // Checks the cells i-1 , i and i+1

            if (section[i-1] !== undefined && section[i+1] !== undefined) {
                if (section[i-1].getAttribute("value") == section[i].getAttribute("value") 
                &&  section[i+1].getAttribute("value") == section[i].getAttribute("value")){
                    duplicate++
                }
            }

            // Checks the cells i , i+1 and i+2
            if (section[i+1] !== undefined && section[i+2] !== undefined) {
                if (section[i+1].getAttribute("value") == section[i].getAttribute("value") 
                &&  section[i+2].getAttribute("value") == section[i].getAttribute("value")){
                    duplicate++
                }
            }
        }

        // If duplicates were found in at least one of the cases, then the cells has a duplicate and its errorType is set to true

        if (duplicate !== 0) (section[i].setAttribute(errorType, 'true'))
        else {section[i].setAttribute(errorType, 'false')};
        
    }
}

function checkIdenticalRowOrCol(zone, errorType, gameType){
    // Stores all cells elements in allCells
    let allCells = document.querySelectorAll(`.cell.${gameType}`);

    // Gets the last cell and split its id to determin the max nb of rows or cols
    let lastCell = allCells[allCells.length - 1];
    let nbOfZones = Number(lastCell.getAttribute("id").split(".")[zone]);
    
    let allZones = [];
    let allZonesValues = [];
    // Get all Zones cell elements and stores them in allZones
    // Stores the values of all Zones cells at the same index as allZones as a string
    for (let r = 0; r < nbOfZones; r++) {
        let Zone = findMatchingSection((r+1).toString(), gameType, zone)
        allZones.push(Zone);  
        
        allZonesValues.push(Zone.map((x) => x.getAttribute('value')).join(''));
    }

    // Compares all the Zones and returns matches
    for (let rv = 0; rv < allZones.length; rv++) {

        // Sets the nb of duplicate as 0
        let duplicate = 0;
        
        // If there are no null as values for this Zone 
        if (allZonesValues[rv].indexOf('null') === -1) {

            // Check every Zone to see if there is a match
            allZonesValues.forEach(function (Zone) {

                // If there is a match, adds 1 to duplicate
                if (Zone === allZonesValues[rv]){
                    duplicate++;
                }        
            });
        }

        // if there are more than one duplicate (counting itself), sets the errorZone of all the cells in the Zone as true
        if (duplicate > 1) {
            console.log(`FOUND DUPLICATE : ${rv} -> ${allZonesValues[rv]}`)
            allZones[rv].forEach(function (cell) {
                cell.setAttribute(errorType, 'true');
            });
        
        // If no match has been found, sets the errorZone of all the cells in the Zone as false
        } else {
            allZones[rv].forEach(function (cell) {
                cell.setAttribute(errorType, 'false');
            });
        }
        
    }




}

// function checkIdenticalRowOrCol(zone, errorType, gameType){
//     // Stores all cells elements in allCells
//     let allCells = document.querySelectorAll(`.cell.${gameType}`);

//     // Gets the last cell and split its id to determin the max nb of rows and cols
//     let lastCell = allCells[allCells.length - 1];
//     let nbOfRows = Number(lastCell.getAttribute("id").split(".")[0]);

    
//     let allRows = [];
//     let allRowsValues = [];
//     // Get all rows cell elements and stores them in allRows
//     // Stores the values of all rows cells at the same index as allRows as a string
//     for (let r = 0; r < nbOfRows; r++) {
//         let row = findMatchingSection((r+1).toString(), gameType, 0)
//         allRows.push(row);  
//         allRowsValues.push(row.map((x) => x.getAttribute('value')).join(''));
//     }

//     // Compares all the rows and returns matches
//     for (let rv = 0; rv < allRows.length; rv++) {

//         // Sets the nb of duplicate as 0
//         let duplicate = 0;
        
//         // If there are no null as values for this row 
//         if (allRowsValues[rv].indexOf('null') === -1) {

//             // Check every row to see if there is a match
//             allRowsValues.forEach(function (row) {

//                 // If there is a match, adds 1 to duplicate
//                 if (row === allRowsValues[rv]){
//                     duplicate++;
//                 }        
//             });
//         }

//         // if there are more than one duplicate (counting itself), sets the errorZone of all the cells in the row as true
//         if (duplicate > 1) {
//             console.log(`FOUND DUPLICATE : ${rv} -> ${allRowsValues[rv]}`)
//             allRows[rv].forEach(function (cell) {
//                 cell.setAttribute('errorZone', 'true');
//             });
        
//         // If no match has been found, sets the errorZone of all the cells in the row as false
//         } else {
//             allRows[rv].forEach(function (cell) {
//                 cell.setAttribute('errorZone', 'false');
//             });
//         }
        
//     }




// }