//                  WHAT TO CHECK                 //      //          THE EFFECT          //

// SUDOKU
    // DOUBLE                   | ROW ________________________ BOTH CELLS       | ERROR         DONE
    // DOUBLE                   | COL ________________________ BOTH CELLS       | ERROR         DONE
    // DOUBLE                   | ZONE _______________________ BOTH CELLS       | ERROR         DONE
    // SAME VALUE               | ALL GRID ___________________ ALL DUPLICATES   | HIGHLIGHT

// BINERO
    // 3 OF SAME IN A ROW       | ROW ________________________ THREE CELLS      | ERROR         DONE
    // 3 OF SAME IN A ROW       | COL ________________________ THREE CELLS      | ERROR         DONE
    // MAXED NUMBER             | ROW ________________________ ALL DUPLICATES   | ERROR         DONE
    // MAXED NUMBER             | COL ________________________ ALL DUPLICATES   | ERROR         DONE
    // IDENTICAL                | OTHER ROW __________________ BOTH ROW         | ERROR         DONE
    // IDENTICAL                | OTHER COL __________________ BOTH COL         | ERROR         DONE

// TECTONIC
    // DOUBLE                   | 8 AROUND ___________________ ALL DUPLICATES   | ERROR
    // DOUBLE                   | ZONE _______________________ ALL DUPLICATES   | ERROR         DONE
    // SAME VALUE               | ALL GRID ___________________ ALL DUPLICATES   | HIGHLIGHT

// YA'KAZU
    // DOUBLE                   | ROW ________________________ BOTH CELLS       | ERROR         
    // DOUBLE                   | COL ________________________ BOTH CELLS       | ERROR         
    // ISN'T POSSIBLE (LENGTH)  | ROW ________________________ CHECKED CELL     | ERROR         (impossible to input in the first place)
    // ISN'T POSSIBLE (LENGTH)  | COL ________________________ CHECKED CELL     | ERROR         (impossible to input in the first place)


// Function that executes when the user changes the value of a cell
    // cell : the HTML element of the cell that has been changed   
function checkCell(cell){

    // Gets the game type from the class of the cell
    let gameType = cell.className.split(' ')[1];
    
    // Gets the cell ID and splits it as thus : [0] = row, [1] = column and [2] = zone (if it exists)
    let cellID = cell.getAttribute("id").split(".");

    // Finds the cells that are in the same row, col and zone (if it exists)
    let rowMatch = findMatchingSection(cellID[0], gameType, 0);
    let colMatch = findMatchingSection(cellID[1], gameType, 1);
    let zoneMatch = findMatchingSection(cellID[2], gameType, 2) || undefined;

    switch (gameType) {
        case 'sudoku':
            findDuplicateWithinSelection(rowMatch, 'errorRow');
            findDuplicateWithinSelection(colMatch, 'errorCol');
            findDuplicateWithinSelection(zoneMatch, 'errorZone');
        break;

        case 'tectonic':
            findDuplicateWithinSelection(zoneMatch, 'errorZone');
        break;

        case 'binero':
            findMultipleInARowWithinSelection(rowMatch, 'errorRow');
            findMultipleInARowWithinSelection(colMatch, 'errorCol');
            checkIdenticalRowOrCol(0, 'errorZone' , gameType);
            checkIdenticalRowOrCol(1, 'errorZoneTwo' , gameType);
            findOverMaxPossibleNumberWihinSelection(rowMatch, 'errorMaxCol', (rowMatch.length/2));
            findOverMaxPossibleNumberWihinSelection(colMatch, 'errorMaxRow', (colMatch.length/2));
            
        break;

        case 'yakazu':
            findDuplicateWithinSelection(RowOrColForYakazu(rowMatch, cellID, 0, 1, gameType), 'errorRow');
            findDuplicateWithinSelection(RowOrColForYakazu(colMatch, cellID, 1, 0, gameType), 'errorCol');
        break;
    
        default:
            break;
    }
    if (gameType === 'sudoku'){
        
    }
}

