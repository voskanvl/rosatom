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
    menuReduced: {
        selector: ".menu-reduced__caption",
        changingClass: "menu-reduced__caption--white",
    },
};
