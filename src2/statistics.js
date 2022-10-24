import { OVERLAY, STATS_SHEET, STATS_TABLE } from "./dom-elements";
import { wasShown } from "./win";
import { renderTime } from "./time";

let winners = [];

export function addWinner(moves, time, name = "Unknown") {
    if (name === "") {
        name = "Unknown";
    };

    if (wasShown) {
        winners.push({
            name: name,
            moves: moves,
            time: time,
        })

        sortWinners();
        addWinnersToLS();
    }
}

function sortWinners() {
    winners.sort((a, b) => { return a.time - b.time });
    if (winners.length > 10) {
      winners.length = 10;
    }
}

function addWinnersToLS() {
    localStorage.setItem("winners", JSON.stringify(winners));
}

export function retrieveWinnersFromSL() {
    if (localStorage.getItem("winners")) {
        winners = JSON.parse(localStorage.getItem("winners"));
    } else {
        winners = [];
    }
}

export function showStatistics() {
    OVERLAY.classList.add("overlay-visible");
    STATS_SHEET.classList.add("stats-sheet-visible");
}

export function hideStatistics() {
    OVERLAY.classList.remove("overlay-visible");
    STATS_SHEET.classList.remove("stats-sheet-visible");
}

export function generateStatistics() {
    for (let i = 0; i < winners.length; i++) {
        STATS_TABLE.children[i + 1].children[1].textContent = winners[i].name;
        STATS_TABLE.children[i + 1].children[2].textContent = renderTime(winners[i].time);
        STATS_TABLE.children[i + 1].children[3].textContent = winners[i].moves;
    }
}