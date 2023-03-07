import { BooleanStoreState } from "./store/booleanStoreState.type";
import store from "./store";

export default function changeCursorByMenu() {
    // store.subscribe(state => {
    //     if (SCREEN_NUMBER_TO_CHANGE.some(e => e === state.activeScreenNumber)) {
    //         document.body.style.cursor = "url('../../assets/cursor/white.png') 19 19, pointer";
    //     } else {
    //         document.body.style.cursor = "url('../../assets/cursor/black.png') 19 19, pointer";
    //     }
    // });

    let prevCursor = "";

    const handlerChange = ({ isOpen }: BooleanStoreState) => {
        if (!prevCursor) prevCursor = document.body.style.cursor;
        if (isOpen)
            document.body.style.cursor = "url('../../assets/cursor/white.png') 19 19, pointer";
        if (!isOpen) {
            document.body.style.cursor = prevCursor;
            prevCursor = "";
        }
    };
    store.burgerStore.subscribe(handlerChange);
    store.menuStore.subscribe(handlerChange);
}
