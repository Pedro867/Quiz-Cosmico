import questions from "./qs.js";

// Estado do quiz
let currentQuestion = 0;
let correctQuestions = 0;

// Referências DOM
let content, startScreen, finishScreen, btnResposta, btnRestart, btnStart;

document.addEventListener("DOMContentLoaded", () => {
    content      = document.querySelector(".content");
    startScreen  = document.querySelector(".start");
    finishScreen = document.querySelector(".finish");
    btnResposta  = document.getElementById("respBtn");
    btnRestart   = document.getElementById("restart-btn");
    btnStart     = document.getElementById("start-btn");

    setupEventListeners();

    showStartScreen();
});

function setupEventListeners() {
    btnStart?.addEventListener("click", startQuiz);
    btnResposta?.addEventListener("click", toggleAnswers);
    btnRestart?.addEventListener("click", restartQuiz);
}

function startQuiz() {
    resetGame();
    showQuizScreen();
    loadQuestion();
}

function showStartScreen() {
    const contentElem = document.querySelector(".content");
    const startElem = document.querySelector(".start");
    const finishElem = document.querySelector(".finish");

    if (contentElem) {
        contentElem.classList.add("d-none");
        contentElem.style.display = "none";
    }
    if (startElem) {
        startElem.classList.remove("d-none");
        startElem.style.display = "block";
    }
    if (finishElem) {
        finishElem.classList.add("d-none");
        finishElem.style.display = "none";
    }
}

function showQuizScreen() {
    const contentElem = document.querySelector(".content");
    const startElem = document.querySelector(".start");
    const finishElem = document.querySelector(".finish");

    if (contentElem) {
        contentElem.classList.remove("d-none");
        contentElem.style.display = "block";
    }
    if (startElem) {
        startElem.classList.add("d-none");
        startElem.style.display = "none";
    }
    if (finishElem) {
        finishElem.classList.add("d-none");
        finishElem.style.display = "none";
    }
}

function showFinishScreen() {
    const contentElem = document.querySelector(".content");
    const startElem = document.querySelector(".start");
    const finishElem = document.querySelector(".finish");

    if (contentElem) {
        contentElem.classList.add("d-none");
        contentElem.style.display = "none";
    }
    if (startElem) {
        startElem.classList.add("d-none");
        startElem.style.display = "none";
    }
    if (finishElem) {
        finishElem.classList.remove("d-none");
        finishElem.style.display = "block";
    }

    const scoreSpan = document.querySelector(".finish-score span");
    if (scoreSpan) {
        scoreSpan.textContent = `${correctQuestions}/${questions.length}`;
    }
}

function toggleAnswers() {
    const respostaDiv = document.querySelector(".resposta");
    const answersList = document.querySelector(".answers-list");

    if (respostaDiv && answersList) {
        if (respostaDiv.style.display === "none" || !respostaDiv.style.display) {
            // Preenche as respostas
            answersList.innerHTML = questions.map((q, index) => `
                <div class="mb-2">
                    <strong class="text-info">Questão ${index + 1}:</strong>
                    <span class="text-light">${getCorrectAnswer(q)}</span>
                </div>
            `).join("");

            respostaDiv.style.display = "block";
            btnResposta.innerHTML = '<i class="bi bi-eye-slash"></i> Ocultar Respostas';
        } else {
            respostaDiv.style.display = "none";
            btnResposta.innerHTML = '<i class="bi bi-eye"></i> Ver Respostas';
        }
    }
}

function getCorrectAnswer(question) {
    const correct = question.answers.find(answer => answer.correct === true);
    return correct ? correct.option : "Resposta não encontrada";
}

function restartQuiz() {
    const respostaDiv = document.querySelector(".resposta");
    if (respostaDiv) respostaDiv.style.display = "none";

    resetGame();
    showQuizScreen();
    loadQuestion();

    if (btnResposta) {
        btnResposta.innerHTML = '<i class="bi bi-eye"></i> Ver Respostas';
    }
}

function resetGame() {
    currentQuestion = 0;
    correctQuestions = 0;
}

function finish() {
    showFinishScreen();
}

function nextQuestion(e) {
    const button = e.currentTarget;

    if (button?.dataset.correct === "true") {
        correctQuestions++;
        // Feedback visual de acerto
        button.classList.add("answer-correct");
        setTimeout(() => button.classList.remove("answer-correct"), 1000);
    } else {
        // Feedback visual de erro
        button.classList.add("answer-wrong");
        setTimeout(() => button.classList.remove("answer-wrong"), 1000);
    }

    // Aguarda um pouco para mostrar o feedback antes de avançar
    setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            loadQuestion();
        } else {
            finish();
        }
    }, 1000);
}

function loadQuestion() {
    const currentQuestionItem = questions[currentQuestion];
    const questionContainer = document.querySelector(".question");
    const answerContainer = document.querySelector(".answer");
    const spnQtd = document.querySelector(".spnQtd");

    if (!questionContainer || !answerContainer || !spnQtd) return;

    spnQtd.innerHTML = `<i class="bi bi-question-circle"></i> ${currentQuestion + 1}/${questions.length}`;

    answerContainer.innerHTML = "";
    questionContainer.textContent = currentQuestionItem.question;

    currentQuestionItem.answers.forEach((answer, index) => {
        const button = document.createElement("button");
        button.classList.add("btn", "btn-outline-primary", "btn-lg", "text-start", "p-3");
        button.textContent = answer.option;
        button.dataset.correct = answer.correct;
        button.addEventListener("click", nextQuestion);

        // Adiciona ícone
        const icon = document.createElement("i");
        icon.className = "bi bi-circle me-2";
        button.prepend(icon);

        answerContainer.appendChild(button);
    });
}