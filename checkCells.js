//                  WHAT TO CHECK                 //      //          THE EFFECT          //

// SUDOKU
    // DOUBLE                   | ROW ________________________ BOTH CELLS       | ERROR
    // DOUBLE                   | COL ________________________ BOTH CELLS       | ERROR
    // DOUBLE                   | ZONE _______________________ BOTH CELLS       | ERROR
    // SAME VALUE               | ALL GRID ___________________ ALL DUPLICATES   | HIGHLIGHT

// BINERO
    // 3 OF SAME IN A ROW       | ROW ________________________ THREE CELLS      | ERROR
    // 3 OF SAME IN A ROW       | COL ________________________ THREE CELLS      | ERROR
    // MAXED NUMBER             | ROW ________________________ ALL DUPLICATES   | ERROR
    // MAXED NUMBER             | COL ________________________ ALL DUPLICATES   | ERROR
    // IDENTICAL                | OTHER ROW __________________ BOTH ROW         | ERROR
    // IDENTICAL                | OTHER COL __________________ BOTH COL         | ERROR

// TECTONIC
    // DOUBLE                   | 8 AROUND ___________________ ALL DUPLICATES   | ERROR
    // DOUBLE                   | ZONE _______________________ ALL DUPLICATES   | ERROR
    // SAME VALUE               | ALL GRID ___________________ ALL DUPLICATES   | HIGHLIGHT

// YA'KAZU
    // DOUBLE                   | ROW ________________________ BOTH CELLS       | ERROR 
    // DOUBLE                   | COL ________________________ BOTH CELLS       | ERROR
    // ISN'T POSSIBLE (LENGTH)  | ROW ________________________ CHECKED CELL     | ERROR
    // ISN'T POSSIBLE (LENGTH)  | COL ________________________ CHECKED CELL     | ERROR


    
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
    
        default:
            break;
    }
    if (gameType === 'sudoku'){
        
    }
}


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

