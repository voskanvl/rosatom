type CountControls = {
    plus: HTMLElement;
    minus: HTMLElement;
};
type cb = (val: number) => void;
export default class Counter {
    el: HTMLInputElement;
    controls: CountControls;
    private listeners: cb[] = [];
    value: number = 1;

    constructor(el: HTMLInputElement, controls: CountControls) {
        this.el = el;
        this.controls = controls;
        this.controls &&
            this.controls.plus &&
            this.controls.plus.addEventListener("click", () => this.inc());
        this.controls &&
            this.controls.minus &&
            this.controls.minus.addEventListener("click", () => this.dec());

        return this;
    }

    inc() {
        const value = Number(this.el.value) + 1;
        this.el && (this.el.value = value + "");
        this.el && (this.value = value);
        this.broadcast();
    }

    dec() {
        if (!this.el || !Number(this.el.value) || Number(this.el.value) <= 1) return;
        const value = Number(this.el.value);
        this.el.value = value - 1 + "";
        this.el && (this.value = value - 1);
        this.broadcast();
    }

    subscribe(cb: cb) {
        if (!this.listeners) this.listeners = [];
        this.listeners.push(cb);
    }
    unsubscribe(cb: cb) {
        if (!this.listeners) return;
        this.listeners = this.listeners.filter(e => e !== cb);
    }

    private broadcast() {
        if (!this.listeners) return;
        this.listeners.forEach(e => e(this.value));
    }
}
