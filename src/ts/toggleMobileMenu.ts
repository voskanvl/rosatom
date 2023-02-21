import store from "./store/store";

export default function toggleMobileMenu() {
    const trigger = document.querySelector<HTMLElement>(".menu-reduced__caption");
    const goal = document.querySelector<HTMLElement>(".menu-reduced__list");
    if (!goal) throw Error("there is no .menu-reduced__list");

    !!trigger &&
        trigger.addEventListener("click", () => {
            goal.classList.toggle("show");
            goal.classList.contains("show")
                ? store.setState(state => ({ ...state, block: true }))
                : store.setState(state => ({ ...state, block: false }));
        });
}
