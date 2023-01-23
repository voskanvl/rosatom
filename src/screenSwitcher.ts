import { setScreen } from "./scrollScreens";
// import { setScreen } from "./scrollScreens";
import { store } from "./store";

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
            console.log("🚀 ~ screenSwitcher element", element, i);
            setScreen(i);
        });
        const opacity = currentScreen !== 0 ? 1 : 0;
        !!screenSwitcher && (screenSwitcher.style.opacity = opacity + "");
    });
}

function changeSwitcherByStore() {
    store.subscribe(({ activeScreenNumber: currentScreen }) => {
        const opacity = currentScreen !== 0 ? 1 : 0;

        const screenSwitcher = document.querySelector<HTMLElement>(".screen-switcher");
        !!screenSwitcher && (screenSwitcher.style.opacity = opacity + "");
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
    if (!screenSwitcher) throw Error("на странице нет screen-switcher");

    //начальная инициализация screen-switcher
    initScreenSwitcher(screenSwitcher, [...screens]);
    changeCurrentSwitchByStore();
    changeSwitcherByStore();
}
