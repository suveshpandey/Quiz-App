const questions = [
    {
        question: "What does HTML stand for?",
        answers: [
            { text: "A. Hypertext Markup Language", correct: true },
            { text: "B. Hyperlink Text Markup Language", correct: false },
            { text: "C. Home Tool Markup Language", correct: false },
            { text: "D. Hyper Transfer Markup Language", correct: false },
        ]
    },
    {
        question: "Which company developed the Java programming language?",
        answers: [
            { text: "A. Microsoft", correct: false },
            { text: "B. Sun Microsystems", correct: true },
            { text: "C. Apple", correct: false },
            { text: "D. IBM", correct: false },
        ]
    },
    {
        question: "What is the main function of a router in a network?",
        answers: [
            { text: "A. To store data", correct: false },
            { text: "B. To connect multiple networks and route network traffic", correct: true },
            { text: "C. To provide a user interface", correct: false },
            { text: "D. To encrypt data", correct: false },
        ]
    },
    {
        question: "Who is known as the father of the World Wide Web?",
        answers: [
            { text: "A. Bill Gates", correct: false },
            { text: "B. Steve Jobs", correct: false },
            { text: "C. Tim Berners-Lee", correct: true },
            { text: "D. Mark Zuckerberg", correct: false },
        ]
    },
    {
        question: "Which programming language is primarily used for developing Android applications?",
        answers: [
            { text: "A. Python", correct: false },
            { text: "B. Swift", correct: false },
            { text: "C. Kotlin", correct: true },
            { text: "D. Ruby", correct: false },
        ]
    },
    {
        question: "Which company created the iOS operating system?",
        answers: [
            { text: "A. Google", correct: false },
            { text: "B. Apple", correct: true },
            { text: "C. Microsoft", correct: false },
            { text: "D. IBM", correct: false },
        ]
    },
    {
        question: "What does RAM stand for in computer terms?",
        answers: [
            { text: "A. Random Access Memory", correct: true },
            { text: "B. Read Access Memory", correct: false },
            { text: "C. Run Access Memory", correct: false },
            { text: "D. Readable Access Memory", correct: false },
        ]
    },
    {
        question: "Which technology is primarily used for cryptocurrency transactions?",
        answers: [
            { text: "A. Blockchain", correct: true },
            { text: "B. Cloud Computing", correct: false },
            { text: "C. Quantum Computing", correct: false },
            { text: "D. Artificial Intelligence", correct: false },
        ]
    },
    {
        question: "What is the primary programming language used for web development on the server-side in the LAMP stack?",
        answers: [
            { text: "A. Python", correct: false },
            { text: "B. PHP", correct: true },
            { text: "C. Java", correct: false },
            { text: "D. Ruby", correct: false },
        ]
    },
    {
        question: "Which company is known for developing the Windows operating system?",
        answers: [
            { text: "A. Apple", correct: false },
            { text: "B. Google", correct: false },
            { text: "C. Microsoft", correct: true },
            { text: "D. IBM", correct: false },
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;


function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

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
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const  selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}


// function showScore(){
//     resetState();
//     // questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
//     questionElement.innerHTML = `🏆 You scored ${score} out of ${questions.length}!`;
//     nextButton.innerHTML = "Play Again";
//     nextButton.style.display = "block";
// }

function showScore(){
    resetState();
    let message = "";

    if (score === questions.length) {
        message = "Excellent";
    } else if (score === questions.length - 1 || score === questions.length - 2) {
        message = "Very good";
    } else if (score === questions.length - 3 || score === questions.length - 4) {
        message = "Good";
    } else if (score === questions.length - 5 || score === questions.length - 6) {
        message = "Can be improved";
    } else if (score === questions.length - 4 || score === questions.length - 8) {
        message = "Poor";
    } else {
        message = "Very poor";
    }

    questionElement.innerHTML = `🏆  ${message}, You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}


function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});


startQuiz();




