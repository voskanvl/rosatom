import {
    changeMainHeader,
    changingElements,
    changingElementsData,
    SCREEN_NUMBER_TO_CHANGE,
} from "./changeMainHeaderByScroll";
import { store } from "./store";

const handleBurgeEnter =
    (mainHeader: HTMLElement, changingElements: { [key: string]: changingElementsData }) => ({currentTarget}:Event) => {
        if (SCREEN_NUMBER_TO_CHANGE.some(e => e === store.getState().activeScreenNumber)) return;
        const img = (currentTarget as HTMLElement).querySelector<HTMLImageElement>("img")
        !!img && (img.src="../assets/svg/x.svg")
        changeMainHeader(mainHeader, changingElements)("add");
    };
const handleBurgerLeave =
    (mainHeader: HTMLElement, changingElements: { [key: string]: changingElementsData }) => ({currentTarget}:Event) => {
        if (SCREEN_NUMBER_TO_CHANGE.some(e => e === store.getState().activeScreenNumber)) return;
        const img = (currentTarget as HTMLElement).querySelector<HTMLImageElement>("img")
        !!img && (img.src="../assets/svg/burger.svg")
        changeMainHeader(mainHeader, changingElements)("remove");
    };

export default function openBurger() {
    const burger = document.querySelector<HTMLElement>(".burger");
    if (!burger) throw Error("нет бургера");
    const mainHeader = document.querySelector<HTMLElement>(".main-header");
    if (!mainHeader) throw Error("отсутвует main header");

    burger.addEventListener("mouseenter", handleBurgeEnter(mainHeader, changingElements));
    burger.addEventListener("mouseleave", handleBurgerLeave(mainHeader, changingElements));
}
