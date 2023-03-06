export default function moveMaskText(element: HTMLElement) {
    element.addEventListener("mousemove", (event: MouseEvent) => {
        const { width } = getComputedStyle(element);
        const widthValue = parseInt(width);
        element.style.setProperty("--x", widthValue - event.offsetX + 50 + "px");
    });
    element.addEventListener("mouseout", () => {
        element.style.setProperty("--x", "");
    });
}
