import { SCREEN_NUMBER_TO_CHANGE } from "../../config";
import store from "../../store/store";

export default function changeScreenSwitcherByScroll() {
    store.subscribe(state => {
        const screenSwitcher = document.querySelector<HTMLElement>(".screen-switcher");
        if (!screenSwitcher) {
            console.warn("отсутвует screenSwitcher");
            return;
        }

        if (SCREEN_NUMBER_TO_CHANGE.some(e => e === state.activeScreenNumber)) {
            screenSwitcher.classList.add("screen-switcher--white");
        } else {
            screenSwitcher.classList.remove("screen-switcher--white");
        }
    });
}
