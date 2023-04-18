import store from "../../store";

export default function changeBurger() {
    const burger = document.querySelector<HTMLElement>(".burger");
    if (!burger) throw Error("there isn't .burger");
    store.burgerStore.subscribe(({ isOpen }) => {
        isOpen ? burger.classList.add("show") : burger.classList.remove("show");
    });
}
