import listDisabledElementToScroll from "./listDisabledElementToScroll";
import store from "./store/store";

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

export const changeScreen = (x: 1 | -1) => {
    const { activeScreenNumber: current, setScreen } = store.getState();

    setScreen(current + x);
};

export function scrollScreens() {
    /*
        в store activeScreenNumber - номер текущкго скрина
        в store activeScreenElement - текщий элемент скрина
        screns - массив всех элментов скринов
    */

    const threshold = new ThresholdScroll();

    window.addEventListener("wheel", (event: WheelEvent) => {
        const { deltaY } = event;
        if (listDisabledElementToScroll(event)) return;
        deltaY > 0 ? threshold.inc() : threshold.dec();
    });

    threshold.subscribe((msg: ThresholdScrollMsg) => {
        if (msg === "down") changeScreen(-1);
        if (msg === "up") changeScreen(1);
    });
}
