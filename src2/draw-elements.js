import { GEM_CONTAINER, GEM_DROPDOWN } from "./dom-elements";
import { setDraggability } from "./dragability";
import { moveElement } from "./move-element";

export let GEMELEMENTS_COLLECTION = [];

function fillDomWithElements(array) {
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


export function renderDom(gemMatrix, solvedGemMatix) {
    let array = gemMatrix.flat();
    fillDomWithElements(array);
    setDraggability(array);

    GEM_CONTAINER.onclick = moveElement(gemMatrix, solvedGemMatix);
}
;