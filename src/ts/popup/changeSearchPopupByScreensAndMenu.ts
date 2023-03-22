import Store from "../store";
import { SCREEN_NUMBER_TO_CHANGE } from "../config";

export default function changeSearchPopupByScreensAndMenu() {
    /*
        burger  menu screen(page)
    */
    let flag = 0;
    const searchPopup = document.querySelector<HTMLElement>(".search-popup");

    function setMainHeader() {
        !!searchPopup && searchPopup.classList[flag ? "add" : "remove"]("search-popup--white");
    }

    // Store.burgerStore.subscribe(({ isOpen }) => {
    //     flag = isOpen ? flag | 4 : flag & 3;
    //     setMainHeader();
    // });
    // Store.menuStore.subscribe(({ isOpen }) => {
    //     flag = isOpen ? flag | 2 : flag & 5;
    //     setMainHeader();
    // });
    Store.store.subscribe(({ activeScreenNumber }) => {
        const page = SCREEN_NUMBER_TO_CHANGE.some(e => e === activeScreenNumber);
        flag = page ? flag | 1 : flag & 6;
        setMainHeader();
    });
    Store.menuStore.subscribe(({ isOpen }) => {
        flag = isOpen ? flag | 2 : flag & 5;
        setMainHeader();
    });
}
