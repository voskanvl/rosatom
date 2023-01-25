import moveMaskText from "./moveMaskText";
export default function applyMaskText() {
    const moveMaskTextCreator = (element: HTMLElement) => {
        if (!element) throw Error("нет " + element);
        moveMaskText(element);
    };

    const textMaskedElements = document.querySelectorAll<HTMLElement>(".text-masked-element");
    if (textMaskedElements && textMaskedElements.length > 0) {
        textMaskedElements.forEach(e => moveMaskTextCreator(e));
    }
}
