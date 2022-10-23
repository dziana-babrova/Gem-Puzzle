import { GEM_DROPDOWN } from "./dom-elements";

export function createGemArray() {
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
  if (Math.sqrt(array.length) % 2 === 0 && ((inversion % 2) + Math.floor(indexZero / GEM_DROPDOWN.value)) % 2 === 1)
    return true;
  if (Math.sqrt(array.length) % 2 === 0 && ((inversion % 2) + Math.floor(indexZero / GEM_DROPDOWN.value)) % 2 === 0)
    return false;
}

export function createGemMatrix(array, elementsPerSubArray) {
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

export function createNewGemPuzzle() {
    let array = createGemArray();
    shuffleGemArray(array);

    while (!isSolvable(array)) {
        array = createGemArray();
        shuffleGemArray(array);
    }

    return createGemMatrix(array, GEM_DROPDOWN.value);
}