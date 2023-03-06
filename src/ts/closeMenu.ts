import { changeMainHeader } from "./changeMainHeaderByScroll";
import { changingElements } from "./changingElementByScroll";
import Store from "./store";

export default function closeMenu(selector: string) {
    if (!selector) throw Error("селектор должен быть непустым");

    const lists = document.querySelectorAll<HTMLElement>(selector);
    const mainHeader = document.querySelector<HTMLElement>(".main-header");
    const mainMenu = document.querySelector<HTMLElement>(".menu");

    lists.length &&
        lists.forEach(list =>
            list.addEventListener("click", ({ target, currentTarget }: Event) => {
                const targetElement = target as HTMLElement;
                const closest = targetElement.closest(".list__item");
                if (!closest && !targetElement.closest(".accordion")) {
                    (currentTarget as HTMLElement).classList.remove("show");
                    mainHeader?.classList.remove("show");
                    mainMenu?.classList.remove("show");
                    changeMainHeader(mainHeader!, changingElements)("remove");
                    Store.menuStore.getState().close();
                    Store.burgerStore.getState().close();
                }
            }),
        );
}
