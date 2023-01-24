import { store } from "./store";
export interface changingElementsData {
    selector: string;
    changingClass: string;
}

export const SCREEN_NUMBER_TO_CHANGE = [1, 5, 6, 8];

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
    menuReduced: {
        selector: ".menu-reduced__caption",
        changingClass: "menu-reduced__caption--white",
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

        if (SCREEN_NUMBER_TO_CHANGE.some(e => e === state.activeScreenNumber)) {
            changeMainHeader(mainHeader, changingElements)("add");
        } else {
            changeMainHeader(mainHeader, changingElements)("remove");
        }
    });
}
