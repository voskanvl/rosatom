import store from "./store/store";

export default function clickToLogo() {
    const logo = document.querySelector<HTMLElement>(".logo");
    if (!logo) return;
    logo.addEventListener("click", () => {
        location = location;
    });
}
