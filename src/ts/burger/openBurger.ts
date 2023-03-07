import store from "../store";

export default function openBurger() {
    const burger = document.querySelector<HTMLElement>(".burger");
    if (!burger) throw Error("нет бургера");
    burger.addEventListener("click", () => store.burgerStore.getState().open());
}
