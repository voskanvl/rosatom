import { createStore } from "zustand/vanilla";
import { devtools } from "zustand/middleware";
import { BooleanStoreState } from "./booleanStoreState.type";

const burgerStore = createStore<BooleanStoreState, [["zustand/devtools", never]]>(
    devtools(
        set => ({
            isOpen: false,
            open: () => set(state => ({ ...state, isOpen: true })),
            close: () => set(state => ({ ...state, isOpen: false })),
            // toggle: () => set(state => ({ ...state, isOpen: !state.isOpen })),
        }),
        { name: "burger" },
    ),
);

export default burgerStore;
