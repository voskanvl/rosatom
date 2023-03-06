export default function closeMenu() {
    const lists = document.querySelectorAll<HTMLElement>("ul.list");
    const mainHeader = document.querySelector<HTMLElement>(".main-header");
    const mainMenu = document.querySelector<HTMLElement>(".menu");

    lists.length &&
        lists.forEach(list =>
            list.addEventListener("click", ({ target, currentTarget }: Event) => {
                const tragetElement = target as HTMLElement;
                if (!tragetElement.closest(".list__item") && !tragetElement.closest(".accordion")) {
                    (currentTarget as HTMLElement).classList.remove("show");
                    mainHeader?.classList.remove("show");
                    mainMenu?.classList.remove("show");
                }
            }),
        );
}
