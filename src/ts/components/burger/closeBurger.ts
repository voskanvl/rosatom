import store from "../../store";

export default function closeBurger() {
    const closeElement = document.querySelector<HTMLElement>(".burger__image");
    if (!closeElement) throw Error("there isn't .burger__image");
    closeElement.addEventListener("click", (event: Event) => {
        const { isOpen } = store.burgerStore.getState();
        isOpen && event.stopPropagation();
        isOpen && store.burgerStore.getState().close();
    });
}
