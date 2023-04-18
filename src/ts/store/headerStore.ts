import { BooleanStoreState } from "./booleanStoreState.type";
import { createStore } from "zustand/vanilla";
import { devtools } from "zustand/middleware";

const headerStore = createStore<BooleanStoreState, [["zustand/devtools", never]]>(
    devtools(
        set => ({
            isOpen: false,
            open: () => set(state => ({ ...state, isOpen: true })),
            close: () => set(state => ({ ...state, isOpen: false })),
            toggle: () => set(state => ({ ...state, isOpen: !state.isOpen })),
        }),
        { name: "header" },
    ),
);

export default headerStore;
