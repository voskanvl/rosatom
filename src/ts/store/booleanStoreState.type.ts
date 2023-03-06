export interface BooleanStoreState {
    isOpen: boolean;
    open: () => void;
    close: () => void;
    toggle: () => void;
}
