import create from "zustand/vanilla";
export interface BurgerStoreState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}

const burgerStore = create<BurgerStoreState>(set => ({
    isOpen: false,
    open: () => set(state => ({ ...state, isOpen: true })),
    close: () => set(state => ({ ...state, isOpen: false })),
    toggle: () => set(state => ({ ...state, isOpen: !state.isOpen })),
}));

export default burgerStore;
