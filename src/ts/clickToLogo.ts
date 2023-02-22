export default function clickToLogo() {
    const logo = document.querySelector<HTMLElement>(".logo");
    if (!logo) return;
    logo.addEventListener("click", () => {
        location.href = "/";
    });
}
