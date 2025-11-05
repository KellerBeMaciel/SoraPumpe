window.addEventListener('load', init);

// Global Variables

let time = 5;
let score = 0;
let isPlaying;

// Levels

const levels = {
    easy : 5,
    medium : 3,
    hard : 2
}

// Change Levels

const currentLevel = levels.medium;

// DOM Elements

const wordInput = document.getElementById('word-input');
const currentWord = document.getElementById('current-word');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const messageDisplay = document.getElementById('message');
const seconds = document.getElementById('seconds');

const words = [
'land',
'Javascript',
'sneeze',
'battle',
'plan',
'tongue',
'shocking',
'kitty',
'sisters',
'Batman',
'oceanic',
'school',
'cent',
'oranges',
'tense',
'sail',
'war',
'dam',
'poor',
'trace',
'jellyfish',
'parsimonious',
'jittery',
'alert',
'pest',
'thing',
'berserk',
'glossy',
'houses',
'man',
'charming',
'pale',
'glass',
'reflect',
'dusty',
'attach',
'auspicious',
'illustrious',
'drum',
'insidious',
'correct',
'bury',
'repulsive',
'handsomely',
'snore',
'power',
'exercise',
'flap',
'materialistic',
'repair'
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
        time = currentLevel +1;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    // if score is -1, display 0
    if(score === -1){
        scoreDisplay.innerHTML = 0;
    } else{
    scoreDisplay.innerHTML = score;
}
}

// Match Current word to the input

function matchWords(){
    if(wordInput.value === currentWord.innerHTML){
        messageDisplay.innerHTML = 'Correct!!!';
        messageDisplay.style.color = 'green';
        return true;
    }else {
        messageDisplay.innerHTML = '';
        return false;
    }
}



// Pick a random word 

function showWord(words){
    // Generate Random Word From Array
    const randIndex = Math.floor(Math.random() * words.length);
    // Show that word 
    currentWord.innerHTML = words[randIndex];

}
// Countdown timer

function countdown(){
    // Make sure time hasn't run out
    if(time > 0){
        // Decrement
        time--;
    }
    else if(time === 0){
        isPlaying = false;
    }
    timeDisplay.innerHTML = time;
}
// check status

function checkStatus(){
    if(!isPlaying && time===0){
        messageDisplay.innerHTML = 'Game Over !!!';
        score = 0;
        messageDisplay.style.color = 'red';
    }
}