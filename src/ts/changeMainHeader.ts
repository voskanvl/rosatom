import Store from "./store";
import { SCREEN_NUMBER_TO_CHANGE } from "./config";
import { changingElements } from "./changingElementByScroll";

export default function changeMainHeader() {
    /*
        burger  menu screen(page)
    */
    let flag = 0;

    function setMainHeader() {
        console.log("🚀 ~ flag:", flag);

        Object.values(changingElements).forEach(({ selector, changingClass }) => {
            const el = document.querySelector<HTMLElement>(selector);
            el && el.classList[flag ? "add" : "remove"](changingClass);
        });
    }

    Store.burgerStore.subscribe(({ isOpen }) => {
        flag = isOpen ? flag | 4 : flag & 3;
        setMainHeader();
    });
    Store.menuStore.subscribe(({ isOpen }) => {
        flag = isOpen ? flag | 2 : flag & 5;
        setMainHeader();
    });
    Store.store.subscribe(({ activeScreenNumber }) => {
        const page = SCREEN_NUMBER_TO_CHANGE.some(e => e === activeScreenNumber);
        flag = page ? flag | 1 : flag & 6;
        setMainHeader();
    });
}
