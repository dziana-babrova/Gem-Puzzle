import { startTimer, ResetTimer, time, timerStarted } from "./time";
import { moveCounter, resetCounter, increaseCounter } from "./move-count";
import { playSound } from "./sound";
import { isWin, showWinMessage } from "./win";
import { GEM_DROPDOWN, PERCENTAGE, GAP, GEM_CONTAINER } from "./dom-elements";
import { isDraggable } from "./dragability";
import { gemMatrix as matrix, solvedGemMatix as solvedMatrix } from "./generate-frames";
import { removeListener } from "./draw-elements";

export function moveElement(gemMatrix, solvedGemMatix) {
    return function (e) {
        if (Number(e.target.textContent) < GEM_DROPDOWN.value ** 2) {
        let clickedNumber = Number(e.target.textContent);
            let dragability = isDraggable(clickedNumber, gemMatrix);
            console.log(gemMatrix);
      if (dragability) {
        let index = gemMatrix.flat().indexOf(clickedNumber);
        let i = Math.floor(index / GEM_DROPDOWN.value);
        let j = index % GEM_DROPDOWN.value;
        let moveSize = PERCENTAGE[GEM_DROPDOWN.value - 3] * GEM_CONTAINER.offsetHeight - GAP[GEM_DROPDOWN.value - 3];

        if (i !== 0 && gemMatrix[i - 1][j] === 0) {
          e.target.style.bottom = moveSize + "px";

          let temp = gemMatrix[i - 1][j];
          gemMatrix[i - 1][j] = gemMatrix[i][j];
          gemMatrix[i][j] = temp;
        }
        if (i < GEM_DROPDOWN.value - 1 && gemMatrix[i + 1][j] === 0) {
          e.target.style.bottom = "-" + moveSize + "px";

          let temp = gemMatrix[i + 1][j];
          gemMatrix[i + 1][j] = gemMatrix[i][j];
          gemMatrix[i][j] = temp;
        }
        if (gemMatrix[i][j - 1] === 0) {
          e.target.style.left = "-" + moveSize + "px";

          let temp = gemMatrix[i][j - 1];
          gemMatrix[i][j - 1] = gemMatrix[i][j];
          gemMatrix[i][j] = temp;
        }
        if (gemMatrix[i][j + 1] === 0) {
          e.target.style.left = moveSize + "px";

          let temp = gemMatrix[i][j + 1];
          gemMatrix[i][j + 1] = gemMatrix[i][j];
          gemMatrix[i][j] = temp;
        }

        if (!timerStarted) {
          startTimer();
        }

        increaseCounter();
        playSound();


        GEM_CONTAINER.onclick = null;
        }
    }

      if (isWin(solvedGemMatix, gemMatrix.flat())) {
      showWinMessage(time, moveCounter);
    }
  };
}
