const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

context.scale(20, 20);



// create a tetris block variable
const matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0],
];


function createMatrix(column, row) {
    martixArray = [];
    while (row--) {
        martixArray.push(new Array(column).fill(0));
    }
    return martixArray
}

function drawMatrix(matrix,offset) {
    matrix.forEach((row, y) => {
        row.forEach((value, x) => {
            if (value !== 0) {
                context.fillStyle = 'red';
                context.fillRect(x + offset.x, y + offset.y, 1, 1);
            }
        });
    });
}
const player = {
    pos: { x: 5, y: 5 },
    mat: matrix
}

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height)
    drawMatrix(player.mat, player.pos);
}


let dropCount = 0;
let dropInterval = 1000;
let lastTime = 0;


function playerDrop() {
    player.pos.y++;
    dropCount = 0;
}

function update(time = 0) {
    let deltaTime = time - lastTime;
    lastTime = time;
    dropCount += deltaTime-16
    if (dropCount > deltaTime) {
        playerDrop();
    }
    draw();
    requestAnimationFrame(update)
}




document.addEventListener('keydown', event => {
    if (event.keyCode === 37) {
        player.pos.x--;
    }
    else if (event.keyCode === 39) {
        player.pos.x++;

    }
    else if (event.keyCode === 40) {
        playerDrop();

    }
}
);

const arena = createMatrix(12, 20);


update();





