import "./normalize.css";
import "./index.scss";
import {
  createGemPuzzle,
  createSolvedPuzzle,
  gemMatrix,
  solvedGemMatix,
  loadSavedGemPuzzle,
} from "./generate-frames";
import { enableSound } from "./sound";
import { retrieveWinnersFromSL, showStatistics, hideStatistics, addWinner, generateStatistics } from "./statistics";
import { closeWinMessage } from "./win";
import { time, pauseTimer, startTimer, timerStarted } from "./time";
import { moveCounter } from "./move-count";
import { GEM_DROPDOWN, GEM_CONTAINER, SHUFFLE_BUTTON, SOUND_BUTTON, QUICK_SOLVE, STATS, SAVE, OVERLAY, ADD_BUTTON, DEFAULT_BUTTON, NAME_INPUT, CROSS_ICON, CONSENT_BUTTON, START_GAME, CONTINUE_GAME, RESET_GAME, BURGER_ICON } from "./dom-elements";
import { saveGame, showSaveMessage, hideSaveMessage, closeLoadMessage, removeSavedGame, checkSavedGame } from "./save";
import { renderDom } from "./draw-elements";
import { wasShown } from "./win";
import { showBurgerMenu, closeBurgerMenu } from "./burger-menu";

window.addEventListener("DOMContentLoaded", createGemPuzzle);
window.addEventListener("DOMContentLoaded", checkSavedGame);
GEM_DROPDOWN.addEventListener("change", createGemPuzzle);
SHUFFLE_BUTTON.addEventListener("click", createGemPuzzle);
GEM_CONTAINER.addEventListener("transitionend", function () {
  return renderDom(gemMatrix, solvedGemMatix);
});
SOUND_BUTTON.addEventListener("click", enableSound);
QUICK_SOLVE.addEventListener("click", createSolvedPuzzle);
window.addEventListener("load", retrieveWinnersFromSL);
STATS.addEventListener("click", pauseTimer);
OVERLAY.addEventListener("click", hideStatistics);
OVERLAY.addEventListener("click", function () {
    if (!wasShown && timerStarted) {
        startTimer();
    }
});
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
    if (!wasShown) {
        return addWinner(moveCounter, time);
    }
});
OVERLAY.addEventListener("click", hideSaveMessage);
OVERLAY.addEventListener("click", closeLoadMessage);
CONTINUE_GAME.addEventListener("click", loadSavedGemPuzzle);
CONTINUE_GAME.addEventListener("click", closeLoadMessage);
RESET_GAME.addEventListener("click", removeSavedGame);
RESET_GAME.addEventListener("click", closeLoadMessage);
START_GAME.addEventListener("click", closeLoadMessage);
BURGER_ICON.addEventListener("click", showBurgerMenu);
OVERLAY.addEventListener("click", closeBurgerMenu);
SOUND_BUTTON.addEventListener("click", closeBurgerMenu);
SHUFFLE_BUTTON.addEventListener("click", closeBurgerMenu);
STATS.addEventListener("click", closeBurgerMenu);
QUICK_SOLVE.addEventListener("click", closeBurgerMenu);
STATS.addEventListener("click", generateStatistics);
STATS.addEventListener("click", showStatistics);

SAVE.addEventListener("click", closeBurgerMenu);
SAVE.addEventListener("click", function () {
  return saveGame(gemMatrix, moveCounter, time);
});
SAVE.addEventListener("click", showSaveMessage);
CONSENT_BUTTON.addEventListener("click", hideSaveMessage);
