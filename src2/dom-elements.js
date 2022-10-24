const PERCENTAGE = [0.32, 0.25, 0.2, 0.17, 0.151, 0.137];
const GAP = [-7, 3, 2, 4, 6, 4];

const MAIN = document.createElement("main");
document.body.prepend(MAIN);

const FOOTER = document.createElement("div");
FOOTER.classList.add("footer");
document.body.prepend(FOOTER);

const HEADER = document.createElement("header");
document.body.prepend(HEADER);
const GEM_DROPDOWN = document.createElement("select");

const BURGER_ICON = document.createElement("div");
BURGER_ICON.classList.add("burger-icon");
document.body.prepend(BURGER_ICON);
for (let i = 0; i < 3; i++) {
  const BURGER_ELEMENT = document.createElement("span");
  BURGER_ELEMENT.classList.add("burger-element");
  BURGER_ICON.append(BURGER_ELEMENT);
}

let STATS_DOM_COLLECTION = [];
const STATS_SHEET = document.createElement("div");
STATS_SHEET.classList.add("stats-sheet");
document.body.prepend(STATS_SHEET);
const STATS_HEADER = document.createElement("h1");
STATS_HEADER.classList.add("stats-header");
STATS_SHEET.append(STATS_HEADER);
STATS_HEADER.textContent = "WINNERS";

const STATS_TABLE = document.createElement("div");
STATS_TABLE.classList.add("stats-table");
STATS_SHEET.append(STATS_TABLE);
for (let i = 0; i < 11; i++) {
  const STATS_TR = document.createElement("div");
  STATS_TR.classList.add("stats-tr");
  STATS_TABLE.append(STATS_TR);
  STATS_DOM_COLLECTION.push(STATS_TR);
  for (let j = 0; j < 4; j++) {
    const STATS_TD = document.createElement("div");
    STATS_TD.classList.add(`stats-td-${j}`);
    STATS_TR.append(STATS_TD);
  }
}

STATS_DOM_COLLECTION[0].children[0].textContent = "PLACE";
STATS_DOM_COLLECTION[0].children[1].textContent = "NAME";
STATS_DOM_COLLECTION[0].children[2].textContent = "TIME";
STATS_DOM_COLLECTION[0].children[3].textContent = "MOVES";

for (let i = 1; i < 11; i++) {
  STATS_DOM_COLLECTION[i].children[0].textContent = i;
}

FOOTER.append(GEM_DROPDOWN);
const DROPDOWN_OPTIONS = [3, 4, 5, 6, 7, 8];
DROPDOWN_OPTIONS.forEach((el, i) => {
  const GEM_OPTION = document.createElement("option");
  GEM_DROPDOWN.append(GEM_OPTION);
  GEM_OPTION.value = el;
  GEM_OPTION.textContent = `${el}X${el}`;
});
GEM_DROPDOWN.value = 4;

const SHUFFLE_BUTTON = document.createElement("button");
SHUFFLE_BUTTON.classList.add("shuffle-button");
HEADER.append(SHUFFLE_BUTTON);
SHUFFLE_BUTTON.textContent = "Shuffle";

const COUNTER = document.createElement("div");
COUNTER.classList.add("counter");
FOOTER.prepend(COUNTER);
COUNTER.textContent = `Moves: 0`;

const TIMER = document.createElement("div");
TIMER.classList.add("timer");
FOOTER.append(TIMER);
TIMER.textContent = "00:00";

const SOUND_BUTTON = document.createElement("div");
SOUND_BUTTON.classList.add("sound");
HEADER.append(SOUND_BUTTON);
// SOUND_BUTTON.textContent = "sound";

const QUICK_SOLVE = document.createElement("div");
QUICK_SOLVE.classList.add("quick-solve");
HEADER.append(QUICK_SOLVE);
QUICK_SOLVE.textContent = "cheat";

const SAVE = document.createElement("div");
SAVE.classList.add("save");
HEADER.append(SAVE);
SAVE.textContent = "save";

const STATS = document.createElement("div");
STATS.classList.add("stats");
HEADER.append(STATS);
STATS.textContent = "stats";

const GEM_WRAPPER = document.createElement("div");
GEM_WRAPPER.classList.add("gem-wrapper");
MAIN.append(GEM_WRAPPER);
const GEM_CONTAINER = document.createElement("div");
GEM_CONTAINER.classList.add("gem-container");
GEM_CONTAINER.classList.add("column-three");
GEM_WRAPPER.append(GEM_CONTAINER);

