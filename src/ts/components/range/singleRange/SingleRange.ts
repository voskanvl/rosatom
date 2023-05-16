interface SingleOptions {
    min?: number
    max?: number
    val?: number
    step?: number
    class?: string
}

const initialOptions = { min: 0, max: 100, val: 50, class: "", step: 1 }

export default class SingleRange {
    root: HTMLElement
    options: Required<SingleOptions>
    private value: number = 50
    element: HTMLInputElement | null = null
    private listeners: ((value: number) => void)[] | null = null
    private connectedElement: HTMLElement | null = null
    private listenConnectedElement = (event: Event) => {
        const { value } = event.target as HTMLInputElement
        if (+value < this.options.min || +value > this.options.max) return
        this.value = +value
        this.element && (this.element.value = this.value + "")
        this.element && this.element.style.setProperty("--value", this.value + "%")
    }

    constructor(root: HTMLElement, options?: SingleOptions) {
        this.root = root
        this.options = {
            ...initialOptions,
            ...Object.fromEntries(Object.entries(options || {}).filter(([_, val]) => !!val)),
        }
        this.value = (options && options.val) || 0
        this.createElement()
        this.mount()
    }

    private createElement() {
        this.element = document.createElement("input")
        this.element.type = "range"
        this.element.min = this.options.min + ""
        this.element.max = this.options.max + ""
        this.element.value = this.value + ""
        this.element.step = this.options.step + ""
        this.element.style.setProperty("--value", this.valuePercent(this.value) + "%")
        this.options.class && this.element.classList.add(this.options.class)

        this.element.addEventListener("input", ({ currentTarget }: Event) => {
            const { value } = currentTarget as HTMLInputElement
            // const width = +this.options.max - +this.options.min
            // const computed = (+value / 100) * width + +this.options.min //приводим к заданному в options min и max диапазону
            this.element?.style.setProperty("--value", this.valuePercent(+value) + "%")
            value !== null && this.listeners && this.listeners.forEach(cb => cb(+value))
        })
    }

    private valuePercent = (value: number): number => {
        return (((value - this.options.min) / (this.options.max - this.options.min)) * 100) | 0
    }

    private mount() {
        this.element && this.root.append(this.element)
    }

    subscribe(cb: (value: number) => void) {
        if (this.listeners && this.listeners.length) {
        } else {
            this.listeners = [cb]
        }
    }

    unsubscribe(cb: (value: number) => void) {
        this.listeners = this.listeners && this.listeners?.filter(e => e !== cb)
    }

    connectOutput(el: HTMLElement) {
        this.connectedElement = el
        let handler: (v: number) => void

        if (el.nodeName.toLowerCase() === "input") {
            handler = (v: number) => ((el as HTMLInputElement).value = (v | 0) + "")
            this.connectedElement.addEventListener("input", this.listenConnectedElement)
        } else {
            handler = (v: number) => (el.innerText = (v | 0) + "")
        }
        this.subscribe(handler)
    }
}
