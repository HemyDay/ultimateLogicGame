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

