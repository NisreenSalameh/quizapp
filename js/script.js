const questions = [
    {
        question : 'What is the capital city of France?',
        answers: [
            { text: "Berlin", correct: false},
            { text: "Madrid", correct: false},
            { text: "Paris", correct: true},
            { text: "Rome", correct: false},
        ]
    },
    {
        question : 'Which planet is known as the "Red Planet"?',
        answers: [
            { text: "Venus", correct: false},
            { text: "Mars", correct: true},
            { text: "Jupiter", correct: false},
            { text: "Saturn", correct: false},
        ]
    },
    {
        question : 'In what year did the Titanic sink?',
        answers: [
            { text: "1905", correct: false},
            { text: "1912", correct: true},
            { text: "1920", correct: false},
            { text: "1931", correct: false},
        ]
    },
    {
        question : 'Who wrote the play "Romeo and Juliet"?',
        answers: [
            { text: "Charles Dickens", correct: false},
            { text: "William Shakespeare", correct: true},
            { text: "Jane Austen", correct: false},
            { text: "Mark Twain", correct: false},
        ]
    },
    {
        question : 'What is the capital city of Japan?',
        answers: [
            { text: "Beijing", correct: false},
            { text: "Tokyo ", correct: true},
            { text: "Seoul", correct: false},
            { text: "Bangkok", correct: false},
        ]
    },
    {
        question : 'Which of the following elements is a noble gas?',
        answers: [
            { text: "Oxygen", correct: false},
            { text: "Sodium ", correct: false},
            { text: "Helium", correct: true},
            { text: "Fluorine", correct: false},
        ]
    },
    {
        question : 'What is the largest mammal in the world?',
        answers: [
            { text: "Blue Whale", correct: true},
            { text: "Sodium ", correct: false},
            { text: "Giraffe", correct: false},
            { text: "Gorilla", correct: false},
        ]
    },
    {
        question : 'Which continent is the Sahara Desert located in?',
        answers: [
            { text: "South America", correct: false},
            { text: "Asia ", correct: false},
            { text: "Australia", correct: false},
            { text: "Africa", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState(); //reset previous question and answer
    let currentQuestion = questions[currentQuestionIndex];
    let questionNumber = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNumber + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `Your score is ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if (currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();

