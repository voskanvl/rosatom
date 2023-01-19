import listDisabledElementToScroll from "./listDisabledElementToScroll";
import { store } from "./store";

const THRESHOLD_TOUCHED_SCROLL = 0.1;

export default function touchedScroll() {
    let y = 0;
    const handleStart = (event: TouchEvent) => {
        // event.preventDefault();
        console.log("touchstart");
        y = event.touches[0].screenY;
    };
    const handleEnd = (event: TouchEvent) => {
        if (listDisabledElementToScroll(event)) return;
        // event.preventDefault();
        console.log("touchend");
        const delta = event.changedTouches[0].screenY - y;
        console.log("🚀 ~ delta / innerHeight", delta / innerHeight);
        delta > 1 && delta / innerHeight > THRESHOLD_TOUCHED_SCROLL
            ? store.getState().inc()
            : store.getState().dec();
    };
    document.addEventListener("touchstart", handleStart, { passive: false });
    document.addEventListener("touchend", handleEnd, { passive: false });
}
