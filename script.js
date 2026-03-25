import questions from "./qs.js";

let currentQuestion  = 0;
let correctQuestions = 0;

loadQuestion();
start();

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
    textFinish.innerHTML        = `Você acertou ${correctQuestions} de ${questions.length}`;
    content.style.display       = "none";
    contentFinish.style.display = "flex";
    btnResposta.style.display   = "flex";
}

const btnResposta = document.querySelector(".respBtn");
const btnRestart  = document.querySelector(".finish button");
const btnStart    = document.querySelector(".start button");

btnStart.onclick = () => {
    const contentStart = document.querySelector(".start");
    const content      = document.querySelector(".content");
    content.style.display      = "flex";
    contentStart.style.display = "none";

    currentQuestion  = 0;
    correctQuestions = 0;
    loadQuestion();
};

btnResposta.onclick = () => {
    const contentResposta = document.querySelector(".resposta");
    btnResposta.style.display     = "none";
    contentResposta.style.display = "flex";
}

btnRestart.onclick = () => {
    const contentResposta = document.querySelector(".resposta");
    const contentFinish   = document.querySelector(".finish");
    const content         = document.querySelector(".content");
    content.style.display         = "flex";
    contentFinish.style.display   = "none";
    contentResposta.style.display = "none";
    btnResposta.style.display     = "none";

    currentQuestion  = 0;
    correctQuestions = 0;
    loadQuestion();
};

function nextQuestion(e) {
    if (e.target.getAttribute("data-correct") === "true") {
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
    spnQtd.innerHTML            = `${currentQuestion + 1}/${questions.length}`;
    answerContainer.innerHTML   = "";
    questionContainer.innerHTML = currentQuestionItem.question;

    currentQuestionItem.answers.forEach((answer) => {
        const div = document.createElement("div");

        div.innerHTML = `
        <button class="answer" data-correct="${answer.correct}">
            ${answer.option}
        </button>
        `;

        answerContainer.appendChild(div);
    });
}

document.querySelectorAll(".answer").forEach((item) => {
    item.addEventListener("click", nextQuestion);
});
