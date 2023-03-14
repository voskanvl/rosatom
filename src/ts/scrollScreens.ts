import debounce from "./debounce";
import listDisabledElementToScroll from "./listDisabledElementToScroll";
import store from "./store/store";

export const changeScreen = (x: 1 | -1) => {
    const { activeScreenNumber: current, setScreen } = store.getState();

    setScreen(current + x);
};

export function scrollScreens() {
    /*
        в store activeScreenNumber - номер текущкго скрина
        в store activeScreenElement - текщий элемент скрина
        screns - массив всех элментов скринов
    */

    window.addEventListener(
        "wheel",
        debounce((event: WheelEvent) => {
            const { deltaY } = event;
            if (listDisabledElementToScroll(event)) return;
            // deltaY > 0 ? threshold.inc() : threshold.dec();
            deltaY > 0 ? changeScreen(1) : changeScreen(-1);
        }, 290),
    );
}
