class Snake {
    constructor() {
        this.len = 1;
        this.body = [];
        print(w);
        this.body[0] = createVector(0, 0);
        this.xdir = 0;
        this.ydir = 0;
        this.aim = 2; //上:1右:2下:3左:4
    }

    show() {
        fill(255);
        for (let i = 0; i < this.body.length; i++) {
            fill(255);
            rect(this.body[i].x, this.body[i].y, 1, 1);
        }


    }


    move() {
        let head = this.body[this.body.length - 1].copy();
        switch (this.aim) { //上:1右:2下:3左:4
            case 1:
                head.y += -1;

                break;
            case 2:
                head.x += 1;
                break;
            case 3:
                head.y += 1;

                break;
            case 4:
                head.x += -1;

                break;
            default:
                break;
        }

        this.body.shift();
        this.body.push(head);

        this.show();


    }
    turnLeft() {
        this.aim -= 1;
        if (this.aim < 1) {
            this.aim = 4;
        }

    }
    turnRight() {
        this.aim += 1;
        if (this.aim > 4) {
            this.aim = 1;
        }

    }






    eat(food) {


        let x = this.body[this.body.length - 1].x;
        let y = this.body[this.body.length - 1].y;
        if (x == food.x && y == food.y) {
            print("food eaten");
            this.grow();
            return true;
        } else {
            return false;
        }
    }
    grow() {
        this.len += 1;
        let head = this.body[this.body.length - 1].copy();
        this.body.push(head);
    }
    endGame() {
        let x = this.body[this.body.length - 1].x;
        let y = this.body[this.body.length - 1].y;
        if (x > w - 1 || x < 0 || y > h - 1 || y < 0) {
            return true;
        }
        for (let i = 0; i < this.body.length - 1; i++) {
            let part = this.body[i];
            if (part.x == x && part.y == y) {
                return true;
            }
        }

        return false;
    }
}