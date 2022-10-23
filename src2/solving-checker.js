import { createGemArray } from "./create-matrix";

export function createReference() {
  let gemArray = createGemArray();
  gemArray = gemArray.slice(1);
  gemArray.push(0);
  return gemArray;
}
