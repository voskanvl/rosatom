import { changingElements, changingElementsData } from "./changingElementByScroll";
import { SCREEN_NUMBER_TO_CHANGE } from "./SCREEN_NUMBER_TO_CHANGE";
import store from "./store/store";

export const changeMainHeader =
    (mainHeader: HTMLElement, changingElements: { [key: string]: changingElementsData }) =>
    (act: "add" | "remove") =>
        Object.entries(changingElements).forEach(([_, { selector, changingClass }]) => {
            const el = mainHeader.querySelector<HTMLElement>(selector);
            !!el && el.classList[act](changingClass);
        });

export default function changeMainHeaderByScroll() {
    store.subscribe(state => {
        const mainHeader = document.querySelector<HTMLElement>(".main-header");
        if (!mainHeader) throw Error("отсутвует main header");

        if (SCREEN_NUMBER_TO_CHANGE.some(e => e === state.activeScreenNumber)) {
            changeMainHeader(mainHeader, changingElements)("add");
        } else {
            changeMainHeader(mainHeader, changingElements)("remove");
        }
    });
}
