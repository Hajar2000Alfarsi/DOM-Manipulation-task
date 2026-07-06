const questions = [
  {
    question: "What is JavaScript?",
    options: ["Language", "Database", "OS", "Browser"],
    correctAnswer: 0
  },
  {
    question: "Which symbol is used for comments?",
    options: ["//", "/* */", "#", "<!-- -->"],
    correctAnswer: 0
  },
  {
    question: "Which keyword declares a variable?",
    options: ["var", "define", "int", "string"],
    correctAnswer: 0
  },
  {
    question: "Which is a loop?",
    options: ["for", "if", "switch", "break"],
    correctAnswer: 0
  },
  {
    question: "DOM stands for?",
    options: [
      "Document Object Model",
      "Data Object Map",
      "Digital Order Model",
      "None"
    ],
    correctAnswer: 0
  }
];

//Select elements
const quizContainer = document.getElementById("quizContainer");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const resultDisplay = document.getElementById("resultDisplay");

let answersLocked = false;

// 3. Load Questions
function loadQuestions() {
  quizContainer.innerHTML = "";
  answersLocked = false;
  resultDisplay.textContent = "";

  questions.forEach((q, qIndex) => {

    const card = document.createElement("div");
    card.classList.add("question-card");
    card.setAttribute("data-question-index", qIndex);

    const title = document.createElement("h3");
    title.textContent = q.question;
    card.appendChild(title);

    q.options.forEach((opt, optIndex) => {

      const option = document.createElement("div");
      option.classList.add("option");

      option.textContent = opt;
      option.setAttribute("data-option-index", optIndex);

      card.appendChild(option);
    });

    quizContainer.appendChild(card);
  });
}

//Select Answer (Event Delegation)
quizContainer.addEventListener("click", function (e) {

  if (answersLocked) return;

  if (e.target.classList.contains("option")) {

    const option = e.target;
    const questionCard = option.parentElement;

    const questionIndex = Number(questionCard.dataset.questionIndex);
    const optionIndex = Number(option.dataset.optionIndex);

    selectAnswer(questionIndex, optionIndex, option);
  }
});


//Select Answer Logic
function selectAnswer(questionIndex, optionIndex, selectedElement) {

  const questionCard = document.querySelector(
    `[data-question-index="${questionIndex}"]`
  );

  const allOptions = questionCard.querySelectorAll(".option");

  allOptions.forEach(opt => opt.classList.remove("selected"));

  selectedElement.classList.add("selected");
}

//Submit Quiz
submitBtn.addEventListener("click", submitQuiz);

function submitQuiz() {

  let score = 0;
  answersLocked = true;

  const questionCards = document.querySelectorAll(".question-card");

  questionCards.forEach(card => {

    const qIndex = Number(card.dataset.questionIndex);
    const correct = questions[qIndex].correctAnswer;

    const selected = card.querySelector(".option.selected");

    // no answer
    if (!selected) {
      card.classList.add("incorrect");
      return;
    }

    const selectedIndex = Number(selected.dataset.optionIndex);

    if (selectedIndex === correct) {
      score++;
      card.classList.add("correct");
    } else {
      card.classList.add("incorrect");
    }

    // highlight correct answer
    const options = card.querySelectorAll(".option");
    options[correct].classList.add("correct-option");
  });

  resultDisplay.textContent = `You scored ${score} out of ${questions.length}!`;
}

//Reset Quiz
resetBtn.addEventListener("click", resetQuiz);

function resetQuiz() {
  loadQuestions();
}

//Initial Load

loadQuestions();