import { store } from "./store";
export interface changingElementsData {
    selector: string;
    changingClass: string;
}
export default function changeMainHeaderByScroll() {
    const changingElements: { [key: string]: changingElementsData } = {
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
    store.subscribe(state => {
        const mainHeader = document.querySelector<HTMLElement>(".main-header");
        if (!mainHeader) throw Error("отсутвует main header");
        // const logo = mainHeader.querySelector<HTMLElement>(".logo");
        // const menu = mainHeader.querySelector<HTMLElement>(".menu");
        // const optionsInternational =
        //     mainHeader.querySelector<HTMLElement>(".options__international");
        // const optionsSearch = mainHeader.querySelector<HTMLElement>(".options__search");

        if (state.activeScreenNumber === 1) {
            Object.entries(changingElements).forEach(([_, { selector, changingClass }]) => {
                const el = mainHeader.querySelector<HTMLElement>(selector);
                !!el && el.classList.add(changingClass);
            });
        } else {
            Object.entries(changingElements).forEach(([_, { selector, changingClass }]) => {
                const el = mainHeader.querySelector<HTMLElement>(selector);
                !!el && el.classList.remove(changingClass);
            });
        }
    });
}
