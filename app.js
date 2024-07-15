const questionElement = document.getElementById("question");
const userAnswerInput = document.getElementById("userAnswer");
const resultElement = document.getElementById("result");
const submitButton = document.getElementById("submitAnswer");
const nextButton = document.getElementById("nextQuestion");
const numberButtons = document.querySelectorAll(".numberButton");
const historyElement = document.getElementById("history");

let currentQuestion = {};
let score = 0;
let selectedNumber = "random";
let questionHistory = [];

function generateQuestion() {
  let num1 =
    selectedNumber === "random"
      ? Math.floor(Math.random() * 10) + 1
      : parseInt(selectedNumber);
  const num2 = Math.floor(Math.random() * 10) + 1;

  currentQuestion = { num1, num2, answer: num1 * num2 };
  questionElement.textContent = `Сколько будет ${num1} × ${num2}?`;
  userAnswerInput.value = "";
  resultElement.textContent = "";
}

function checkAnswer() {
  const userAnswer = parseInt(userAnswerInput.value);
  const isCorrect = userAnswer === currentQuestion.answer;

  if (isCorrect) {
    resultElement.textContent = "Правильно!";
    resultElement.style.color = "#4CAF50";
    score++;
    setTimeout(generateQuestion, 1000); // Переход к следующему вопросу через 1 секунду
  } else {
    resultElement.textContent = `Неправильно. Правильный ответ: ${currentQuestion.answer}`;
    resultElement.style.color = "#d32f2f";
  }

  questionHistory.push({
    question: `${currentQuestion.num1} × ${currentQuestion.num2}`,
    userAnswer,
    correctAnswer: currentQuestion.answer,
    isCorrect,
  });

  updateHistory();
  updateScore();
}

function updateScore() {
  console.log(`Текущий счет: ${score}`);
}

function updateHistory() {
  historyElement.innerHTML = "";
  questionHistory.forEach((item) => {
    const historyItem = document.createElement("div");
    historyItem.classList.add("history-item");
    historyItem.classList.add(item.isCorrect ? "correct" : "incorrect");
    historyItem.textContent = `${item.question} = ${item.userAnswer} (${
      item.isCorrect
        ? "Верно"
        : "Неверно, правильный ответ: " + item.correctAnswer
    })`;
    historyElement.appendChild(historyItem);
  });
}

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    numberButtons.forEach((btn) => btn.classList.remove("selected"));
    button.classList.add("selected");
    selectedNumber = button.getAttribute("data-number");
    generateQuestion();
  });
});

submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", generateQuestion);

// Инициализация первого вопроса
generateQuestion();
