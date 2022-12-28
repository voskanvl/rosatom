import { StoreApi } from "zustand/vanilla";
import { StoreState } from "./main";

type ThresholdScrollMsg = "up" | "down";

class ThresholdScroll {
    static threshold = 7;
    private _thresholdUp = 0;
    private _thresholdDown = 0;
    subscribers: ((val: ThresholdScrollMsg) => void)[] | null = null;

    inc() {
        this._thresholdUp++;
        if (this._thresholdUp >= ThresholdScroll.threshold) {
            !!this.subscribers && this.subscribers.forEach(e => e("up"));
            this._thresholdUp = 0;
        }
    }
    dec() {
        this._thresholdDown--;
        if (this._thresholdDown < 0) {
            !!this.subscribers && this.subscribers.forEach(e => e("down"));
            this._thresholdDown = ThresholdScroll.threshold;
        }
    }

    subscribe(fn: (val: ThresholdScrollMsg) => void) {
        if (!this.subscribers) this.subscribers = [fn];
        else this.subscribers.push(fn);
    }
    unsubscribe(fn: (val: ThresholdScrollMsg) => void) {
        if (!this.subscribers) return;
        this.subscribers = this.subscribers?.filter(e => e !== fn);
    }
}

export function scrollScreens(store: StoreApi<StoreState>) {
    //получаем список всех скринов
    const screens = [...document.querySelectorAll<HTMLElement>(".screen")];
    let currentActive = screens.find(e => e.getAttribute("active"));
    if (!currentActive) throw Error("нет активного скрина при инициализации приложения");
    store.setState(state => ({ ...state, activeScreenElement: currentActive }));

    const currentActiveNumber = Number(currentActive.dataset.number); //номер активного скрина
    if (isNaN(currentActiveNumber))
        throw Error("data-number активного скрина не проелбразуется в число");

    store.setState(state => ({ ...state, activeScreenNumber: currentActiveNumber }));
    /*
        в store activeScreenNumber - номер текущкго скрина
        в store activeScreenElement - текщий элемент скрина
        screns - массив всех элментов скринов
    */

    const threshold = new ThresholdScroll();

    window.addEventListener("wheel", ({ deltaY }: WheelEvent) => {
        deltaY > 0 ? threshold.inc() : threshold.dec();
    });

    const changeScreen = (x: number) => {
        const { activeScreenNumber: current, activeScreenElement: currentElement } =
            store.getState();

        if (!currentElement) throw Error("нет активного элемента. ошибка инициализации");

        let next = current + x;
        if (next < 0) next = 0;
        if (next > screens.length - 1) next = screens.length - 1;

        const nextElement = screens.find(e => e.dataset.number === next + "");
        if (!nextElement) throw Error("невозможно найти следующий скрин");

        currentElement.removeAttribute("active");
        if (next > current) {
            currentElement.style.top = "-100vh";
        } else {
            currentElement.style.top = "100vh";
        }

        nextElement.setAttribute("active", "active");
        nextElement.style.top = "0";

        store.setState(state => ({ ...state, activeScreenElement: nextElement }));
        store.setState(state => ({ ...state, activeScreenNumber: next }));
    };

    threshold.subscribe((msg: ThresholdScrollMsg) => {
        if (msg === "down") changeScreen(-1);
        if (msg === "up") changeScreen(1);
    });
}
