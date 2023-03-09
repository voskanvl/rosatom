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

    const handlerStore = (x: boolean) => {
        x
            ? (function () {
                  cursorRound!.style.setProperty("--color", "#fff");
                  document.body.style.cursor =
                      "url('../../assets/cursor/mini-white.svg') 19 19, pointer";
              })()
            : (function () {
                  cursorRound!.style.setProperty("--color", "#303031");
                  document.body.style.cursor =
                      "url('../../assets/cursor/mini-black.svg') 19 19, pointer";
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
