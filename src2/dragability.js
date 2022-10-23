import { drag, allowDrop, drageEnd, dragStart, drop, dragover_handler } from "./drap-and-drop";
import { GEM_DROPDOWN } from "./dom-elements";
import { gemMatrix, solvedGemMatix } from "./generate-frames";
import { GEMELEMENTS_COLLECTION } from "./draw-elements";

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
  nullEl.addEventListener("drop", drop(gemMatrix, solvedGemMatix));
}
