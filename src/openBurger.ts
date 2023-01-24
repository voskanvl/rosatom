import burgerStore from "./burgerStore";
import {
    changeMainHeader,
    changingElements,
    changingElementsData,
    SCREEN_NUMBER_TO_CHANGE,
} from "./changeMainHeaderByScroll";
import { store } from "./store";

const handleBurgerCreator =
    (action: "add" | "remove") =>
    (mainHeader: HTMLElement, changingElements: { [key: string]: changingElementsData }) =>
    () => {
        burgerStore.getState().toggle();

        if (SCREEN_NUMBER_TO_CHANGE.some(e => e === store.getState().activeScreenNumber)) return;
        changeMainHeader(mainHeader, changingElements)(action);
    };

const handleBurgerEnter = handleBurgerCreator("add");
const handleBurgerLeave = handleBurgerCreator("remove");

export default function openBurger() {
    const burger = document.querySelector<HTMLElement>(".burger");
    if (!burger) throw Error("нет бургера");

    const img = burger.querySelector<HTMLImageElement>("img")!;
    const mainHeader = document.querySelector<HTMLElement>(".main-header");
    if (!mainHeader) throw Error("отсутвует main header");

    const openBurgerList = (x: boolean = true) => {
        const burgerList = document.querySelector<HTMLElement>(".burger__list")!;
        const list = document.querySelector<HTMLElement>(".burger__list > .list")!;
        img.setAttribute("src", x ? "../assets/svg/x.svg" : "../assets/svg/burger.svg");
        burgerList.style.transform = x ? "scale(1)" : "scaleY(0)";
        list.style.transform = x ? "scale(1)" : "scaleY(0)";
    };

    burgerStore.subscribe(({ isOpen }) => openBurgerList(isOpen));

    // burger.addEventListener("mouseenter", handleBurgerEnter(mainHeader, changingElements));
    // burger.addEventListener("mouseleave", handleBurgerLeave(mainHeader, changingElements));
    burger.addEventListener("click", handleBurgerEnter(mainHeader, changingElements));
}
