import feedback from "./ts/components/modal/feedback";
import modal from "./ts/components/modal/modal";

const buttons = document.querySelectorAll<HTMLButtonElement>(".equipment__item-button");
buttons &&
    buttons.length &&
    buttons.forEach(button => button.addEventListener("click", () => modal(feedback())));