const WIN_MESSAGE = document.createElement("div");
WIN_MESSAGE.classList.add("win-message");
GEM_WRAPPER.append(WIN_MESSAGE);

const SAVE_MESSAGE = document.createElement("div");
SAVE_MESSAGE.classList.add("save-message");
GEM_WRAPPER.append(SAVE_MESSAGE);
SAVE_MESSAGE.textContent = "Reload the page to continue your saved game";
const CONSENT_BUTTON = document.createElement("div");
CONSENT_BUTTON.classList.add("consent-button");
SAVE_MESSAGE.append(CONSENT_BUTTON);
CONSENT_BUTTON.textContent = "OK";

const LOAD_MESSAGE = document.createElement("div");
LOAD_MESSAGE.classList.add("load-message");
GEM_WRAPPER.append(LOAD_MESSAGE);
LOAD_MESSAGE.textContent = "You have an unsaved game. Do you want to continue?";
const CONTINUE_GAME = document.createElement("div");
CONTINUE_GAME.classList.add("continue-button");
LOAD_MESSAGE.append(CONTINUE_GAME);
CONTINUE_GAME.textContent = "continue";
const RESET_GAME = document.createElement("div");
RESET_GAME.classList.add("reset-button");
LOAD_MESSAGE.append(RESET_GAME);
RESET_GAME.textContent = "delete and start new";
const START_GAME = document.createElement("div");
START_GAME.classList.add("start-button");
LOAD_MESSAGE.append(START_GAME);
START_GAME.textContent = "start new";

const HOORAY_MESSAGE = document.createElement("h3");
HOORAY_MESSAGE.classList.add("hooray-message");
WIN_MESSAGE.append(HOORAY_MESSAGE);
HOORAY_MESSAGE.textContent = "HOORAY!";

const RESULT_MESSAGE = document.createElement("h4");
RESULT_MESSAGE.classList.add("result-message");
WIN_MESSAGE.append(RESULT_MESSAGE);

const NAME_INPUT = document.createElement("input");
NAME_INPUT.classList.add("name-input");
WIN_MESSAGE.append(NAME_INPUT);
NAME_INPUT.placeholder = "ENTER YOUR NAME";
NAME_INPUT.title = "This name will be displayed in statistics";

const BUTTONS_CONTAINER = document.createElement("div");
BUTTONS_CONTAINER.classList.add("buttons");
WIN_MESSAGE.append(BUTTONS_CONTAINER);

const ADD_BUTTON = document.createElement("button");
ADD_BUTTON.classList.add("add-button");
BUTTONS_CONTAINER.append(ADD_BUTTON);
ADD_BUTTON.textContent = "ADD NAME";

const DEFAULT_BUTTON = document.createElement("button");
DEFAULT_BUTTON.classList.add("default-button");
BUTTONS_CONTAINER.append(DEFAULT_BUTTON);
DEFAULT_BUTTON.textContent = "ADD DEFAULT";

const CROSS_ICON = document.createElement("div");
CROSS_ICON.classList.add("cross-icon");
WIN_MESSAGE.prepend(CROSS_ICON);

const OVERLAY = document.createElement("div");
OVERLAY.classList.add("overlay");
document.body.prepend(OVERLAY);

const OVERLAY2 = document.createElement("div");
OVERLAY2.classList.add("overlay");
document.body.prepend(OVERLAY2);

export {
  GEM_DROPDOWN,
  GEM_CONTAINER,
  SHUFFLE_BUTTON,
  COUNTER,
  TIMER,
  PERCENTAGE,
  GAP,
  SOUND_BUTTON,
  QUICK_SOLVE,
  WIN_MESSAGE,
  OVERLAY,
  STATS,
  SAVE,
  STATS_SHEET,
  RESULT_MESSAGE,
  ADD_BUTTON,
  DEFAULT_BUTTON,
  NAME_INPUT,
  OVERLAY2,
  CROSS_ICON,
  STATS_TABLE,
  SAVE_MESSAGE,
  CONSENT_BUTTON,
  LOAD_MESSAGE,
  CONTINUE_GAME,
  START_GAME,
  RESET_GAME,
  BURGER_ICON,
  HEADER
};
