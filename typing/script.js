window.addEventListener('load', init);

// Global Variables
const currentLevel = 2;
const goalIndex = 10;

let time = currentLevel;
let score = 0;
let wordIndex = 0;
let isFail = false;
let isFinished = false;
let isPlaying;

// DOM Elements

const wordInput = document.getElementById('word-input');
const currentWord = document.getElementById('current-word');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const messageDisplay = document.getElementById('message');
const seconds = document.getElementById('seconds');
const btnContinuar = document.getElementById('fin-btn');

const words = [
'bien',
'venida',
'estamos',
'aqui',
'para',
'comemorar',
'su',
'cumpleanos',
'te',
'amamos',
'muito',
];

// Initialize Game

function init(){
    // Show number of seconds on ui
    seconds.innerHTML = currentLevel + ' segundos';
    // Load a word From array
    showWord(words);
    // Match Words
    wordInput.addEventListener('input', startMatch);
    // Call countddown timer
    setInterval(countdown, 1000);
    // check status
    setInterval(checkStatus, 50);
}
// Start Match

function startMatch(){

    if(matchWords()){
        isPlaying = true;
        time = currentLevel + 1;
        showWord(words);
        wordInput.value = '';
        score++;
    }

    if(score === -1){
        scoreDisplay.innerHTML = 0;
    } else{
        scoreDisplay.innerHTML = score;
    }
}

function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        if(wordIndex < goalIndex){
            wordIndex++;
        } else {
            isFinished = true;
        }

        messageDisplay.innerHTML = 'Correct!!!';
        messageDisplay.style.color = 'green';
        return true;
    }else {
        messageDisplay.innerHTML = '';
        return false;
    }
}

function showWord(words){
    if(isFail) {
        wordIndex = 0;
        isFail = false;
    }

    if(!isFinished) {
        const index = wordIndex;
        currentWord.innerHTML = words[index];
    } else {
        btnContinuar.style.display = 'block';
    }
}

function countdown(){
    if(time > 0){
        time--;
    }
    else if(time === 0){
        isPlaying = false;
    }
    timeDisplay.innerHTML = time;
}

function checkStatus(){
    if(!isFinished){
        if(!isPlaying && time===0){
            score = 0;
            isFail = true;
            messageDisplay.innerHTML = 'Game Over !!!';
            messageDisplay.style.color = 'red';
        }
    }
}