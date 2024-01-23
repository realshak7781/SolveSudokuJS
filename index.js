let sudokuArray = [];

const inputElements = $('.gridArea .cell input');

for (let i = 0; i < 9; i++) {
  sudokuArray[i] = new Array(9).fill(0);
}


inputElements.each(function (index) {
  $(this).on('input', function () {
    const rowIndex = Math.floor(index / 9);
    const colIndex = index % 9;

    sudokuArray[rowIndex][colIndex] = parseInt($(this).val()) || 0;
  });
});

// writing the code to solve sudoku







function isSafe(row, col, sudoku, val) {
    // Check for row and column for the same element
    for (let i = 0; i < sudoku.length; i++) {
        if (sudoku[row][i] === val || sudoku[i][col] === val) {
            return false;
        }

        // Check for 3*3 matrix
        if (sudoku[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + (i % 3)] === val) {
            return false;
        }
    }
    return true;
}

function getSudokuSolution(sudoku) {
    const n = sudoku.length;

    // Traversing each cell
    for (let row = 0; row < n; row++) {
        for (let col = 0; col < n; col++) {
            // Check if cell is empty
            if (sudoku[row][col] === 0) {
                for (let val = 1; val <= 9; val++) {
                    if (isSafe(row, col, sudoku, val)) {
                        sudoku[row][col] = val;
                        const solution = getSudokuSolution(sudoku);
                        if (solution) {
                            return true;
                        } else {
                            sudoku[row][col] = 0;
                        }
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function solveSudoku(sudoku, callback) {
    getSudokuSolution(sudoku);
    callback(sudoku);
  }
  
  // Call solving sudoku with a callback
 $("#solve").click(function(){
    solveSudoku(sudokuArray, function (result) {
        // write your code here
        inputElements.each(function (index) {
              const rowIndex = Math.floor(index / 9);
              const colIndex = index % 9;
          
             $(this).val( sudokuArray[rowIndex][colIndex] );
            
          });
      });
 });

 $("#reset").click(function(){
    inputElements.each(function (index) {
        const rowIndex = Math.floor(index / 9);
        const colIndex = index % 9;
    
       $(this).val("");
      
    });
 });

 $("input").keydown(function(event) {
    switch (event.key) {
        case 'ArrowUp':
            move(-9); 
            break;
        case 'ArrowDown':
            move(9); 
            break;
        case 'ArrowLeft':
            move(-1);
            break;
        case 'ArrowRight':
            move(1);
            break;
    }
});


// const cells = $('.gridArea .cell input');

// $('input').click(function(){
//     cells.blur();
//     $(this).focus();
// });

 
// function move(offset) {
//     const currentIndex = cells.on('focus').index;
//     const newIndex = currentIndex + offset;

//     // Check if the new index is within bounds
//     if (newIndex >= 0 && newIndex < 9) {
//         cells.blur(); // Remove focus from the current cell
//         cells.eq(newIndex).focus(); // Set focus on the cells
//     }
// }

const cells = $('.gridArea .cell input');

$('input').click(function() {
    cells.blur();
    $(this).focus();
});

$(document).keydown(function(event) {
    switch (event.key) {
        case 'ArrowUp':
            move(0); // Move up by 9 cells
            break;
        case 'ArrowDown':
            move(0); // Move down by 9 cells
            break;
        case 'ArrowLeft':
            move(0); // Move left by 1 cell
            break;
        case 'ArrowRight':
            move(0); // Move right by 1 cell
            break;
    }
});

function move(offset) {
    const currentIndex = cells.index($('input:focus'));
    const newIndex = currentIndex + offset;

    // Check if the new index is within bounds
    if (newIndex >= 0 && newIndex < cells.length) {
        cells.blur(); // Remove focus from the current cell
        cells.eq(newIndex).focus(); // Set focus on the new cell
    }
}
