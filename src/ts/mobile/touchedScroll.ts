// import listDisabledElementToScroll from "./listDisabledElementToScroll";
import store from "../store/store"
import { ignoredElementOnTouch } from "../config"

const THRESHOLD_TOUCHED_SCROLL = 0.1

const isScrolable = (el: HTMLElement): boolean => {
    const isOverflow = (el: Element): boolean => {
        const { overflowY, height } = window.getComputedStyle(el)
        const { scrollHeight } = el
        console.log(scrollHeight, height)
        // return overflowY === "scroll" || overflowY === "auto"
        const parsedHeight = Math.ceil(parseFloat(height))
        if (scrollHeight > parsedHeight && overflowY !== "hidden") return true
        return false
    }

    let canParent = el
    while (
        !canParent.classList.contains("screen") &&
        canParent !== document.body &&
        !isOverflow(canParent)
    ) {
        canParent = canParent.parentElement as HTMLElement
    }
    if (canParent.classList.contains("screen") || canParent === document.body) return false
    return true
}

export default function touchedScroll() {
    let y = 0

    const handleStart = (event: TouchEvent) => {
        const target = event.target as HTMLElement

        if (target.closest(".main-header") || target.closest(".search-popup__input")) return

        if (isScrolable(target)) return
        event.preventDefault()
        y = event.touches[0].screenY
    }

    const handleEnd = (event: TouchEvent | MouseEvent) => {
        const target = event.target as HTMLElement

        if (target.classList.contains("screen-switcher__item")) return target.click()

        ignoredElementOnTouch.click.forEach(e => {
            console.log("🚀 ~ target.tagName :", target.tagName, "click" in target)
            let currentEl = target
            if (target.closest(e)) {
                if ("click" in target) {
                    return target.click()
                } else {
                    while (!("click" in currentEl) || currentEl === document.body) {
                        currentEl = currentEl.parentElement!
                    }
                    currentEl.click()
                }
            }
        })

        if (ignoredElementOnTouch.drop.some(e => !!target.closest(e))) return

        if (store.getState().activeScreenNumber !== 5 && isScrolable(target)) return

        let delta = 0
        if ("changedTouches" in event) {
            delta = event.changedTouches[0].screenY - y
        } else {
            delta = event.screenY - y
        }

        if (delta > 1 && Math.abs(delta / innerHeight) > THRESHOLD_TOUCHED_SCROLL)
            store.getState().dec()
        if (delta < -1 && Math.abs(delta / innerHeight) > THRESHOLD_TOUCHED_SCROLL)
            store.getState().inc()

        return true
    }

    document.addEventListener("touchstart", handleStart, { passive: false })
    document.addEventListener("touchend", handleEnd, { passive: false })
    document.addEventListener("mouseup", handleEnd, { passive: false })
}
