// import listDisabledElementToScroll from "./listDisabledElementToScroll";
import store from "./store/store";

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
        console.log("touchstart", target);
        y = event.touches[0].screenY;
    };

    const handleEnd = (event: TouchEvent) => {
        // if (listDisabledElementToScroll(event)) return;
        // const mouseEvent = new Event();

        const target = event.target as HTMLElement;
        if (target.classList.contains("screen-switcher__item")) return target.click();
        if (target.closest(".geonet__region")) return target.click();
        if (target.closest(".team__controls")) return target.click();
        if (target.closest(".team__container")) return;
        if (target.closest(".main-header")) return;
        // if (target.closest(".main-header"))
        //     return target.dispatchEvent(new Event("mouseenter", { bubbles: true }));

        if (isScrolable(target)) return;

        // event.preventDefault();
        console.log("target", target);

        const delta = event.changedTouches[0].screenY - y;
        delta > 1 && Math.abs(delta / innerHeight) > THRESHOLD_TOUCHED_SCROLL
            ? store.getState().inc()
            : store.getState().dec();

        return true;
    };

    document.addEventListener("touchstart", handleStart, { passive: false });
    document.addEventListener("touchend", handleEnd, { passive: false });
}
