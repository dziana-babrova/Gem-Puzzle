import { GEM_DROPDOWN, GEM_CONTAINER } from "./dom-elements";
import { isWin, showWinMessage, resetWasShown } from "./win";
import { startTimer, ResetTimer, time, timerStarted, setLoadedTime } from "./time";
import { moveCounter, resetCounter, increaseCounter, setLoadedCounter } from "./move-count";
import { createGemArray, createGemMatrix, createNewGemPuzzle } from "./create-matrix";
import { createReference } from "./solving-checker";
import { renderDom } from "./draw-elements";

let gemArray = [];
let gemMatrix = [];
let solvedGemMatix = [];

export function createGemPuzzle() {
  resetWasShown();
  gemMatrix = createNewGemPuzzle(gemArray, GEM_DROPDOWN.value);
  solvedGemMatix = createReference();
  renderDom(gemMatrix, solvedGemMatix);
  resetCounter();
  ResetTimer();
}

export function createSolvedPuzzle() {
  resetWasShown();
  gemArray = createGemArray();
  gemArray = gemArray.slice(1);
  gemArray.push(0);
  gemArray[gemArray.length - 1] = gemArray[gemArray.length - 2];
  gemArray[gemArray.length - 2] = gemArray[gemArray.length - 2 - GEM_DROPDOWN.value];
  gemArray[gemArray.length - 2 - GEM_DROPDOWN.value] = 0;
  gemMatrix = createGemMatrix(gemArray, GEM_DROPDOWN.value);
  solvedGemMatix = createReference();
  renderDom(gemMatrix, solvedGemMatix);
  resetCounter();
  ResetTimer();
}

export function loadSavedGemPuzzle() {
  resetWasShown();
  GEM_DROPDOWN.value = JSON.parse(localStorage.getItem("gameScheme")).length;
  gemMatrix = JSON.parse(localStorage.getItem("gameScheme"));
  solvedGemMatix = createReference();
  renderDom(gemMatrix, solvedGemMatix);
  setLoadedCounter();
  setLoadedTime();
}

export { gemMatrix, solvedGemMatix };