import { SCREEN_NUMBER_TO_CHANGE } from "../../config";
import store from "../../store";

export const setBlackCursor = () => {
    document.body.style.cursor = "url('../../assets/cursor/mini-black.svg') 10 10, none";
    const curR = document.querySelector<HTMLElement>(".cursor__round");
    curR && (curR.style.borderColor = "#303031");
};

export const handlerStore = (cursorRound: HTMLElement, x: boolean) => {
    x
        ? (function () {
              cursorRound.style.setProperty("--color", "#fff");
              document.body.style.cursor = "url('../../assets/cursor/mini-white.svg') 10 10, none";
          })()
        : (function () {
              cursorRound.style.setProperty("--color", "#303031");
              document.body.style.cursor = SCREEN_NUMBER_TO_CHANGE.some(
                  e => e === store.store.getState().activeScreenNumber,
              )
                  ? "url('../../assets/cursor/mini-white.svg') 10 10, none"
                  : "url('../../assets/cursor/mini-black.svg') 10 10, none";
          })();
};

export default function cursor() {
    // initCursor();

    const cursorRound = document.querySelector<HTMLElement>(".cursor__round");
    if (!cursorRound) throw Error("there isn't .cursor__round");

    document.addEventListener("mousemove", (event: MouseEvent) => {
        const { clientX, clientY } = event;
        cursorRound.style.setProperty("--x", clientX + "px");
        cursorRound.style.setProperty("--y", clientY + "px");
    });

    document.addEventListener("mousedown", () => {
        cursorRound.style.scale = "0.8 0.8";
        cursorRound.style.translate = "-1px -1px";
    });
    document.addEventListener("mouseup", () => {
        cursorRound.style.scale = "";
        cursorRound.style.translate = "";
    });

    //---   init cursor ---
    handlerStore(cursorRound, true);

    store.store.subscribe(({ activeScreenNumber }) => {
        handlerStore(
            cursorRound,
            SCREEN_NUMBER_TO_CHANGE.some(e => e === activeScreenNumber),
        );
    });
    store.menuStore.subscribe(({ isOpen }) => {
        handlerStore(cursorRound, isOpen);
    });
    store.burgerStore.subscribe(({ isOpen }) => {
        handlerStore(cursorRound, isOpen);
    });
}
