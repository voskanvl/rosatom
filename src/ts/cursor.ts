import { SCREEN_NUMBER_TO_CHANGE } from "./config";
import store from "./store";

export default function cursor() {
    const cursor = document.querySelector<HTMLElement>("#cursor");
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
        console.log("🚀 ~ {clientX, clientY} :", { clientX, clientY });
        cursor!.style.setProperty("--x", clientX + "px");
        cursor!.style.setProperty("--y", clientY + "px");

        cursorRoundCoords.x = clientX;
        cursorRoundCoords.y = clientY;
    });

    document.addEventListener("click", ({ target }: Event) => {
        console.log("click", target);
        (target as HTMLElement).click();
    });

    store.store.subscribe(({ activeScreenNumber }) => {
        SCREEN_NUMBER_TO_CHANGE.some(e => e === activeScreenNumber)
            ? cursor!.style.setProperty("--color", "#fff")
            : cursor!.style.setProperty("--color", "#303031");
    });
}
