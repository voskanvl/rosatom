import { SCREEN_NUMBER_TO_CHANGE } from "../../config";
import store from "../../store/store";

export default function changeScreenSwitcherByScroll() {
    store.subscribe(state => {
        const screenSwitcher = document.querySelector<HTMLElement>(".screen-switcher");
        if (!screenSwitcher) throw Error("отсутвует screenSwitcher");

        if (SCREEN_NUMBER_TO_CHANGE.some(e => e === state.activeScreenNumber)) {
            screenSwitcher.classList.add("screen-switcher--white");
        } else {
            screenSwitcher.classList.remove("screen-switcher--white");
        }
    });
}
