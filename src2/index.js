import "./normalize.css";
import "./index.scss";
import {
    createGemPuzzle,
    moveElement,
    rerenderDom,
    createSolvedPuzzle,
    startTimer,
    GEMELEMENTS_COLLECTION,

} from "./functions";
import { enableSound } from "./sound";
import { retrieveWinnersFromSL, showStatistics, hideStatistics, addWinner, generateStatistics } from "./statistics";
import { closeWinMessage } from "./win";
import { time } from "./time";
import { moveCounter } from "./functions";

import { GEM_DROPDOWN, GEM_CONTAINER, SHUFFLE_BUTTON, COUNTER, TIMER, PERCENTAGE, GAP, SOUND_BUTTON, QUICK_SOLVE, STATS, SAVE, OVERLAY, ADD_BUTTON, DEFAULT_BUTTON, NAME_INPUT, CROSS_ICON } from "./dom-elements";

window.addEventListener("DOMContentLoaded", createGemPuzzle);
GEM_DROPDOWN.addEventListener("change", createGemPuzzle);
SHUFFLE_BUTTON.addEventListener("click", createGemPuzzle);
GEM_CONTAINER.addEventListener("transitionend", rerenderDom);
GEM_CONTAINER.addEventListener("click", moveElement);
SOUND_BUTTON.addEventListener("click", enableSound);
QUICK_SOLVE.addEventListener("click", createSolvedPuzzle);
window.addEventListener("load", retrieveWinnersFromSL);
STATS.addEventListener("click", generateStatistics);
STATS.addEventListener("click", showStatistics);
OVERLAY.addEventListener("click", hideStatistics);
ADD_BUTTON.addEventListener("click", function () {
    return addWinner(moveCounter, time, NAME_INPUT.value);
})
DEFAULT_BUTTON.addEventListener("click", function () {
  return addWinner(moveCounter, time);
});
ADD_BUTTON.addEventListener("click", closeWinMessage);
DEFAULT_BUTTON.addEventListener("click", closeWinMessage);
CROSS_ICON.addEventListener("click", function () {
  return addWinner(moveCounter, time);
});
CROSS_ICON.addEventListener("click", closeWinMessage);
window.addEventListener("beforeunload", function () {
  return addWinner(moveCounter, time);
});






