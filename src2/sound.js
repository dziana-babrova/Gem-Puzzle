import move from "./move.mp3";
import { SOUND_BUTTON } from "./dom-elements";

let isSoundEnabled = true;

export function enableSound() {
  isSoundEnabled = !isSoundEnabled;
  SOUND_BUTTON.classList.toggle("sound-disabled");
}

export function playSound() {
  let audio = new Audio();
  audio.src = move;

  if (isSoundEnabled) {
    audio.play();
  }
}
