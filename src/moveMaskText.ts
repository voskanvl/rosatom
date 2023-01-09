export default function moveMaskText(element: HTMLElement) {
    element.addEventListener("mousemove", (event: MouseEvent) => {
        element.style.setProperty(
            "--x",
            ((element.offsetWidth - element.offsetLeft) / (event.clientX + element.offsetLeft)) *
                100 +
                "%",
        );
        console.log(element.offsetWidth, event.clientX);
    });
    element.addEventListener("mouseout", () => {
        element.style.setProperty("--x", "");
    });
}
