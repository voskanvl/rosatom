import { BooleanStoreState } from "../../store/booleanStoreState.type";
import store from "../../store";

export default function hideScreenSwitcherByMenu() {
    const menu = document.querySelector<HTMLElement>(".main-header");
    if (!menu) throw Error("отсутствует .main-header");

    const screenSwitcher = document.querySelector<HTMLElement>(".screen-switcher");
    if (!screenSwitcher) throw Error("отсутствует screen-switcher");

    // !!menu &&
    //     menu.addEventListener("mouseenter", () => {
    //         store.setState(state => ({ ...state, block: true }));
    //     });
    // !!menu &&
    //     menu.addEventListener("mouseleave", () => {
    //         store.setState(state => ({ ...state, block: false }));
    //     });
    // document.addEventListener("click", ({ target }: Event) => {
    //     if ((target as HTMLElement).closest(".main-header")) return;
    //     store.setState(state => ({ ...state, block: false }));
    // });

    const toggleScreenSwitcher = ({ isOpen }: BooleanStoreState) => {
        isOpen ? (screenSwitcher.style.display = "none") : (screenSwitcher.style.display = "");
    };

    store.menuStore.subscribe(toggleScreenSwitcher);
    store.burgerStore.subscribe(toggleScreenSwitcher);
}
