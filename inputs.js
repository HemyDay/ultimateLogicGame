
// Event listener for keyboard inputs
window.addEventListener("keydown", function (event) {
    if (event.defaultPrevented) {
      return; // Do nothing if the event was already processed
    }
    
    if (Number(event.key) >= 0  && event.key <= 9){
        handleCellValueChange(Number(event.key))
    }

    if (event.key === "Backspace" || event.key === "Delete" || event.key === " "){
        handleCellValueChange(event.key);
    }

    // Cancel the default action to avoid it being handled twice
    event.preventDefault();

}, true);


// Function that executes when the keyboard input is a number or something that resets the value
function handleCellValueChange(key){

    // Check if there is a cell id stored in selectedCell
    if (selectedCell !== null){

        // Gets the cell with its id
        cell = document.getElementById(selectedCell);

        // If the cell is still selected, and if the nb input is one that is within the range of the possible cell value for this game
        if (cell.getAttribute("selected") == "true" && key >= cell.getAttribute("min") && key <= cell.getAttribute("max")){

            // Sets the value of the cell to that nb
            cell.setAttribute("value", key);
            
            // Update display so it shows the new value
            updateCellDisplay(cell);
        } else if (cell.getAttribute("selected") == "true") {
            // Sets the value of the cell to that nb
            cell.setAttribute("value", 'null');
            
            // Update display so it shows the new value
            updateCellDisplay(cell);
        }

    }

}

