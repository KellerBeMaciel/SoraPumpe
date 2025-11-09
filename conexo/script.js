/*******************************************************
*               VARIÁVEIS GLOBAIS                     *
*******************************************************
* - attempts: Usamos para Tutorial e Jogo Único
******************************************************/
const MAX_SELECTED = 4;  // Precisamos de 4 palavras
const GRID = document.getElementById("grid");
const TIMER = document.getElementById("timer");

let currentPlayer = null; // Jogador atual
let attempts = 0;         // Usado em tutorial e single
let selectedWords = [];   // Palavras selecionadas no momento

// Cronômetro
let totalSeconds = 0;
let timerInterval = null;

/*******************************************************
* CATEGORIAS
*******************************************************/
const categorias = {
   'OSNI': { 
      words: ["Angelina", "Amelie", "Milo", "Farol"], 
      color: "#435683"
   },
   'MARIDES': { 
      words: ["Sebastian", "Helena", "Jae", "Wriothesley"], 
      color: "#835E43"
   },
   'NATAL MACABRO': { 
      words: ["Alice Lucina", "Jorel", "Melissa", "Cabana"], 
      color: "#8F4462"
   },
   'STARDEW VALEY': { 
      words: ["Robin", "Caroline", "Abigail", "Armazém"], 
      color: "#396747"
   }
};

/********************************************************
* CRONÔMETRO (MIN:SEG)
********************************************************/
function startTimer() {
   if (timerInterval) return;
   timerInterval = setInterval(() => {
      totalSeconds++;
      TIMER.innerText = formatTime(totalSeconds);
   }, 1000);
}

function stopTimer() {
   if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
   }
}

function resetTimer() {
   totalSeconds = 0;
   TIMER.innerText = "00:00";
}

function formatTime(sec) { 
   const m = Math.floor(sec / 60);
   const s = sec % 60;
   const mm = m < 10 ? "0" + m : m;
   const ss = s < 10 ? "0" + s : s;
   return mm + ":" + ss;
}
 
/********************************************************
*  FUNÇÕES DE INICIALIZAÇÃO DE JOGO E CHECK
********************************************************/
function initGame(categories) {
   startTimer();
   const words = [];
   selectedWords = [];
   GRID.innerHTML = "";

   Object.entries(categories).forEach(([cat, data]) => {
      data.words.forEach(word => { words.push({ word, category: cat, color: data.color }); });
   });

   shuffle(words);
   words.forEach(({ word, category, color }) => {
      const button = document.createElement("button");
      button.className = "cell";
      button.innerText = word;
      button.dataset.category = category;
      button.dataset.color = color;

      // Ajusta fonte se a palavra for muito longa
      if (word.length > 15) {
         button.style.fontSize = "12px";
      } else if (word.length > 10) {
         button.style.fontSize = "14px";
      }

      button.addEventListener("click", handleSelection);
      GRID.appendChild(button);
   });
}

function updateAttempts() {
   document.getElementById("attempts").innerText = attempts;
}

function shuffle(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
   return array;
}

function handleSelection(event) {
   const button = event.target;
   if (selectedWords.includes(button)) {
      button.classList.remove("selected");
      selectedWords = selectedWords.filter(b => b !== button);
      return;
   }

   button.classList.add("selected");
   selectedWords.push(button);

   if (selectedWords.length === MAX_SELECTED) {
      attempts++;
      updateAttempts();
      checkSelection();
   }
}
 
function checkSelection() {
   const categoriesSelected = selectedWords.map(btn => btn.dataset.category);
   const uniqueCategories = [...new Set(categoriesSelected)];

   if (uniqueCategories.length === 1) {
      // Grupo correto
      const category = uniqueCategories[0];
      const color = selectedWords[0].dataset.color;

      const bigButton = document.createElement("div");
      bigButton.className = "big-cell";
      bigButton.style.backgroundColor = color;
      bigButton.innerHTML = `
      <strong>${category}</strong>
      <span>${selectedWords.map(btn => btn.innerText).join(", ")}</span>
      `;

      selectedWords.forEach(btn => GRID.removeChild(btn));
      GRID.appendChild(bigButton);
      selectedWords = [];

      if (GRID.querySelectorAll(".cell").length === 0) finishSingleGame();
   } else {
      // E anima
      selectedWords.forEach(btn => btn.classList.add("shake"));
      setTimeout(() => {
         selectedWords.forEach(btn => btn.classList.remove("shake", "selected"));
         selectedWords = [];
      }, 1000);
   }
}
 
function finishSingleGame() {
   stopTimer();
   document.getElementById("completion-section").style.display = "block";
}

initGame(categorias);