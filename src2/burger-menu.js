import { BURGER_ICON, HEADER, OVERLAY } from "./dom-elements";

export function showBurgerMenu() {
    HEADER.classList.toggle("header-visible");
    BURGER_ICON.classList.toggle("change");
    OVERLAY.classList.toggle("overlay-visible");
}

export function closeBurgerMenu() {
    HEADER.classList.remove("header-visible");
    BURGER_ICON.classList.remove("change");
    OVERLAY.classList.remove("overlay-visible");
}