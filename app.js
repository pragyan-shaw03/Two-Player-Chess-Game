let PAWN = '<i class="fa-solid fa-chess-pawn"></i>';
let ROOK = '<i class="fa-solid fa-chess-rook"></i>';
let KNIGHT = '<i class="fa-solid fa-chess-knight"></i>';
let BISHOP = '<i class="fa-solid fa-chess-bishop"></i>';
let KING = '<i class="fa-solid fa-chess-king"></i>';
let QUEEN = '<i class="fa-solid fa-chess-queen"></i>';

let displayBoard = [[ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK],
             [PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN],
             ['', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', ''],
             ['', '', '', '', '', '', '', ''],
             [PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN, PAWN],
             [ROOK, KNIGHT, BISHOP, QUEEN, KING, BISHOP, KNIGHT, ROOK]
]
function initialise() {
    const board = document.querySelector('.container');
    let color = true;
    for (let i = 0; i < 8; i++) {
        color = !color;
        for (let j = 0; j < 8; j++) {
            const box = document.createElement('div');
            box.className = 'box';
            box.setAttribute('row', i);
            box.setAttribute('col', j);
            box.innerHTML = displayBoard[i][j];
            board.appendChild(box);
            
            let icon = box.querySelector('i');
            if (icon) icon.setAttribute('id', 'i');
            if (icon) icon.setAttribute('draggable', true);

            if (i < 2 && icon) icon.classList.add('brown');
            else if (icon && i > 5) icon.classList.add('white'); 
            
            if (color) box.style.backgroundColor = '#3636e1';
            else box.style.backgroundColor = '#c0bbbb';
            color = !color;
        }
    }
}
initialise();

let boxes = document.querySelectorAll('.box');
let startRow, startCol, targetRow, targetCol;
boxes.forEach((box) => {
    box.addEventListener('dragstart', dragStart);
    box.addEventListener('dragover', dragOver);
    box.addEventListener('drop', dragDrop);
});
function dragStart(e) {
    startRow = e.target.parentElement.getAttribute('row');
    startCol = e.target.parentElement.getAttribute('col');
    console.log(startRow, startCol);
}
function dragOver(e) {
    e.preventDefault();
}
function dragDrop(e) {
    console.log(e);
    if (e.target.id === 'i') { // if icon is the target element
        let parent = e.target.parentElement; //accessing parent and removing icon
        parent.removeChild(e.target);
        parent.appendChild(document.querySelector(`[row='${startRow}'][col='${startCol}']`).firstChild);
    }
    else { // if box is target
        if (e.target.firstChild) e.target.removeChild(e.target.firstChild); //removing icon if box contains
        e.target.appendChild(document.querySelector(`[row='${startRow}'][col='${startCol}']`).firstChild);
    }
}

