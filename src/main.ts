import "./sass/style.sass";
import { scrollScreens } from "./scrollScreens";
import create from "zustand/vanilla";
// import '@splidejs/splide/css';

export interface StoreState {
    activeScreenNumber: number;
    activeScreenElement: HTMLElement | null;
    inc: () => void;
    dec: () => void;
    setActive: (x: number) => void;
}

const changeState = (x: number) => (state: StoreState) => ({
    ...state,
    activeScreenNumber: state.activeScreenNumber + x,
});

const store = create<StoreState>(set => ({
    activeScreenNumber: 0,
    activeScreenElement: null,
    inc: () => set(changeState(1)),
    dec: () => {
        changeState(-1);
    },
    setActive: x => {
        changeState(x);
    },
}));

scrollScreens(store);
