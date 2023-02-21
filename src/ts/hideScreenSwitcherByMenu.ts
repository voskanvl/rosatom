import store from "./store/store";

export default function hideScreenSwitcherByMenu() {
    const menu = document.querySelector<HTMLElement>(".main-header");
    const screenSwitcher = document.querySelector<HTMLElement>(".screen-switcher");
    if (!screenSwitcher) throw Error("отсутствует screen-switcher");
    !!menu &&
        menu.addEventListener("mouseenter", () => {
            store.setState(state => ({ ...state, block: true }));
        });
    !!menu &&
        menu.addEventListener("mouseleave", () => {
            store.setState(state => ({ ...state, block: false }));
        });
    document.addEventListener("click", ({ target }: Event) => {
        if ((target as HTMLElement).closest(".main-header")) return;
        store.setState(state => ({ ...state, block: false }));
    });
}
