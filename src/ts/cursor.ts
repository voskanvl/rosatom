import { SCREEN_NUMBER_TO_CHANGE } from "./config";
import store from "./store";


export default function cursor() {
    // initCursor();

    const cursorRound = document.querySelector<HTMLElement>(".cursor__round");

    document.addEventListener("mousemove", (event: MouseEvent) => {
        const { clientX, clientY } = event;
        cursorRound!.style.setProperty("--x", clientX + "px");
        cursorRound!.style.setProperty("--y", clientY + "px");
    });

    document.addEventListener("mousedown", () => {
        cursorRound!.style.scale = "0.8 0.8";
        cursorRound!.style.translate = "-1px -1px";
    });
    document.addEventListener("mouseup", () => {
        cursorRound!.style.scale = "";
        cursorRound!.style.translate = "";
    });

    const handlerStore = (x: boolean) => {
        x
            ? (function () {
                  cursorRound!.style.setProperty("--color", "#fff");
                  document.body.style.cursor = "url('../../assets/cursor/mini-white.svg'), none";
              })()
            : (function () {
                  cursorRound!.style.setProperty("--color", "#303031");
                  document.body.style.cursor = SCREEN_NUMBER_TO_CHANGE.some(
                      e => e === store.store.getState().activeScreenNumber,
                  )
                      ? "url('../../assets/cursor/mini-white.svg'), none"
                      : "url('../../assets/cursor/mini-black.svg'), none";
              })();
    };

    //---   init cursor ---
    handlerStore(true);

    store.store.subscribe(({ activeScreenNumber }) => {
        handlerStore(SCREEN_NUMBER_TO_CHANGE.some(e => e === activeScreenNumber));
    });
    store.menuStore.subscribe(({ isOpen }) => {
        handlerStore(isOpen);
    });
    store.burgerStore.subscribe(({ isOpen }) => {
        handlerStore(isOpen);
    });
}
