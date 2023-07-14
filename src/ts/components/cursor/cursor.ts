import { SCREEN_NUMBER_TO_CHANGE } from "../../config"
import store from "../../store"

const CURSOR_BLACK = "url('../../assets/cursor/mini-black.svg') 10 10, none"
const CURSOR_WHITE = "url('../../assets/cursor/mini-white.svg') 10 10, none"

export const setBlackCursor = () => {
    document.body.style.cursor = CURSOR_BLACK
    const curR = document.querySelector<HTMLElement>(".cursor__round")
    curR && (curR.style.borderColor = "#303031")
}
export const setWhiteCursor = () => {
    document.body.style.cursor = CURSOR_WHITE
    const curR = document.querySelector<HTMLElement>(".cursor__round")
    curR && (curR.style.borderColor = "#fff")
}

export const handlerStore = (cursorRound: HTMLElement, x: boolean) => {
    x
        ? (function () {
              cursorRound.style.setProperty("--color", "#fff")
              document.body.style.cursor = CURSOR_WHITE
          })()
        : (function () {
              cursorRound.style.setProperty("--color", "#303031")
              document.body.style.cursor =
                  !store.lockStore.getState().state &&
                  SCREEN_NUMBER_TO_CHANGE.some(e => e === store.store.getState().activeScreenNumber)
                      ? CURSOR_WHITE
                      : CURSOR_BLACK
          })()
}

export default function cursor() {
    // initCursor();

    const cursorRound = document.querySelector<HTMLElement>(".cursor__round")
    if (!cursorRound) throw Error("there isn't .cursor__round")

    document.addEventListener("mousemove", (event: MouseEvent) => {
        const { clientX, clientY } = event
        cursorRound.style.setProperty("--x", clientX + "px")
        cursorRound.style.setProperty("--y", clientY + "px")
    })

    document.addEventListener("mousedown", () => {
        cursorRound.style.scale = "0.85 0.85"
        cursorRound.style.translate = "-3px -3px"
    })
    document.addEventListener("mouseup", () => {
        cursorRound.style.scale = ""
        cursorRound.style.translate = ""
    })

    //---   init cursor ---
    handlerStore(cursorRound, true)

    store.store.subscribe(({ activeScreenNumber }) => {
        handlerStore(
            cursorRound,
            SCREEN_NUMBER_TO_CHANGE.some(e => e === activeScreenNumber),
        )
    })
    store.menuStore.subscribe(({ isOpen }) => {
        handlerStore(cursorRound, isOpen)
    })
    store.burgerStore.subscribe(({ isOpen }) => {
        handlerStore(cursorRound, isOpen)
    })
}
