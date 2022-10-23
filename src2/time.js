import { TIMER } from "./dom-elements";

let time = 0;
let timerStarted = false;
let timeout;

export function renderTime(time) {
        let hour = Math.floor(time / 3600);
        let min = Math.floor((time - hour * 3600) / 60);
        let sec = time - hour * 3600 - min * 60;
        let timeline;

        if (hour) {
          timeline = `${String(hour).padStart(2, 0)}:${String(min).padStart(2, 0)}:${String(sec).padStart(2, 0)}`;
        } else {
          timeline = `${String(min).padStart(2, 0)}:${String(sec).padStart(2, 0)}`;
    }

    return timeline;
}

export function startTimer() {
    time++;
    TIMER.textContent = renderTime(time);
    timeout = setTimeout(startTimer, 1000);
    timerStarted = true;
}

export function ResetTimer() {
    clearTimeout(timeout);
    time = 0;
    timerStarted = false;
    TIMER.textContent = "00:00";
}

export function pauseTimer() {
    clearTimeout(timeout);
}

export function setLoadedTime() {
  time = localStorage.getItem("time");
  TIMER.textContent = renderTime(time);
}

export { timerStarted, time };