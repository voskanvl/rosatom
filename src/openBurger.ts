import {
    changeMainHeader,
    changingElements,
    changingElementsData,
    SCREEN_NUMBER_TO_CHANGE,
} from "./changeMainHeaderByScroll";
import { store } from "./store";

const handleBurgerCreator =
    (newsvg: string, action: "add" | "remove") =>
    (mainHeader: HTMLElement, changingElements: { [key: string]: changingElementsData }) =>
    ({ currentTarget }: Event) => {
        if (SCREEN_NUMBER_TO_CHANGE.some(e => e === store.getState().activeScreenNumber)) return;
        const img = (currentTarget as HTMLElement).querySelector<HTMLImageElement>("img");
        !!img && (img.src = newsvg);
        changeMainHeader(mainHeader, changingElements)(action);
    };

const handleBurgerEnter = handleBurgerCreator("../assets/svg/x.svg", "add");
const handleBurgerLeave = handleBurgerCreator("../assets/svg/burger.svg", "remove");

export default function openBurger() {
    const burger = document.querySelector<HTMLElement>(".burger");
    if (!burger) throw Error("нет бургера");
    const mainHeader = document.querySelector<HTMLElement>(".main-header");
    if (!mainHeader) throw Error("отсутвует main header");

    burger.addEventListener("mouseenter", handleBurgerEnter(mainHeader, changingElements));
    burger.addEventListener("mouseleave", handleBurgerLeave(mainHeader, changingElements));
}
