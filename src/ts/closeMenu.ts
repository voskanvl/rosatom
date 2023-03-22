import Store from "./store";

export default function closeMenu(selector: string) {
    if (!selector) throw Error("селектор должен быть непустым");

    const lists = document.querySelectorAll<HTMLElement>(selector);
    const mainHeader = document.querySelector<HTMLElement>(".main-header");
    const mainMenu = document.querySelector<HTMLElement>(".menu");

    lists.length &&
        lists.forEach(list =>
            list.addEventListener("click", (event: Event) => {
                event.stopPropagation();
                const { target, currentTarget } = event;

                if ((target as HTMLElement).closest(".options")) return;

                const targetElement = target as HTMLElement;
                const closestListItem = targetElement.closest(".list__item");
                const closestAccordion = targetElement.closest(".accordion");
                if (!closestListItem && !closestAccordion) {
                    (currentTarget as HTMLElement).classList.remove("show");
                    mainHeader?.classList.remove("show");
                    mainMenu?.classList.remove("show");

                    Store.menuStore.getState().close();
                    Store.burgerStore.getState().close();
                }
            }),
        );
}
