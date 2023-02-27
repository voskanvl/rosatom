export default function moveMaskText(element: HTMLElement) {
    element.addEventListener("mousemove", (event: MouseEvent) => {
        element.style.setProperty("--x", event.clientX - (element.offsetLeft || 200) + "px");
    });
    element.addEventListener("mouseout", () => {
        element.style.setProperty("--x", "");
    });
}
