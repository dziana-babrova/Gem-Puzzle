import { LOAD_MESSAGE, OVERLAY, SAVE_MESSAGE,  } from "./dom-elements";
import { wasShown } from "./win";

export function saveGame(matrix, time, moves) {
    if (!wasShown) {
        localStorage.setItem("gameScheme", JSON.stringify(matrix));
        localStorage.setItem("time", time);
        localStorage.setItem("moves", moves);
    }
}

export function showSaveMessage() {
    if (!wasShown) {
        SAVE_MESSAGE.classList.add("save-message-visible");
        OVERLAY.classList.add("overlay-visible");
    }
}

export function hideSaveMessage() {
    SAVE_MESSAGE.classList.remove("save-message-visible");
    OVERLAY.classList.remove("overlay-visible");
}

export function showLoadMessage() {
    LOAD_MESSAGE.classList.add("load-message-visible");
    OVERLAY.classList.add("overlay-visible");
}

export function closeLoadMessage() {
    LOAD_MESSAGE.classList.remove("load-message-visible");
    OVERLAY.classList.remove("overlay-visible");
}

export function checkSavedGame() {
    if (localStorage.getItem("gameScheme")) {
        showLoadMessage();
    }
}


export function removeSavedGame() {
    localStorage.removeItem("gameScheme");
    closeLoadMessage();
}