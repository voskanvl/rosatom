type CountControls = {
    plus: HTMLElement;
    minus: HTMLElement;
};
export default class Counter {
    el: HTMLInputElement;
    controls: CountControls;

    constructor(el: HTMLInputElement, controls: CountControls) {
        this.el = el;
        this.controls = controls;
        this.controls &&
            this.controls.plus &&
            this.controls.plus.addEventListener("click", () => this.inc());
        this.controls &&
            this.controls.minus &&
            this.controls.minus.addEventListener("click", () => this.dec());
    }

    inc() {
        this.el && (this.el.value = Number(this.el.value) + 1 + "");
    }

    dec() {
        if (!this.el || !Number(this.el.value) || Number(this.el.value) <= 1) return;
        this.el.value = Number(this.el.value) - 1 + "";
    }
}
