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
                logo.style.backgroundImage = "url('../../../assets/logo/logo-white.png')";
                optionsSearch.style.filter = "invert(1)";
                optionsInternational.style.color = "#fff";
            });
        menu &&
            menu.addEventListener("mouseleave", () => {
                logo.style.backgroundImage = "url('../../../assets/logo/logo.png')";
                optionsSearch.style.filter = "";
                optionsInternational.style.color = "";
            });
    }
}
