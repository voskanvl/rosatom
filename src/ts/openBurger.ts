import burgerStore from "./store/burgerStore";
import { SCREEN_NUMBER_TO_CHANGE } from "./config";
import store from "./store/store";
import { changingElements, changingElementsData } from "./changingElementByScroll";
import { changeMainHeader } from "./changeMainHeaderByScroll";
import debounce from "./debounce";

const handleBurgerCreator =
    (action: "add" | "remove") =>
    (mainHeader: HTMLElement, changingElements: { [key: string]: changingElementsData }) =>
    () => {
        if (action === "add") burgerStore.getState().open();
        if (action === "remove") burgerStore.getState().close();

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
    const mainMenu = document.querySelector<HTMLElement>(".menu");
    if (!mainHeader) throw Error("отсутвует main header");
    if (!mainMenu) throw Error("отсутвует .menu");

    const openBurgerList = (x: boolean = true) => {
        // const burgerList = document.querySelector<HTMLElement>(".burger__list")!;
        // const list = document.querySelector<HTMLElement>(".burger__list > .list")!;
        // img.setAttribute("src", x ? "../assets/svg/x.svg" : "../assets/svg/burger.svg");
        // burgerList.style.transform = x ? "scale(1)" : "scaleY(0)";
        // list.style.transform = x ? "scale(1)" : "scaleY(0)";
        x ? burger.classList.add("show") : burger.classList.remove("show");
    };

    burgerStore.subscribe(debounce(({ isOpen }) => openBurgerList(isOpen), 50));

    // burger.addEventListener("mouseenter", handleBurgerEnter(mainHeader, changingElements));
    // burger.addEventListener("mouseleave", handleBurgerLeave(mainHeader, changingElements));
    burger.addEventListener("click", handleBurgerEnter(mainHeader, changingElements));
}
