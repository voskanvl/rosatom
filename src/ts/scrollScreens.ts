// import debounce from "./helpers/debounce";
// import listDisabledElementToScroll from "./listDisabledElementToScroll";
import store from "./store/store"

export const changeScreen = (x: 1 | -1) => {
    const { activeScreenNumber: current, setScreen } = store.getState()

    setScreen(current + x)
}

export function scrollScreens() {
    /*
        в store activeScreenNumber - номер текущкго скрина
        в store activeScreenElement - текщий элемент скрина
        screens - массив всех элментов скринов
    */

    const handleWheel = (event: WheelEvent) => {
        const { deltaY } = event
        // if (listDisabledElementToScroll(event)) return;
        // deltaY > 0 ? threshold.inc() : threshold.dec();
        deltaY > 0 ? changeScreen(1) : changeScreen(-1)
    }

    let wheelCount = 0,
        memoCount = 0

    let interval = 0
    window.addEventListener("wheel", (event: WheelEvent) => {
        wheelCount++
        if (!interval) {
            handleWheel(event)
            interval = setInterval(() => {
                if (wheelCount !== memoCount) {
                    memoCount = wheelCount
                    console.log(wheelCount, memoCount)
                    return
                }
                memoCount = 0
                wheelCount = 0
                clearInterval(interval)
                interval = 0
                // handleWheel(event);
            }, 60)
        }
    })
}
