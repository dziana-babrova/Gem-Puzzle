import { WIN_MESSAGE, RESULT_MESSAGE, OVERLAY2 } from "./dom-elements";
import { renderTime, pauseTimer } from "./time";

let wasShown = false;

export function isWin(reference, currentArrayState) {
  for (let i = 0; i < reference.length; i++) {
    if (reference[i] !== currentArrayState[i]) return false;
  }

  return true;
}

export function showWinMessage(timer, moves) {
  if (!wasShown) {
    pauseTimer();
    let renderedTime = renderTime(timer);
    OVERLAY2.classList.add("overlay-visible");
    RESULT_MESSAGE.textContent = `You solved the puzzle in ${renderedTime} and ${moves} moves`;
    WIN_MESSAGE.classList.add("win-message-visible");

    wasShown = true;
  }
}

export function closeWinMessage() {
  OVERLAY2.classList.remove("overlay-visible");
  WIN_MESSAGE.classList.remove("win-message-visible");
}

export function resetWasShown() {
  wasShown = false;
}

export { wasShown };