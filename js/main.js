let snake;
let rez = 40;
let food;
let w;
let h;

function setup() {
    createCanvas(400, 400);
    snake = new Snake();
    w = floor(width / rez);
    h = floor(height / rez);
    frameRate(5);
    foodLocation();


}

function foodLocation() {
    let x = floor(random(w));
    let y = floor(random(h));
    food = createVector(x, y);

}


function draw() {
    scale(rez);
    noStroke();
    background(0);
    if (snake.eat(food)) {
        foodLocation();
    }
    readCommand();

    snake.show();
    /*
    if (snake.endGame()) {
        print("End Game");
        background(255, 0, 0);
        noLoop();
    }*/
    fill(255, 0, 0);
    rect(food.x, food.y, 1, 1);
}