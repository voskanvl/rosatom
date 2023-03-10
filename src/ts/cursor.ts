import { SCREEN_NUMBER_TO_CHANGE } from "./config";
import store from "./store";

export default function cursor() {
    const cursorRound = document.querySelector<HTMLElement>(".cursor__round");
    const cursorRoundCoords = {
        x: 0,
        y: 0,
    };
    setInterval(() => {
        cursorRound!.style.setProperty("--x", cursorRoundCoords.x + "px");
        cursorRound!.style.setProperty("--y", cursorRoundCoords.y + "px");
    }, 200);

    document.addEventListener("mousemove", (event: MouseEvent) => {
        const { clientX, clientY } = event;
        cursorRoundCoords.x = clientX;
        cursorRoundCoords.y = clientY;
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
                  document.body.style.cursor = "url('../../assets/cursor/mini-white.svg'), pointer";
              })()
            : (function () {
                  cursorRound!.style.setProperty("--color", "#303031");
                  document.body.style.cursor = SCREEN_NUMBER_TO_CHANGE.some(
                      e => e === store.store.getState().activeScreenNumber,
                  )
                      ? "url('../../assets/cursor/mini-white.svg'), pointer"
                      : "url('../../assets/cursor/mini-black.svg'), pointer";
              })();
    };

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
