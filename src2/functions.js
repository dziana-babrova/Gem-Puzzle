import { GEM_DROPDOWN, GEM_CONTAINER, SHUFFLE_BUTTON, TIMER, PERCENTAGE, GAP, COUNTER, SOUND_BUTTON } from "./dom-elements";
import { playSound } from "./sound";
import { isWin, showWinMessage, resetWasShown } from "./win";
import { startTimer, ResetTimer, timerStarted, time } from "./time";

function createGemArray() {
  let array = [];
  for (let i = 0; i < GEM_DROPDOWN.value ** 2; i++) {
    array.push(i);
  }
  return array;
}


function shuffleGemArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function isSolvable(array) {
    let inversion = 0;
    let indexZero = array.indexOf(0);
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] > array[j] && array[i] !== 0 && array[j] !== 0) {
                inversion++;
            }
        }
    }

    if (Math.sqrt(array.length) % 2 === 1 && inversion % 2 === 1) return false;
    if (Math.sqrt(array.length) % 2 === 1 && inversion % 2 === 0) return true;
    if (Math.sqrt(array.length) % 2 === 0 && (inversion % 2 + Math.floor(indexZero / GEM_DROPDOWN.value)) % 2 === 1) return true;
    if (Math.sqrt(array.length) % 2 === 0 && (inversion % 2 + Math.floor(indexZero / GEM_DROPDOWN.value)) % 2 === 0) return false;
}

function createGemMatrix(array, elementsPerSubArray) {
  let matrix = [];
  let i;
  let k;

  for (i = 0, k = -1; i < array.length; i++) {
    if (i % elementsPerSubArray === 0) {
      k++;
      matrix[k] = [];
    }

    matrix[k].push(array[i]);
  }
  return matrix;
}

let gemArray = [];
let gemMatrix = [];
let solvedGemMatix = [];
let moveCounter = 0;
let clickedNumber;

export function createGemPuzzle() {
  gemArray = createGemArray();
    shuffleGemArray(gemArray);
    let solvability = isSolvable(gemArray);

    while (!solvability) {
        gemArray = createGemArray();
        shuffleGemArray(gemArray);
        solvability = isSolvable(gemArray);
    }

  gemMatrix = createGemMatrix(gemArray, GEM_DROPDOWN.value);
  fillDomWithElements(gemMatrix.flat());
  moveCounter = 0;
  COUNTER.textContent = `Moves: ${String(moveCounter)}`;
    setDraggability(gemMatrix.flat());
    solvedGemMatix = createReference();
  ResetTimer();
  resetWasShown();
}

export let GEMELEMENTS_COLLECTION = [];

export function fillDomWithElements(array) {
  GEM_CONTAINER.innerHTML = "";
  GEMELEMENTS_COLLECTION = [];
  for (let i = 0; i < GEM_DROPDOWN.value ** 2; i++) {
    const GEMELEMENT_CONTAINER = document.createElement("div");
    GEMELEMENT_CONTAINER.classList.add(`gem-element-${GEM_DROPDOWN.value}`);
    GEM_CONTAINER.append(GEMELEMENT_CONTAINER);
    const GEMELEMENT = document.createElement("div");
    GEMELEMENT.classList.add(`gem-element`);
    GEMELEMENT.textContent = `${array[i]}`;
    GEMELEMENT_CONTAINER.append(GEMELEMENT);
    GEMELEMENTS_COLLECTION.push(GEMELEMENT);

    if (array[i] === 0) {
      GEMELEMENT.classList.add("empty");
      GEMELEMENT.textContent = ``;
    }
    }
}

export function isDraggable(number, matrix) {
  let array = matrix.flat();
  let index = array.indexOf(number);
  let i = Math.floor(index / GEM_DROPDOWN.value);
  let j = index % GEM_DROPDOWN.value;
  if (i !== 0 && matrix[i - 1][j] === 0) return true;
  if (i < GEM_DROPDOWN.value - 1 && matrix[i + 1][j] === 0) return true;
  if (matrix[i][j - 1] === 0) return true;
  if (matrix[i][j + 1] === 0) return true;
  else return false;
}

