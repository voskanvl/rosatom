export default function toggleLogoImage() {
    const menu = document.querySelector<HTMLElement>(".menu");
    const logo = document.querySelector<HTMLElement>(".logo");
    if (!logo) throw Error("нет logo");
    if (navigator.userAgent.toLocaleLowerCase().includes("firefox")) {
        menu &&
            menu.addEventListener("mouseenter", () => {
                logo.style.backgroundImage = "url('../../../assets/logo/logo-white.png')";
            });
        menu &&
            menu.addEventListener("mouseleave", () => {
                logo.style.backgroundImage = "url('../../../assets/logo/logo.png')";
            });
    }
}
