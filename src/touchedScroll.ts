import listDisabledElementToScroll from "./listDisabledElementToScroll";
import { store } from "./store";

const THRESHOLD_TOUCHED_SCROLL = 0.1;

const isScrolable = (el: HTMLElement): boolean => {
    const getOverflow = (el: HTMLElement): boolean => {
        const { overflowY } = window.getComputedStyle(el);
        return overflowY === "scroll" || overflowY === "auto";
    };

    let canParent = el;
    while (!getOverflow(canParent) && !canParent.classList.contains("screen")) {
        canParent = canParent.parentElement as HTMLElement;
    }
    if (canParent.classList.contains("screen")) return false;
    return true;
};

export default function touchedScroll() {
    let y = 0;
    const handleStart = (event: TouchEvent) => {
        if (isScrolable(event.target as HTMLElement)) return;
        event.preventDefault();
        console.log("touchstart", event.target);
        y = event.touches[0].screenY;
    };
    const handleEnd = (event: TouchEvent) => {
        // if (listDisabledElementToScroll(event)) return;

        if (isScrolable(event.target as HTMLElement)) return;

        event.preventDefault();
        console.log("event.target", event.target);

        const delta = event.changedTouches[0].screenY - y;
        console.log("🚀 ~ delta / innerHeight", delta / innerHeight);
        delta > 1 && delta / innerHeight > THRESHOLD_TOUCHED_SCROLL
            ? store.getState().inc()
            : store.getState().dec();
    };
    document.addEventListener("touchstart", handleStart, { passive: false });
    document.addEventListener("touchend", handleEnd, { passive: false });
    document.addEventListener("scroll", console.log);
}
