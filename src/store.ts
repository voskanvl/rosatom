import create from "zustand/vanilla";
export interface StoreState {
    activeScreenNumber: number;
    activeScreenElement: HTMLElement | null;
    previousScreenNumber: number | null;
    previousScreenElement: HTMLElement | null;
    screens: HTMLElement[] | [];
    setScreen: (x: number) => void;
}

export const recomposing = (next: number, screens: HTMLElement[] | []) => {
    if (next === undefined || !screens || !screens.length)
        throw Error("неправильный номер следующего скрина, или отстутвтует screens в store");
    screens.forEach(screen => {
        const { number } = screen.dataset;
        if ((Number(number) || 0) < next) screen.style.top = "-100vh";
        if ((Number(number) || 0) > next) screen.style.top = "100vh";
    });
};

export const store = create<StoreState>(set => ({
    activeScreenNumber: 0,
    activeScreenElement: null,
    previousScreenNumber: null,
    previousScreenElement: null,
    screens: [...document.querySelectorAll<HTMLElement>(".screen")],
    setScreen: x =>
        set(state => {
            const { activeScreenElement: currentElement, screens } = state;
            if (!currentElement) throw Error("нет активного элемента. ошибка инициализации");

            let next = x;
            if (next < 0) next = 0;
            if (next > screens.length - 1) next = screens.length - 1;

            const nextElement = screens.find(e => e.dataset.number === next + "");
            if (!nextElement) throw Error("невозможно найти следующий скрин");

            currentElement.removeAttribute("active");
            recomposing(x, state.screens);

            nextElement.setAttribute("active", "active");
            nextElement.style.top = "0";

            return { ...state, activeScreenElement: nextElement, activeScreenNumber: next };
        }),
}));

const screens = [...document.querySelectorAll<HTMLElement>(".screen")];
let currentActive = screens.find(e => e.getAttribute("active"));
if (!currentActive) throw Error("нет активного скрина при инициализации приложения");
store.setState(state => ({ ...state, activeScreenElement: currentActive }));

const currentActiveNumber = Number(currentActive.dataset.number); //номер активного скрина
if (isNaN(currentActiveNumber))
    throw Error("data-number активного скрина не проебразуется в число");

store.setState(state => ({ ...state, activeScreenNumber: currentActiveNumber }));
