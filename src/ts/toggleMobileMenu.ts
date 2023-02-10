export default function toggleMobileMenu() {
    const trigger = document.querySelector<HTMLElement>(".menu-reduced__caption");
    const goal = document.querySelector<HTMLElement>(".menu-reduced__list");
    if (!goal) throw Error("there is no .menu-reduced__list");

    !!trigger && trigger.addEventListener("click", () => goal.classList.toggle("show"));
}
