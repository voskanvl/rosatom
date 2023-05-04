export default function tabs() {
    const inputs = document.querySelectorAll<HTMLInputElement>(
            ".tabs__control > input[type='radio']",
        ),
        pages = [...document.querySelectorAll<HTMLElement>(".tabs__page")];
    if (!inputs || !inputs.length) {
        console.warn("there isn't .tabs__control > input[type='radio']");
        return;
    }
    if (!pages || !inputs.length) {
        console.warn("there isn't .tabs__page");
        return;
    }
    inputs.forEach(input =>
        input.addEventListener("click", () => {
            const { id, name } = input.dataset;
            pages.forEach(page => {
                if (page.dataset.id === id) {
                    page.setAttribute("active", "active");

                    const url = new URL(location.toString());
                    url.search = name || "";
                    history.pushState(null, "", url);
                } else {
                    page.removeAttribute("active");
                }
            });
        }),
    );
}
