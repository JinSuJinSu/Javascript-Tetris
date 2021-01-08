const canvas = document.getElementById("tetris");
const context = canvas.getContext("2d");

context.scale(20, 20);



// create a tetris block variable
let matrix = [
    [0, 0, 0],
    [1, 1, 1],
    [0, 1, 0]
];


function createMatrix(column, row) {
    const martixArray = [];
    while (row--) {
        martixArray.push(new Array(column).fill(0));
    }
    return martixArray;
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
let arena = createMatrix(12, 20);




let player = {
    pos: { x:5, y:5 },
    matrix: matrix
};

function draw() {
    context.fillStyle = '#000';
    context.fillRect(0, 0, canvas.width, canvas.height);
    drawMatrix(arena, { x: 0, y: 0 });
    drawMatrix(player.matrix, player.pos);
}


let dropCount = 0;
let dropInterval = 1000;
let lastTime = 0;



function merge(arena, player) {
    for (let i = 0; i < player.matrix.length; i++) {
        for (let j = 0; j < player.matrix[i].length; j++) {
            if (matrix[i][j] !== 0) {
                arena[i + player.pos.x][j + player.pos.y] = matrix[i][j];
            }
        }
    }
}





function collide(arena, player) {
    const [mat, pos] = [player.matrix, player.pos];
    for (let y = 0; y< mat.length; y++) {
        for (let x = 0; x < mat[y].length; x++) {
            if (mat[y][x] !== 0 && (arena[y + pos.y] && arena[y + pos.y][x + pos.x] !== 0)) {
                return true;
            }
        }

    }
    return false;
}

function playerDrop() {
    player.pos.y++;
    if (collide(arena, player)) {
        player.pos.y--;
        merge(arena, player);
        player.pos.y = 0;
    }
        dropCount = 0;
    }


function update(time = 0) {
    let deltaTime = time - lastTime;
    lastTime = time;
    dropCount += deltaTime - 16;
    if (dropCount > deltaTime) {
        playerDrop();
    }
    draw();
    requestAnimationFrame(update);
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



update();


