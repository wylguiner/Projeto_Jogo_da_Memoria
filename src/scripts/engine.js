//salva os emojis
const emojis = [
    "❤",
    "❤",
    "💲",
    "💲",
    "🤡",
    "🤡",
    "🤘",
    "🤘",
    "🥼",
    "🥼",
    "🍔",
    "🍔",
    "🚗",
    "🚗",
    "👁",
    "👁"
];

// states do jogo
const state = {
    view:  {
        difficulty: document.querySelectorAll('input[type="radio"][name="difficulty"]'),
        lives: document.getElementById("lives"),
    },
    values: {
        currentLife: 10,
    },
    button: document.getElementById("start-game"),
    reset: document.getElementById("reset")
}

// vetor para guardar as cartas abertas
let openCards = [];

// variável para guardar os emojis embaralhados
let shuffleEmojis = emojis.sort(() =>(Math.random() > 0.5 ? 2: -1));

// função para embaralhar e desenhar os elementos na tela
function shuffle(){
    for (let i = 0; i < emojis.length; i++) {
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = shuffleEmojis[i];
        box.onclick = handleClick;
        document.querySelector(".game").appendChild(box);  
    }    
}

// função para checar a dificuldade
function checkDifficulty() {
    state.view.difficulty.forEach(radioButton => {
        radioButton.addEventListener('change', () => {
            if (radioButton.checked) {
                switch (radioButton.value) {
                    case 'facil':
                        state.view.lives.textContent = "10";
                        state.values.currentLife = 10;
                        break;
                    case 'medio':
                        state.view.lives.textContent = "7";
                        state.values.currentLife = 7;
                        break;
                    case 'dificil':
                        state.view.lives.textContent = "3";
                        state.values.currentLife = 3;
                        break;
                    case 'impossivel':
                        state.view.lives.textContent = "1";
                        state.values.currentLife = 1;
                        break;
                    default:
                        state.view.lives.textContent = "x";
                }
            }
        })
    })
}

// função para checar as cartas abertas
function handleClick() {
    if(openCards.length < 2 ){
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if(openCards.length == 2) {
        setTimeout(checkMatch, 500);
    }
}

// função para checar se acertou ou não
function checkMatch() {
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        state.values.currentLife--;
        state.view.lives.textContent = state.values.currentLife;
        if(state.values.currentLife <=0){
            alert("Você perdeu :(");
            location.reload();
        }
    }

    openCards = [];

    if(document.querySelectorAll(".boxMatch").length === emojis.length) {
        alert("Você venceu com " + state.values.currentLife + " vida(s) sobrando!");
    }
}

checkDifficulty();

function startGame() {
    state.button.addEventListener("mousedown", () => {
        state.button.style.display = "none";
        state.reset.style.visibility = "visible";
        shuffle();
        state.view.difficulty.forEach(radioButton => {
            radioButton.disabled = true;
        })
    })
}

function init() {
    startGame();   
}

init();

