import { createStore } from "zustand/vanilla";
import { devtools } from "zustand/middleware";
export interface StoreState {
    block: boolean;
    activeScreenNumber: number;
    activeScreenElement: HTMLElement | null;
    previousScreenNumber: number | null;
    previousScreenElement: HTMLElement | null;
    screens: HTMLElement[] | [];
    inc: () => void;
    dec: () => void;
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

const setScreenHandler = (x: number) => (state: StoreState) => {
    // if (state.block) return state;

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
};

const inc = (state: StoreState) => {
    if (state.activeScreenNumber + 1 >= state.screens.length) return state;
    else return setScreenHandler(state.activeScreenNumber + 1)(state);
};
const dec = (state: StoreState) => {
    if (state.activeScreenNumber - 1 < 0) return state;
    else return setScreenHandler(state.activeScreenNumber - 1)(state);
};

const store = createStore<StoreState, [["zustand/devtools", never]]>(
    devtools(set => ({
        block: false,
        activeScreenNumber: 0,
        activeScreenElement: null,
        previousScreenNumber: null,
        previousScreenElement: null,
        screens: [...document.querySelectorAll<HTMLElement>(".screen")],
        inc: () => set(inc),
        dec: () => set(dec),
        setScreen: x => set(setScreenHandler(x)),
    })),
);

const screens = [...document.querySelectorAll<HTMLElement>(".screen")];
const currentActive = screens.find(e => e.getAttribute("active"));
if (!currentActive) throw Error("нет активного скрина при инициализации приложения");
store.setState(state => ({ ...state, activeScreenElement: currentActive }));

const currentActiveNumber = Number(currentActive.dataset.number); //номер активного скрина
if (isNaN(currentActiveNumber))
    throw Error("data-number активного скрина не проебразуется в число");

store.setState(state => ({ ...state, activeScreenNumber: currentActiveNumber }));

export default store;
