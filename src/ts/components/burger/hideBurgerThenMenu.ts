import store from "../../store";

export default function hideBurgerThenMenu() {
    const burger = document.querySelector<HTMLElement>(".burger");
    if (!burger) throw Error("there isn't .burger");
    store.menuStore.subscribe(({ isOpen }) => {
        burger.style.opacity = isOpen ? "0" : "";
        burger.style.pointerEvents = isOpen ? "none" : "";
    });
}