function RowOrColForYakazu(sectionMatch, cellID, index, otherIndex, gameType){

    // Store the section as a table where 0 = block and 1 = writable cell
    let thisSectionCut = sectionMatch.map(function (cell) { if (cell.getAttribute('value') == 'bk') { return 0 } else { return 1 }});
    // console.log(`thisSectionCut : ${thisSectionCut}`);
    // console.log(`The row number of this cell is ${cellID[index]}`)

    // Store the index of the cell in the section
    let cellIDForSection = Number(cellID[otherIndex] - 1);
    // console.log(`The index on the row is: ${cellIDForSection}`);
    
    // Stores the index of the start of the section for the given cell
    let sectionStart = cellIDForSection;
    // console.log(`So, we start to count at ${sectionStart}`);

    // Starting at the index of the cell, check if the previous cell is a block or if it is the end of the grid
    for (let i = (cellIDForSection); i > 0; i--) {

        // console.log(`We are looking at the cell at row ${cellID[index]} and col at index ${i}`);

        // Each time it passes the test, adds +1 to section end, indicating the furthest it can go in the index without encountering a block or end of the grid
        if (thisSectionCut[i-1] !== 0 && thisSectionCut[i-1] !== undefined) {
            // console.log(`At index ${i-1} we don't have a block or end of the grid`);
            sectionStart--;

         // If a block or end of grid is found, breaks the loop by setting i to the begining of the grid 
        } else {
            // console.log(`At index ${i-1} we reached a block or end of the grid`);
            i = 0;
        }
    }

    // Stores the index of the start of the section for the given cell
    let sectionEnd = cellIDForSection;
    // console.log(`So, we start to count at ${sectionEnd}`);
    
    // console.log(`SectionEnd : ${sectionEnd}`);

    // Starting at the index of the cell, check if the previous cell is a block or if it is the end of the grid
    for (let i = cellIDForSection; i < thisSectionCut.length; i++) {

        // console.log(`We are looking at the cell at row ${cellID[index]} and col at index ${i}`);

        // Each time it passes the test, adds +1 to section end, indicating the furthest it can go in the index without encountering a block or end of the grid
        if (thisSectionCut[i+1] !== 0 && thisSectionCut[i+1] !== undefined) {
            // console.log(`At index ${i+1} we don't have a block or end of the grid`);
            sectionEnd++;

         // If a block or end of grid is found, breaks the loop by setting i to the begining of the grid 
        } else {
            // console.log(`At index ${i+1} we reached a block or end of the grid`);
            i = thisSectionCut.length;
        }
    }
    
    // console.log(`SectionEnd : ${sectionEnd}`);

    // To translate the index found to the way we labeled our cells with id (starts at 1 instead of 0), we add one to the numbers found
    let min = sectionStart + 1 ;
    let max = sectionEnd + 1;


    // foundMatches will store the cell elements that meet the requirements
    let foundMatches = []

    // Store all cells of the grid in allCells
    let allCells = document.querySelectorAll(`.cell.${gameType}`);

    // For each cell
    allCells.forEach(function (cell) {
        if (cell.getAttribute("id").split(".")[index] === cellID[index]         // if it has the same row / col the cell we are checking
        && cell.getAttribute("id").split(".")[otherIndex] >= min                // if its col / row is above the minimum
        && cell.getAttribute("id").split(".")[otherIndex] <= max){              // if its col / row is below the maximum
            // push the cell elemetn to FoundMatches
            foundMatches.push(cell);
        }
    });

    // Returns the cells that meet the requirements (are in the same zone)
    return foundMatches;


}


// Returns an array with the cell elements of the same row, column or zone
    // targetSection : index of the row or col we want to check
    // gameType : game type as a string
    // index : 0 for rows, 1 for cols and 2 for zones
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

// Function to check if there are more cells with a certain value than what is possible 
    // section : an array with the cells that we want to check
    // errorType : 'errorMaxCol' for columns and 'errorMaxRow' for rows
    // max : the max number of times a value can be found within the section
function findOverMaxPossibleNumberWihinSelection(section, errorType, max){
    // stores the value of each cell in selectionValues
    let sectionValues = section.map((x) => x.getAttribute('value'));
    
    // count will store the nb of occurences of each values
    const count = {};

    // calculate the number of occurences of each value
    for (const element of sectionValues) {
    if (count[element]) {
        count[element] += 1;
    } else {
        count[element] = 1;
    }
    }

    // If the nb of cells with value '0' is bigger than max
    if (count['0'] > max){
        // for each cell in the selection
        section.forEach(function (cell) {
            // if its value is 0, set errorType to true
            if (cell.getAttribute('value') == '0'){
                cell.setAttribute(errorType, 'true');
            
            // if its value is null, set errorType to false
            } else if (cell.getAttribute('value') == 'null'){
                cell.setAttribute(errorType, 'false');
            }
        });

    // If the nb of cells with value '1' is bigger than max    
    } else if (count['1'] > max){
        section.forEach(function (cell) {
            // if its value is 1, set errorType to true
            if (cell.getAttribute('value') == '1'){
                cell.setAttribute(errorType, 'true');

            // if its value is null, set errorType to false
            } else if (cell.getAttribute('value') == 'null'){
                cell.setAttribute(errorType, 'false');
            }
        });

    // if there are no cells with a value that appears more than max, set errorType to false for all cells
    } else {
        section.forEach(function (cell) {
                cell.setAttribute(errorType, 'false');
        });
    }
    
}

// Function to find duplicate within set section (col, row, zone or zoneTwo)
    // section : an array with the cells that we want to check
    // errorType : the error type we want to change
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
    // section : an array with the cells that we want to check
    // errorType : 'errorRow', 'errorCol', 'errorZone' or 'errorZoneTwo'
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

// Function to check if two rows or cols are identical and sets errorZoneTwo to true for all the cells in the duplicate row/col
    // zone = 0 for rows and 1 for cols
    // errorType = 'errorZone' for rows and 'errorZoneTwo' for cols
    // gameType = game type as a string
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

