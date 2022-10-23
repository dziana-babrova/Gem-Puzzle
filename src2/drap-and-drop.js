import { GEM_DROPDOWN } from "./dom-elements";
import { isWin, showWinMessage, resetWasShown, wasShown } from "./win";
import { startTimer, timerStarted, time } from "./time";
import { moveCounter, increaseCounter } from "./move-count";
import { playSound } from "./sound";
import { renderDom } from "./draw-elements";

export function drag(e) {
  e.dataTransfer.setData("id", e.target.id);
  e.target.classList.add("invisible");
}

export function dragStart(e) {
  e.target.style.display = `none`;
}

export function drageEnd(e) {
  e.target.style.display = `flex`;
}

export function allowDrop(e) {
  e.preventDefault();
}

export function drop(gemMatrix, solvedGemMatix) {
  return function (e) {
    let itemId = e.dataTransfer.getData("id");
    e.target.append(document.getElementById(itemId));

    let clickedNumber = Number(e.target.textContent);
    let index = gemMatrix.flat().indexOf(clickedNumber);
    let i = Math.floor(index / GEM_DROPDOWN.value);
    let j = index % GEM_DROPDOWN.value;
    if (i !== 0 && gemMatrix[i - 1][j] === 0) {
      let temp = gemMatrix[i - 1][j];
      gemMatrix[i - 1][j] = gemMatrix[i][j];
      gemMatrix[i][j] = temp;
    }
    if (i < GEM_DROPDOWN.value - 1 && gemMatrix[i + 1][j] === 0) {
      let temp = gemMatrix[i + 1][j];
      gemMatrix[i + 1][j] = gemMatrix[i][j];
      gemMatrix[i][j] = temp;
    }
    if (gemMatrix[i][j - 1] === 0) {
      let temp = gemMatrix[i][j - 1];
      gemMatrix[i][j - 1] = gemMatrix[i][j];
      gemMatrix[i][j] = temp;
    }
    if (gemMatrix[i][j + 1] === 0) {
      let temp = gemMatrix[i][j + 1];
      gemMatrix[i][j + 1] = gemMatrix[i][j];
      gemMatrix[i][j] = temp;
    }

      playSound();
      increaseCounter();
      if (!timerStarted) {
          startTimer();
      }
      renderDom(gemMatrix, solvedGemMatix);


    if (isWin(solvedGemMatix, gemMatrix.flat())) {
      showWinMessage(time, moveCounter);
    }
  };
}
