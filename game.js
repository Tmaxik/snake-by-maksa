var KEYS = {
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40
}

var DEFAULT_COURSE = 'up';

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function Game(matrix, snake) {

    var _this = this;

    document.onkeydown = function(e) {
        e = e || window.event

        switch(e.keyCode)
        {
            case KEYS.LEFT:
                _this.snake.course = 'left';
                break;
            case KEYS.UP:
                _this.snake.course = 'up';
                break;
            case KEYS.RIGHT:
                _this.snake.course = 'right';
                break;
            case KEYS.DOWN:
                _this.snake.course = 'down';
                break;

        }
    }

    this.makeSnake = function() {
        if (_this.snake) {
            for(var i =0; i < _this.snake.body.length; i++) {
                _this.matrix.setCell(_this.snake.body[i].row, _this.snake.body[i].col, false);
            }  
        }
        _this.snake = new Snake(5, 5, DEFAULT_COURSE, 3);
        for(var i =0; i < _this.snake.body.length; i++) {
            _this.matrix.setCell(_this.snake.body[i].row, _this.snake.body[i].col, true);
        }
    }

    this.resetGame = function() {
        alert("you lost");
        _this.makeSnake();         
    }

    this.gameplay = function() {
        var tail = _this.snake.move();
        var head = _this.snake.body[0];

        if ((head.row > _this.matrix.rows || head.row < 1 ||
            head.col > _this.matrix.cols || head.col < 1) ||
            _this.matrix.getCell(head.row, head.col)) {
            _this.resetGame();
            _this.matrix.setCell(tail.row, tail.col, false);
            return;
        }

        if(_this.matrix.getFruit(head.row, head.col)) {
            _this.snake.grow();
            _this.matrix.setFruit(head.row, head.col, false);
            _this.setRandomFruit();
        }

        _this.matrix.setCell(head.row, head.col, true);
        _this.matrix.setCell(tail.row, tail.col, false);
    }



    this.setRandomFruit = function() {
        var fruitRow = getRandomInt(1, _this.matrix.rows);
        var fruitCol = getRandomInt(1, _this.matrix.cols);
        _this.matrix.setFruit(fruitRow, fruitCol, true);
    }


    this.matrix = new Matrix('#matrix1', 20, 20);
    this.matrix.create();
    this.makeSnake();
    this.setRandomFruit();
}

$(document).ready(function() {
    var game = new Game();
    setInterval(game.gameplay, 250);
});

