const display = document.getElementById("display");
const music = document.getElementById("music");

let num1 = null;
let operator = null;
let waitingForSecond = false;

const lyricsWithTiming = [
   ["Hindi na makalaya", 2300, 140],
  ["Dinadalaw mo 'ko bawat gabi", 1600, 120],
  ["Wala mang nakikita", 2000, 120],
  ["Haplos mo'y ramdam pa rin sa dilim", 1900, 90],
  ["Hindi na nananaginip", 2000, 110],
  ["Hindi na ma-makagising", 2000, 120],
  ["Pasindi na ng ilaw", 2200, 120],
  ["Minumulto na 'ko ng damdamin ko", 900, 120],
  ["Ng damdamin ko", 300, 100],
  ["Hindi mo ba ako lilisanin?", 1000, 100],
  ["hindi pa ba sapat pagpapahirap sa'kin?", 800, 120],
  ["hindi na ba ma-mamamayapa?", 1000, 120],
  ["hindi na ba ma-mamamayapa?", 800, 120],
  ["Hindi na makalaya", 3000, 120],

];

function typeLyrics(index = 0) {
  if (index >= lyricsWithTiming.length) {
    display.value = "0";
    return;
  }

  const [word, delay, typingSpeed] = lyricsWithTiming[index];
  let i = 0;
  display.value = "";

  const interval = setInterval(() => {
    display.value += word[i];
    i++;
    if (i >= word.length) {
      clearInterval(interval);
      setTimeout(() => typeLyrics(index + 1), delay);
    }
  }, typingSpeed);
}

document.querySelectorAll(".buttons button").forEach((button) => {
  button.addEventListener("click", () => {
    const val = button.textContent;

    if (!isNaN(val) || val === ".") {
      if (waitingForSecond) {
        display.value = val;
        waitingForSecond = false;
      } else {
        display.value = display.value === "0" ? val : display.value + val;
      }
    } else if (val === "AC") {
      display.value = "0";
      num1 = null;
      operator = null;
    } else if (val === "+/-") {
      display.value = String(parseFloat(display.value) * -1);
    } else if (val === "%") {
      display.value = String(parseFloat(display.value) / 100);
    } else if (val === "√") {
      display.value = String(Math.sqrt(parseFloat(display.value)));
    } else if (val === "=") {
      if (operator && num1 !== null) {
        let num2 = parseFloat(display.value);
        let result;
        switch (operator) {
          case "+":
            result = num1 + num2;
            break;
          case "-":
            result = num1 - num2;
            break;
          case "×":
            result = num1 * num2;
            break;
          case "÷":
            result = num2 !== 0 ? num1 / num2 : 0;
            break;
        }
        display.value = result;

        if (num1 === 1 && num2 === 1 && operator === "+") {
          music.play();
          typeLyrics();
        }

        operator = null;
        num1 = null;
      }
    } else {

      num1 = parseFloat(display.value);
      operator = val;
      waitingForSecond = true;
    }
  });
});
