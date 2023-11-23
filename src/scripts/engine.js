const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector("enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        life: document.querySelector("#life"),
    },
    values: {
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        counterLife: 3,
        points: [],
        bestPontuation: 0,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000),
        countDownTimerId: setInterval(countDown, 1000),
    }
};


function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2
    audio.play()
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);
        console.log("Life: " + state.values.counterLife);
        alert(`Você fez ${state.values.result} pontos`);
        state.values.points.push(state.values.result);
        console.log(state.values.points);
        loseLife();
        resetGame();
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function newGame() {
    state.view.life.textContent = state.values.counterLife
}

function loseLife() {
    state.values.counterLife--
    state.view.life.textContent = state.values.counterLife
}

function resetGame() {
    state.values.result = 0
    state.values.currentTime = 10
    state.actions.timerId = setInterval(randomSquare, 1000)
    state.actions.countDownTimerId = setInterval(countDown, 1000)
    addListenerHitBox()
    countDown()
    if (state.values.counterLife === 0) {
        alert("Game Over! O seu melhor resultado foi: " + bestScore());
        state.values.result = 0
        state.values.counterLife = 3
        state.values.currentTime = 60
        state.values.points = []
        newGame()
        addListenerHitBox()
    }
}

function bestScore() {
    if (state.values.points.length = 3) {
        let arr = state.values.points;
        let max = arr.reduce(function (a, b) {
            return Math.max(a, b);
        }, -Infinity);
        
        return max
    }
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit")
            }
        })
    });

}

function initialize() {
    newGame()
    addListenerHitBox()
}

initialize();