const questionElement = document.getElementById("question");
const userAnswerInput = document.getElementById("userAnswer");
const resultElement = document.getElementById("result");
const submitButton = document.getElementById("submitAnswer");
const nextButton = document.getElementById("nextQuestion");

let currentQuestion = {};
let score = 0;

function generateQuestion() {
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  currentQuestion = { num1, num2, answer: num1 * num2 };
  questionElement.textContent = `Сколько будет ${num1} × ${num2}?`;
  userAnswerInput.value = "";
  resultElement.textContent = "";
}

function checkAnswer() {
  const userAnswer = parseInt(userAnswerInput.value);
  if (userAnswer === currentQuestion.answer) {
    resultElement.textContent = "Правильно!";
    resultElement.style.color = "#4CAF50";
    score++;
  } else {
    resultElement.textContent = `Неправильно. Правильный ответ: ${currentQuestion.answer}`;
    resultElement.style.color = "#d32f2f";
  }
  updateScore();
}

function updateScore() {
  console.log(`Текущий счет: ${score}`);
}

submitButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", generateQuestion);

// Инициализация первого вопроса
generateQuestion();