export function setDraggability(matrix) {
  let array = matrix.flat();
  let index = array.indexOf(0);
  let i = Math.floor(index / GEM_DROPDOWN.value);
  let j = index % GEM_DROPDOWN.value;
  if (i !== 0) {
    const draggedEl = GEMELEMENTS_COLLECTION[index - GEM_DROPDOWN.value];
    draggedEl.id = "draggable1";
    draggedEl.setAttribute("draggable", true);
    draggedEl.addEventListener("dragstart", drag, false);
          draggedEl.addEventListener("drag", dragStart, false);
          draggedEl.addEventListener("dragend", drageEnd, false);

  }
  if (i < GEM_DROPDOWN.value - 1) {
    const draggedEl2 = GEMELEMENTS_COLLECTION[index + Number(GEM_DROPDOWN.value)];
    draggedEl2.id = "draggable2";
    draggedEl2.setAttribute("draggable", true);
    draggedEl2.addEventListener("dragstart", drag, false);
    draggedEl2.addEventListener("drag", dragStart, false);
    draggedEl2.addEventListener("dragend", drageEnd, false);
  }
  if (j !== 0) {
    const draggedEl3 = GEMELEMENTS_COLLECTION[index - 1];
    draggedEl3.id = "draggable3";
    draggedEl3.setAttribute("draggable", true);
      draggedEl3.addEventListener("dragstart", drag, false);
    draggedEl3.addEventListener("drag", dragStart, false);
    draggedEl3.addEventListener("dragend", drageEnd, false);
  }
  if (j < GEM_DROPDOWN.value - 1) {
    const draggedEl4 = GEMELEMENTS_COLLECTION[index + 1];
    draggedEl4.id = "draggable4";
    draggedEl4.setAttribute("draggable", true);
      draggedEl4.addEventListener("dragstart", drag, false);
    draggedEl4.addEventListener("drag", dragStart, false);
    draggedEl4.addEventListener("dragend", drageEnd, false);
  }

  const nullEl = GEMELEMENTS_COLLECTION[index];
  nullEl.addEventListener("dragover", allowDrop);
  nullEl.addEventListener("drop", drop,);
}

function drag(e) {
    e.dataTransfer.setData("id", e.target.id);
    e.target.classList.add("invisible");
}

function dragStart(e) {
    e.target.style.display = `none`;
}

function drageEnd(e) {
  e.target.style.display = `flex`;
}

function allowDrop(e) {
    e.preventDefault();
}

function drop(e) {
    let itemId = e.dataTransfer.getData("id");
    e.target.append(document.getElementById(itemId));

    clickedNumber = Number(e.target.textContent);
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

    rerenderDom();
    moveCounter++;
    COUNTER.textContent = `Moves: ${String(moveCounter)}`;

    if (!timerStarted) {
      startTimer();
    }

    playSound();

}

export function moveElement(e) {
    if (Number(e.target.textContent) < GEM_DROPDOWN.value ** 2) {
    clickedNumber = Number(e.target.textContent);
        let dragability = isDraggable(clickedNumber, gemMatrix);
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

      moveCounter++;
      COUNTER.textContent = `Moves: ${String(moveCounter)}`;

    if (!timerStarted) {
        startTimer();
        }

        GEM_CONTAINER.removeEventListener("click", moveElement);
        playSound();

        }
    }

    if (isWin(solvedGemMatix, gemMatrix.flat())) {
        console.log("win");
        showWinMessage(time, moveCounter);
    };
}

export function rerenderDom() {
  fillDomWithElements(gemMatrix.flat());
    setDraggability(gemMatrix.flat());

    GEM_CONTAINER.addEventListener("click", moveElement);
}

export function createSolvedPuzzle() {
    let gemArray = createGemArray();
    gemArray = gemArray.slice(1);
    gemArray.push(0);
    gemArray[gemArray.length - 1] = gemArray[gemArray.length - 2];
    gemArray[gemArray.length - 2] = gemArray[gemArray.length - 2 - GEM_DROPDOWN.value];
    gemArray[gemArray.length - 2 - GEM_DROPDOWN.value] = 0;
    fillDomWithElements(gemArray);
    setDraggability(gemArray);
    gemMatrix = createGemMatrix(gemArray, GEM_DROPDOWN.value);
    solvedGemMatix = createReference();
    ResetTimer();
}

function createReference() {
    let gemArray = createGemArray();
    gemArray = gemArray.slice(1);
    gemArray.push(0);
    return gemArray;
}


export { moveCounter };