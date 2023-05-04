import store from "../../store";

export default function switchSearhOnMenu() {
    store.menuStore.subscribe(({ isOpen }) => {
        const optionsSearch = document.querySelector<HTMLElement>(
            ".main-header > .options > .options__search",
        );
        optionsSearch &&
            (isOpen
                ? optionsSearch.classList.add("options__search--white")
                : optionsSearch.classList.remove("options__search--white"));
    });
}
