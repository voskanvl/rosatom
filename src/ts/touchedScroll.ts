// import listDisabledElementToScroll from "./listDisabledElementToScroll";
import store from "./store/store";
import { ignoredElementOnTouch } from "./config";

const THRESHOLD_TOUCHED_SCROLL = 0.1;

const isScrolable = (el: HTMLElement): boolean => {
    const getOverflow = (el: Element): boolean => {
        const { overflowY } = window.getComputedStyle(el);
        return overflowY === "scroll" || overflowY === "auto";
    };

    let canParent = el;
    while (
        !canParent.classList.contains("screen") &&
        canParent !== document.body &&
        !getOverflow(canParent)
    ) {
        canParent = canParent.parentElement as HTMLElement;
    }
    if (canParent.classList.contains("screen") || canParent === document.body) return false;
    return true;
};

export default function touchedScroll() {
    let y = 0;

    const handleStart = (event: TouchEvent) => {
        const target = event.target as HTMLElement;

        if (target.closest(".main-header") || target.closest(".search-popup__input")) return;

        if (isScrolable(target)) return;
        event.preventDefault();
        y = event.touches[0].screenY;
    };

    const handleEnd = (event: TouchEvent) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains("screen-switcher__item")) return target.click();
        ignoredElementOnTouch.click.forEach(e => {
            const closestElement = target.closest(e) as HTMLElement;
            if (closestElement && "click" in target) return target.click();

            //Ищем среди предков первый кликабельный элемент
            let currentEl = target;
            while (!("click" in currentEl) || currentEl === document.body) {
                currentEl = currentEl.parentElement!;
            }
            currentEl.click();
        });

        if (ignoredElementOnTouch.drop.some(e => !!target.closest(e))) return;

        if (isScrolable(target)) return;

        const delta = event.changedTouches[0].screenY - y;
        delta > 1 && Math.abs(delta / innerHeight) > THRESHOLD_TOUCHED_SCROLL
            ? store.getState().inc()
            : store.getState().dec();

        return true;
    };

    document.addEventListener("touchstart", handleStart, { passive: false });
    document.addEventListener("touchend", handleEnd, { passive: false });
}
