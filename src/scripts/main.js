class Game {
    constructor() {
        this.view = {
            squares: document.querySelectorAll(".square"),
            enemy: document.querySelector(".enemy"),
            timeLeft: document.querySelector("#time-left"),
            score: document.querySelector("#score"),
            life: document.querySelector("#life"),
        };
        this.values = {
            gameVelocity: 1000,
            hitPosition: 0,
            result: 0,
            curretTime: 60,
            lifeCount: 3,
        };
    }

    countDown() {
        this.values.curretTime--;
        this.view.timeLeft.textContent = this.values.curretTime;

        if (this.values.curretTime <= 0 || this.values.lifeCount <= 0) {
            clearInterval(this.actions.countDownTimerId);
            clearInterval(this.actions.timerId);
            alert("Game Over! O seu resultado foi: " + this.values.result);
        }
    }

    playSound(audioName) {
        let audio = new Audio(`./src/audio/${audioName}.m4a`);
        audio.volume = 0.2;
        audio.play();
    }

    randomSquare() {
        this.view.squares.forEach((square) => {
            square.classList.remove("enemy");
        });

        let randomNumber = Math.floor(Math.random() * 9);
        let randomSquare = this.view.squares[randomNumber];
        randomSquare.classList.add("enemy");
        this.values.hitPosition = randomSquare.id;
    }

    addListenerHitBox() {
        this.view.squares.forEach((square) => {
            square.addEventListener("mousedown", () => {
                if (square.id === this.values.hitPosition) {
                    this.values.result++;
                    this.view.score.textContent = this.values.result;
                    this.values.hitPosition = null;
                    this.playSound("hit");
                } else {
                    this.values.lifeCount--;
                    this.view.life.textContent = this.values.lifeCount;
                }
            });
        });
    }

    startGame() {
        if (confirm("O jogo vai começar. Você está pronto?")) {
            this.actions = {
                timerId: setInterval(this.randomSquare.bind(this), 1000),
                countDownTimerId: setInterval(this.countDown.bind(this), 1000),
            };
            this.addListenerHitBox();
        }
    }
}

let game = new Game();
game.startGame();
