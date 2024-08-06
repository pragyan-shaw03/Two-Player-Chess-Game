let PAWN = '<i class="fa-solid fa-chess-pawn"></i>';
let ROOK = '<i class="fa-solid fa-chess-rook"></i>';
let KNIGHT = '<i class="fa-solid fa-chess-knight"></i>';
let BISHOP = '<i class="fa-solid fa-chess-bishop"></i>';
let KING = '<i class="fa-solid fa-chess-king"></i>';
let QUEEN = '<i class="fa-solid fa-chess-queen"></i>';
let playerGo = 'white';
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
            const piece = document.createElement('div');
            piece.id = 'piece';
            piece.setAttribute('draggable', true);
            piece.innerHTML = displayBoard[i][j];

            box.appendChild(piece);
            
            box.className = 'box';
            box.setAttribute('row', i);
            box.setAttribute('col', j);
            board.appendChild(box);

            if (i < 2) piece.classList.add('brown');
            else if (i > 5) piece.classList.add('white'); 
            
            if (color) box.style.backgroundColor = '#3636e1';
            else box.style.backgroundColor = '#c0bbbb';
            color = !color;
        }
    }
}
initialise();

let boxes = document.querySelectorAll('.box');
let startRow, startCol, targetRow, targetCol;
let draggedElement;


boxes.forEach((box) => {
    box.addEventListener('dragstart', dragStart);
    box.addEventListener('dragover', dragOver);
    box.addEventListener('drop', dragDrop);
});
function dragStart(e) {
    startRow = e.target.parentElement.getAttribute('row');
    startCol = e.target.parentElement.getAttribute('col');
    draggedElement = e.target;
    console.log(startRow, startCol);
}
function dragOver(e) {
    e.preventDefault();
}
function dragDrop(e) {
    console.log(e.target);
    const taken = e.target.id === 'piece';
    if (taken) {
        targetRow = e.target.parentElement.getAttribute('row');
        targetCol = e.target.parentElement.getAttribute('col');
    } else {
        targetRow = e.target.getAttribute('row');
        targetCol = e.target.getAttribute('col');
    }
    console.log(targetRow, targetCol);
    const correctGo = draggedElement.classList.contains(playerGo);
    const selfCapture = taken && e.target.classList.contains(playerGo);
    const valid = checkAllValid();

    if (!correctGo || selfCapture || !checkAllValid()) {
        alert('Wrong Move');
        return;
    }
    if (taken) {
        e.target.parentElement.append(draggedElement);
        e.target.remove();
    }else {
        e.target.appendChild(draggedElement);
    }
    changePlayer();
    reverseId();
}

function reverseId() {
    boxes.forEach((box) => {
        let r = box.getAttribute('row');
        let c = box.getAttribute('col');
        box.setAttribute('row', 7-r);
        box.setAttribute('col', 7-c);
    })
}

function changePlayer() {
    playerGo = playerGo === 'white'? 'brown' : "white";
}

function checkAllValid() {
    let piece = draggedElement.innerHTML;
    switch(piece) {
        case PAWN:
            if (targetCol != startCol) return false;
            if (targetRow == startRow) return false;
            if (startRow == 6) {
                if (startRow - targetRow <= 2 ) return true;
            } else {
                if (startRow - targetRow == 1) return true;
            }
            break;
        default:
            return false;
    }
}