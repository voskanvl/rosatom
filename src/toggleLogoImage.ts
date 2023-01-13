import { store } from "./store";
import { SCREEN_NUMBER_TO_CHANGE } from "./changeMainHeaderByScroll";

export default function toggleLogoImage() {
    const menu = document.querySelector<HTMLElement>(".menu");
    const logo = document.querySelector<HTMLElement>(".logo");
    const optionsSearch = document.querySelector<HTMLElement>(".options__search");
    const optionsInternational = document.querySelector<HTMLElement>(".options__international");

    if (!logo) throw Error("нет logo");
    if (!optionsSearch) throw Error("нет options search");
    if (!optionsInternational) throw Error("нет options international");

    if (navigator.userAgent.toLocaleLowerCase().includes("firefox")) {
        menu &&
            menu.addEventListener("mouseenter", () => {
                if (SCREEN_NUMBER_TO_CHANGE.includes(+store.getState().activeScreenNumber)) return;
                // logo.style.backgroundImage = "url('../../../assets/logo/logo-white.png')";
                logo.classList.add("logo--white");
                optionsSearch.style.filter = "invert(1)";
                optionsInternational.style.color = "#fff";
            });
        menu &&
            menu.addEventListener("mouseleave", () => {
                if (SCREEN_NUMBER_TO_CHANGE.includes(+store.getState().activeScreenNumber)) return;
                // logo.style.backgroundImage = "url('../../../assets/logo/logo.png')";
                logo.classList.remove("logo--white");
                optionsSearch.style.filter = "";
                optionsInternational.style.color = "";
            });
    }
}
