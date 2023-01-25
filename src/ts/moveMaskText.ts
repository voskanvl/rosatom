export default function moveMaskText(element: HTMLElement) {
    element.addEventListener("mousemove", (event: MouseEvent) => {
        console.log("🚀 ~ e", event.clientX, element.offsetLeft);
        element.style.setProperty(
            "--x",
            // ((element.offsetWidth - element.offsetLeft) / (event.clientX + element.offsetLeft)) *
            //     100 +
            //     "%",
            event.clientX - (element.offsetLeft || 200) + "px",
        );
    });
    element.addEventListener("mouseout", () => {
        element.style.setProperty("--x", "");
    });
}
