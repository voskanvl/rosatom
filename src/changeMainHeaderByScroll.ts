import { store } from "./store";
export interface changingElementsData {
    selector: string;
    changingClass: string;
}
export const changingElements: { [key: string]: changingElementsData } = {
    logo: {
        selector: ".logo",
        changingClass: "logo--white",
    },
    menu: {
        selector: ".menu",
        changingClass: "menu--white",
    },
    optionsInternational: {
        selector: ".options__international",
        changingClass: "options__international--white",
    },
    optionsSearch: {
        selector: ".options__search",
        changingClass: "options__search--white",
    },
};

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

        if (state.activeScreenNumber === 1 || state.activeScreenNumber === 5) {
            changeMainHeader(mainHeader, changingElements)("add");
        } else {
            changeMainHeader(mainHeader, changingElements)("remove");
        }
    });
}
