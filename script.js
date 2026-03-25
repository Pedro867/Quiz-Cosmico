import questions from "./qs.js";

// Estado do quiz
let currentQuestion  = 0;
let correctQuestions = 0;

// Referências DOM (inicializadas após carregamento)
let btnResposta, btnRestart, btnStart;

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
    btnResposta = document.querySelector(".respBtn");
    btnRestart  = document.querySelector(".finish button");
    btnStart    = document.querySelector(".start button");

    setupEventListeners();

    // Carrega primeira questão
    loadQuestion();
    start();
});

function setupEventListeners() {
    btnStart?.addEventListener("click", handleStart);
    btnResposta?.addEventListener("click", handleShowAnswer);
    btnRestart?.addEventListener("click", handleRestart);
}

function handleStart() {
    const contentStart = document.querySelector(".start");
    const content      = document.querySelector(".content");

    content?.style.setProperty("display", "flex");
    contentStart?.style.setProperty("display", "none");

    resetGame();
    loadQuestion();
}

function handleShowAnswer() {
    const contentResposta = document.querySelector(".resposta");
    btnResposta?.style.setProperty("display", "none");
    contentResposta?.style.setProperty("display", "flex");
}

function handleRestart() {
    const contentResposta = document.querySelector(".resposta");
    const contentFinish   = document.querySelector(".finish");
    const content         = document.querySelector(".content");

    content?.style.setProperty("display", "flex");
    contentFinish?.style.setProperty("display", "none");
    contentResposta?.style.setProperty("display", "none");
    btnResposta?.style.setProperty("display", "none");

    resetGame();
    loadQuestion();
}

function resetGame() {
    currentQuestion  = 0;
    correctQuestions = 0;
}

function start (){
    const contentStart = document.querySelector(".start");
    const content      = document.querySelector(".content");
    content.style.display      = "none";
    contentStart.style.display = "flex";
}

function finish() {
    const contentFinish = document.querySelector(".finish");
    const textFinish    = document.querySelector(".finish span");
    const content       = document.querySelector(".content");
    if (textFinish) {
        textFinish.textContent = `Você acertou ${correctQuestions} de ${questions.length}`;
    }
    content?.style.setProperty("display", "none");
    contentFinish?.style.setProperty("display", "flex");
    btnResposta?.style.setProperty("display", "flex");
}

function nextQuestion(e) {
    const button = e.currentTarget; // Usa currentTarget em vez de target
    if (button?.dataset.correct === "true") {
        correctQuestions++;
    }
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        finish();
    }
}

function loadQuestion() {
    const currentQuestionItem = questions[currentQuestion];
    const questionContainer   = document.querySelector(".question");
    const answerContainer     = document.querySelector(".answer");
    const spnQtd              = document.querySelector(".spnQtd");

    if (!questionContainer || !answerContainer || !spnQtd) return;

    spnQtd.textContent            = `${currentQuestion + 1}/${questions.length}`;
    answerContainer.innerHTML     = "";
    questionContainer.textContent = currentQuestionItem.question;

    // Cria os botões de resposta
    currentQuestionItem.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.classList.add("answer-option"); // Evita conflito de classe
        button.textContent = answer.option;
        button.dataset.correct = answer.correct;
        button.addEventListener("click", nextQuestion);

        answerContainer.appendChild(button);
    });
}

function start() {
    const contentStart = document.querySelector(".start");
    const content      = document.querySelector(".content");

    content?.style.setProperty("display", "none");
    contentStart?.style.setProperty("display", "flex");
}