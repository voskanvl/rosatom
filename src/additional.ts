import feedback from "./ts/components/modal/feedback"
import modal from "./ts/components/modal/modal"

const button2 = document.querySelector<HTMLButtonElement>(".rent-config__button")
button2 && button2.addEventListener("click", () => modal(feedback()))

const buttons = document.querySelectorAll<HTMLButtonElement>(".equipment__item-button")
buttons &&
    buttons.length &&
    buttons.forEach(button => button.addEventListener("click", () => modal(feedback())))
