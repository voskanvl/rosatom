import store from "./store/store";
import { SCREEN_NUMBER_TO_CHANGE } from "./SCREEN_NUMBER_TO_CHANGE";

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
                logo.classList.add("logo--white");
                optionsSearch.classList.add(".options__search--white");
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
