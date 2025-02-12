const container = document.querySelector('.container');
const questionBox = document.querySelector('.question');
const choicesBox = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const alert = document.querySelector('.alert');
const startBtn = document.querySelector('.startBtn');
const timer = document.querySelector('.timer');

const quiz = [
    {
        question: "If a train is moving at 72 km/h, how many meters does it travel in 1 second?",
        choices: ["10 m", "20 m", "30 m", "40 m"],
        answer: "20 m"
    },
    {
        question: "A sum of money doubles itself in 5 years at simple interest. What is the rate of interest per annum?",
        choices: ["10%", "15%", "20%", "25%"],
        answer: "20%"
    },
    {
        question: "A and B together can complete a work in 12 days. B alone can do it in 30 days. In how many days can A alone complete the work?",
        choices: ["15 days", "18 days", "20 days", "24 days"],
        answer: "20 days"
    },
    {
        question: "If the average of five consecutive odd numbers is 35, what is the smallest number?",
        choices: ["31", "33", "35", "37"],
        answer: "31"
    },
    {
        question: "What is the next number in the sequence: 2, 6, 12, 20, 30, ?",
        choices: ["36", "38", "42", "44"],
        answer: "42"
    },
    {
        question: "The speed of a boat in still water is 10 km/h. If the speed of the stream is 3 km/h, what is the boat’s effective speed downstream?",
        choices: ["7 km/h", "10 km/h", "13 km/h", "17 km/h"],
        answer: "13 km/h"
    },
    {
        question: "A man walks 3 km east, then 4 km north. How far is he from his starting point?",
        choices: ["3 km", "4 km", "5 km", "7 km"],
        answer: "5 km"
    },
    {
        question: "A number when multiplied by 7 gives the same result as adding 42 to it. What is the number?",
        choices: ["6", "7", "8", "9"],
        answer: "7"
    },
    {
        question: "If a box contains 5 red balls, 3 blue balls, and 2 green balls, what is the probability of drawing a blue ball?",
        choices: ["1/2", "1/5", "3/10", "3/5"],
        answer: "3/10"
    },
    {
        question: "If the perimeter of a square is 24 cm, what is its area?",
        choices: ["24 cm²", "36 cm²", "48 cm²", "64 cm²"],
        answer: "36 cm²"
    }
];


let currentQuestionIndex = 0;
let score = 0;
let quizOver = false;
let timeLeft = 60;
let timerID = null;

const showQuestions = () => {
    const questionDetails = quiz[currentQuestionIndex];
    questionBox.textContent = questionDetails.question;

    choicesBox.textContent = "";
    for (let i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add('choice');
        choicesBox.appendChild(choiceDiv);

        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected');
            }
            else {
                choiceDiv.classList.add('selected');
            }
        });
    }

    if(currentQuestionIndex < quiz.length){
        startTimer();
    }
}


const checkAnswer = () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[currentQuestionIndex].answer) {
        
        displayAlert("Correct Answer!");
        score++;
    }
    else {
        
        displayAlert(`Wrong Answer! ${quiz[currentQuestionIndex].answer} is the Correct Answer`);
    }
    timeLeft = 60;
    currentQuestionIndex++;
    if (currentQuestionIndex < quiz.length) {
        showQuestions();
    }
    else {
        stopTimer();
        showScore();
    }
}


const showScore = () => {
    questionBox.textContent = "";
    choicesBox.textContent = "";
    scoreCard.textContent = `You Scored ${score} out of ${quiz.length}!`;
    displayAlert("You have completed this quiz!");
    nextBtn.textContent = "Play Again";
    quizOver = true;
    timer.style.display = "none";
}


const displayAlert = (msg) => {
    alert.style.display = "block";
    alert.textContent = msg;
    setTimeout(()=>{
        alert.style.display = "none";
    }, 2000);
}


const startTimer = () => {
    clearInterval(timerID); 
    timer.textContent = timeLeft;

    const countDown = ()=>{
        timeLeft--;
        timer.textContent = timeLeft;
        if(timeLeft === 0){
            const confirmUser = confirm("Time Up!!! Do you want to play the quiz again");
            if(confirmUser){
                timeLeft = 15;
                startQuiz();
            }
            else{
                startBtn.style.display = "block";
                container.style.display = "none";
                return;
            }
        }
    }
    timerID = setInterval(countDown, 1000);
}


const stopTimer = () =>{
    clearInterval(timerID);
}


const shuffleQuestions = () =>{
    for(let i=quiz.length-1; i>0; i--){
        const j = Math.floor(Math.random() * (i+1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    currentQuestionIndex = 0;
    showQuestions();
}


const startQuiz = () =>{
    timeLeft = 60;
    timer.style.display = "flex";
    shuffleQuestions();
}

startBtn.addEventListener('click', ()=>{
    startBtn.style.display = "none";
    container.style.display = "block";
    startQuiz();
});

nextBtn.addEventListener('click', () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
      
        displayAlert("Select your answer");
        return;
    }
    if (quizOver) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        currentQuestionIndex = 0;
        quizOver = false;
        score = 0;
        startQuiz();
    }
    else {
        checkAnswer();
    }
});