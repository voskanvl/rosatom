import { store } from "./store";

export default function hideScreenSwitcherByMenu() {
    const menu = document.querySelector<HTMLElement>(".main-header");
    const screenSwitcher = document.querySelector<HTMLElement>(".screen-switcher");
    if (!screenSwitcher) throw Error("отсутствует screen-switcher");
    !!menu &&
        menu.addEventListener("mouseenter", () => {
            screenSwitcher.style.zIndex = "0";
            store.setState(state => ({ ...state, block: true }));
        });
    !!menu &&
        menu.addEventListener("mouseleave", () => {
            screenSwitcher.style.zIndex = "";
            store.setState(state => ({ ...state, block: false }));
        });
}
