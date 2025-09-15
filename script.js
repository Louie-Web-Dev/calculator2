const display = document.getElementById("display");
const music = document.getElementById("music");
const music2 = document.getElementById("music2");
const music3 = document.getElementById("music3");
const music4 = document.getElementById("music4");

let expression = "";
let justEvaluated = false;
let isTypingLyrics = false;

const lyricsSong1 = [
  ["Ang iyong", 3000, 140],
  ["ganda'y", 2500, 140],
  ["umaabot", 1000, 200],
  ["sa buwan 🌕", 3000, 200],
  ["Ang tibok", 2800, 130],
  ["ng puso'y ❤️", 1900, 120],
  ["dinig sa", 1000, 110],
  ["kalawakan 🌌", 1500, 200],
  ["At bumabalik", 1300, 180],
  ["dito sa akin", 1700, 150],
  ["Ikaw ang mahal", 1800, 150],
  ["ikaw lang", 1000, 110],
  ["ang mamahalin", 2000, 140],
  ["Pakinggan", 1100, 120],
  ["ang puso't", 800, 120],
  ["damdamin", 1100, 100],
  ["Damdamin aking damdamin", 2000, 130],
];

function typeLyrics(lyrics) {
  let index = 0;
  isTypingLyrics = true;

  function showNext() {
    if (index < lyrics.length) {
      const [line, delay, speed] = lyrics[index];
      let charIndex = 0;
      display.value = "";
      function typeChar() {
        if (charIndex < line.length) {
          display.value += line[charIndex];
          charIndex++;
          setTimeout(typeChar, speed);
        } else {
          index++;
          setTimeout(showNext, delay);
        }
      }
      typeChar();
    } else {
      display.value = "0";
      expression = "";
      justEvaluated = false;
      isTypingLyrics = false;
    }
  }

  showNext();
}

document.querySelectorAll(".buttons button").forEach((btn) => {
  btn.addEventListener("click", () => {
    const val = btn.textContent;

    if (isTypingLyrics) return;

    if (!isNaN(val) || val === ".") {
      if (display.value === "0" || justEvaluated) {
        display.value = val;
        justEvaluated = false;
      } else {
        display.value += val;
      }
      expression += val;
    } else if (["+", "-", "×", "÷"].includes(val)) {
      display.value += val;
      expression += val === "×" ? "*" : val === "÷" ? "/" : val;
      justEvaluated = false;
    } else if (val === "AC") {
      display.value = "0";
      expression = "";
      justEvaluated = false;
    } else if (val === "+/-") {
      if (display.value.startsWith("-")) {
        display.value = display.value.slice(1);
      } else {
        display.value = "-" + display.value;
      }
      expression = display.value;
    } else if (val === "%") {
      try {
        const result = eval(expression + "/100");
        display.value = result;
        expression = String(result);
      } catch {
        display.value = "Error";
        expression = "";
      }
    } else if (val === "√") {
      try {
        const result = Math.sqrt(eval(expression));
        display.value = result;
        expression = String(result);
      } catch {
        display.value = "Error";
        expression = "";
      }
    } else if (val === "=") {
      try {
        const result = eval(expression);
        display.value = result;
        expression = String(result);
        justEvaluated = true;

        if (expression === "2") {
          music.currentTime = 0;
          music.play();
          typeLyrics(lyricsSong1);
        }
        if (expression === "4") {
          music2.currentTime = 0;
          music2.play();
          typeLyrics(lyricsSong2);
        }
        if (expression === "6") {
          music3.currentTime = 0;
          music3.play();
          typeLyrics(lyricsSong3);
        }
      } catch {
        display.value = "Error";
        expression = "";
      }
    }
  });
});
