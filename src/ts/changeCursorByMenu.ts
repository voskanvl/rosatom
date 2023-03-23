import { BooleanStoreState } from "./store/booleanStoreState.type";
import store from "./store";

export default function changeCursorByMenu() {
    let prevCursor = "";

    const handlerChange = ({ isOpen }: BooleanStoreState) => {
        if (!prevCursor) prevCursor = document.body.style.cursor;
        if (isOpen) document.body.style.cursor = "url('../../assets/cursor/white.png'), none";
        if (!isOpen) {
            document.body.style.cursor = prevCursor;
            prevCursor = "";
        }
    };
    store.burgerStore.subscribe(handlerChange);
    store.menuStore.subscribe(handlerChange);
}
