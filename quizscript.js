
/*
CS 81 Spring 2020
Professor AnthonyWang
Final project Vladimir Palenov
*/
//assigning variables to elements of the quiz
let startBtn = document.getElementById('start-btn');
let nextBtn = document.getElementById('next-btn');
let quizContainer = document.getElementById('question-container');
let answBtns = document.getElementById('answer-buttons');
let questionElem = document.getElementById('question');
let resultMessage = document.getElementById('result');
//index of the question in the array
let quizIndex = 0;
let score = 0;

// Adding event Listeners. Clicking start button starts the game, next button shows next question
startBtn.addEventListener('click', startQuiz);
nextBtn.addEventListener('click', () => {
  quizIndex++;
  nextQuiz();
});
//Starting the quiz. Start button is being hidden and the questions become visible
function startQuiz() {
  startBtn.classList.add('hide');
  quizContainer.classList.remove('hide');
  nextQuiz();
}
//this function shows quiz questions and displays next button when the answer is chosen
function nextQuiz() {
  nextBtn.classList.add('hide');
  while (answBtns.firstChild) {
    answBtns.removeChild(answBtns.firstChild)
  }
  questionElem.innerText = questions[quizIndex].question;
  questions[quizIndex].answers.forEach(answer => {
    let button = document.createElement('button');
    button.innerText = answer.text;
    button.classList.add('btn');
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener('click', answerCheck);
    answBtns.appendChild(button);
  })
}
//this function sets status true or false values for the answer buttons, keeps tracking
//of the score and displays final result with restart button 
function answerCheck(elem) {
  const selectBttn = elem.target;
  const correct = selectBttn.dataset.correct;
  if(correct){score++;}
  Array.from(answBtns.children).forEach(button => {
    statusSet(button, button.dataset.correct);
  })
  if (questions.length > quizIndex + 1) {
    nextBtn.classList.remove('hide');
  } else {
    startBtn.innerText = howGoodAreYou(questions, score) + '\n Click to restart';
    startBtn.classList.remove('hide');
    quizIndex = 0;
    score = 0;
  }
}
//this function removes previously setted status and sets new status for the answer buttons 
function statusSet(elem, correct){
  elem.classList.remove('correct');
  elem.classList.remove('wrong');
  if (correct) {
    elem.classList.add('correct');
  } else {
    elem.classList.add('wrong');
  }
}
//this function resets answer buttons to default 
function resetDefault() {
  nextBtn.classList.add('hide')
  while (answBtns.firstChild) {
    answBtns.removeChild(answBtns.firstChild)
  }
}
//this function returns a string based on result of the quiz
function howGoodAreYou(arr, points) {
	let max = arr.length;
	let result;
	if (points == max){
		result = "Excellent! Your score is: " + points + "/" + max +". You are a professional Chef!";
	} else if(points >= max * 0.8){
		result = "Good job! Your score is: " + points + "/" + max +".";
	} else if(points >= max * 0.5){
		result = "You know how to cook! Your score is: " + points + "/" + max +".";
	} else{
		result = "You need to learn more about cooking! Your score is: " + points + "/" + max +".";
	}
	return result;
}
//array of key-value objects with questions and answers
const questions = [
  {
    question: 'What is the perfect temperature for baking cookies?',
    answers: [
      { text: '350\u00B0F', correct: true },
      { text: '220\u00B0F', correct: false },
      { text: '550\u00B0F', correct: false },
      { text: '900\u00B0F', correct: false }
    ]
  },
  {
    question: 'How many teaspoons are in the tablespoon?',
    answers: [
      { text: '1', correct: false },
      { text: '2', correct: false },
      { text: '3', correct: true },
      { text: '4', correct: false }
    ]
  },
  {
    question: 'What is the safe temperature for storing raw meat?',
    answers: [
      { text: 'Below 20\u00B0F', correct: true },
      { text: 'Below 50\u00B0F', correct: false },
      { text: 'Below 65\u00B0F', correct: false },
      { text: 'Below 40\u00B0F', correct: true }
    ]
  },
  {
    question: 'Foods that are poached are cooked with what?',
    answers: [
      { text: 'Oil', correct: false },
      { text: 'Water', correct: true },
      { text: 'Wine', correct: false },
      { text: 'Milk', correct: false }
    ]
  },
    {
    question: 'What is the name of the person who makes sauces in a professional kitchen?',
    answers: [
      { text: 'Saucier', correct: true },
      { text: 'Sous chef', correct: false },
      { text: 'Saucepertise', correct: false },
      { text: 'Sommelier', correct: false }
    ]
  },
      {
    question: 'How hot should the inside of a steak be before you take it off the grill?',
    answers: [
      { text: '100\u00B0F', correct: false },
      { text: '210\u00B0F', correct: false },
      { text: '160\u00B0F', correct: true },
      { text: '580\u00B0F', correct: false }
    ]
  }, 
      {
    question: 'What is the safest place to defrost food?',
    answers: [
      { text: 'Refrigerator', correct: true },
      { text: 'Kitchen counter', correct: false },
      { text: 'Microwave', correct: false },
      { text: 'Kitchen sink', correct: false }
    ]
  },
  {
    question: 'How long can frozen chicken remain fresh in its original packaging?',
    answers: [
      { text: '6 months', correct: false },
      { text: '12 months', correct: false },
      { text: '2 months', correct: true },
      { text: '9 months', correct: false }
    ]
  },
    {
    question: 'Which of the following foods should NOT be stored in a freezer?',
    answers: [
      { text: 'Fruits', correct: false },
      { text: 'Meat', correct: false },
      { text: 'Eggs', correct: true },
      { text: 'Bread', correct: false }
    ]
  },
      {
    question: 'What can you use to seal wooden cutting boards to prevent from nesting bacteria?',
    answers: [
      { text: 'Mineral oil', correct: true },
      { text: 'Olive oil', correct: false },
      { text: 'Canola oil', correct: false },
      { text: 'Grapeseed oil', correct: false }
    ]
  }
]
