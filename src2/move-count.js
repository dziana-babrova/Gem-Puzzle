import { wasShown } from "./win";;
import { COUNTER } from "./dom-elements";

let moveCounter = 0;

export function increaseCounter() {
    if (!wasShown) {
        moveCounter++;
        COUNTER.textContent = `Moves: ${String(moveCounter)}`;
    }
}

export function resetCounter() {
    moveCounter = 0;
    COUNTER.textContent = `Moves: ${String(moveCounter)}`;
}

export function setLoadedCounter() {
  moveCounter = localStorage.getItem("moves");
    COUNTER.textContent = `Moves: ${String(moveCounter)}`;
}


export { moveCounter };