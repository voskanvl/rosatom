import blockScrollWindow from "../../helpers/blockScrollWindow";
import store from "../../store";

export default function blockScroll() {
    store.menuStore.subscribe(({ isOpen }) => {
        const { block, unblock } = blockScrollWindow();
        isOpen ? block() : unblock();
    });
}