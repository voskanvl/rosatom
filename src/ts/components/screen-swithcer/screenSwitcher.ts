// import { setScreen } from "./scrollScreens";
// import { setScreen } from "./scrollScreens";
import store from "../../store/store";

function initScreenSwitcher(screenSwitcher: HTMLElement, screens: HTMLElement[]) {
    const { activeScreenNumber: currentScreen, setScreen } = store.getState();
    screens.forEach((_, i) => {
        const element = document.createElement("li");
        element.classList.add("screen-switcher__item");
        element.dataset.item = i + "";
        element.innerHTML = `<div class="green-circle"></div>`;
        if (i === currentScreen) {
            element.setAttribute("current", "current");
        }
        screenSwitcher.append(element);
        element.addEventListener("click", () => {
            setScreen(i);
        });
        // const opacity = currentScreen !== 0 ? 1 : 0;
        const opacity = 1;
        !!screenSwitcher && (screenSwitcher.style.opacity = opacity + "");
    });
}

function changeSwitcherByStore() {
    const screenSwitcher = document.querySelector<HTMLElement>(".screen-switcher");
    if (!screenSwitcher) {
        console.warn("отсутствует screen-switcher");
        return;
    }

    store.subscribe(({ block }) => {
        const opacity = 1;

        const screenSwitcher = document.querySelector<HTMLElement>(".screen-switcher");
        !!screenSwitcher && (screenSwitcher.style.opacity = opacity + "");

        !!screenSwitcher && (screenSwitcher.style.zIndex = block ? "0" : "");
    });
}

function changeCurrentSwitchByStore() {
    store.subscribe(({ activeScreenNumber: currentScreen }) => {
        const previousSwitcher = document.querySelector<HTMLElement>(
            ".screen-switcher__item[current]",
        );
        if (!previousSwitcher) throw Error("отсутствует текущий переключатель");

        if (previousSwitcher.dataset.item === currentScreen + "") return;

        const currentSwitcher = document.querySelector<HTMLElement>(
            `.screen-switcher__item[data-item="${currentScreen}"]`,
        );

        // !!previousSwitcher && (previousSwitcher.innerHTML = "");
        !!previousSwitcher && previousSwitcher.removeAttribute("current");

        // !!currentSwitcher && (currentSwitcher.innerHTML = `<div class="green-circle"></div>`);
        !!currentSwitcher && currentSwitcher.setAttribute("current", "current");
    });
}

export default function screenSwitcher() {
    const screens = document.querySelectorAll<HTMLElement>(".screen");
    if (!screens || !screens.length) throw Error("на странице нет screen'ов");

    const screenSwitcher = document.querySelector<HTMLElement>(".screen-switcher");
    if (!screenSwitcher) {
        console.warn("на странице нет screen-switcher");
        return;
    }

    //начальная инициализация screen-switcher
    initScreenSwitcher(screenSwitcher, [...screens]);
    changeCurrentSwitchByStore();
    changeSwitcherByStore();
}
