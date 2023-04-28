import feedback from "./ts/components/modal/feedback";
import modal from "./ts/components/modal/modal";

const buttons = document.querySelectorAll<HTMLButtonElement>(".equipment__item-button");
buttons &&
    buttons.length &&
    buttons.forEach(button => button.addEventListener("click", () => modal(feedback())));

//---HINT---
const hintSwitchers = document.querySelectorAll<HTMLElement>(".equipment__item");
const handlerEnter = ({ target, currentTarget }: Event) => {
    const targetEl = target as HTMLElement;

    if (!targetEl.classList.contains("equipment__hintswitcher")) return;

    const hint = (currentTarget as HTMLElement).querySelector(".hint");
    hint && hint.setAttribute("show", "show");
};

const handlerLeave = ({ target, currentTarget }: Event) => {
    const targetEl = target as HTMLElement;

    if (!targetEl.classList.contains("equipment__hintswitcher")) return;

    const hint = (currentTarget as HTMLElement).querySelector(".hint");
    hint && hint.removeAttribute("show");
};

hintSwitchers &&
    hintSwitchers.length &&
    hintSwitchers.forEach(el => {
        el.addEventListener("mouseover", handlerEnter);
        el.addEventListener("mouseout", handlerLeave);
    });
