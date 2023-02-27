import { SCREEN_NUMBER_TO_CHANGE } from "./SCREEN_NUMBER_TO_CHANGE";
import store from "./store/store";

export default function changePointerByScreen() {
    store.subscribe(state => {
        if (SCREEN_NUMBER_TO_CHANGE.some(e => e === state.activeScreenNumber)) {
            document.body.style.cursor = "url('../../assets/cursor/white.png') 19 19, pointer";
        } else {
            document.body.style.cursor = "url('../../assets/cursor/black.png') 19 19, pointer";
        }
    });
}
