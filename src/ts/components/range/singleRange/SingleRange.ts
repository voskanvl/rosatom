interface SingleOptions {
    min?: number
    max?: number
    val?: number | string
    step?: number
    class?: string
    scale?: {
        is: boolean
        unit?: string
    }
    array?: string
}

const initialOptions = { min: 0, max: 100, val: 50, class: "", step: 1 }

export default class SingleRange {
    root: HTMLElement
    options: Required<Omit<SingleOptions, "scale" | "array">> & {
        scale?: {
            is: boolean
            unit?: string
        }
        array?: string
    }
    private optionElements: HTMLOptionElement[] | null = null
    private value: number = 0
    element: HTMLInputElement | null = null
    private listeners: ((value: string) => void)[] | null = null
    private connectedElement: HTMLElement | null = null

    private mapValueLabel: Record<string, string> = {} as Record<string, string>

    constructor(root: HTMLElement, options?: SingleOptions) {
        this.root = root
        this.options = {
            ...initialOptions,
            ...Object.fromEntries(
                Object.entries(options || {}).filter(
                    ([_, val]) => val !== undefined || val !== null,
                ),
            ),
        }
        let valuesArray: string[] = []

        if (!this.options.scale) {
            const rangeWidth = (+this.options.max - +this.options.min) / (+this.options.step || 1)
            valuesArray = [...Array(rangeWidth + 1).keys()].map(i => i + +this.options.min + "")
        }

        if (this.options.scale) {
            for (
                let i = 0;
                i <= (+this.options.max - +this.options.min) / (+this.options.step || 1);
                i++
            ) {
                const val: string =
                    +this.options.min +
                    (+this.options.step || 1) * i +
                    (this.options.scale.unit ? " " + this.options.scale.unit : "")
                valuesArray.push(val)
            }
        }

        if (this.options.array) {
            try {
                valuesArray = JSON.parse(this.options.array.replace(/\'/g, '"'))
                if (!valuesArray || !Array.isArray(valuesArray)) return
            } catch (error) {
                console.warn(error)
            }
        }

        this.options.min = 0
        this.options.max = valuesArray.length - 1
        this.options.step = 1
        this.root.innerHTML = ""
        this.value = valuesArray.indexOf(
            this.options.val + (this.options.scale?.unit ? " " + this.options.scale.unit : ""),
        )
        this.createElement()
        this.mount()

        const elementOptions = this.createOptionElements(valuesArray)
        const scale = this.createScaleByStep(elementOptions)
        this.options.scale?.is &&
            scale &&
            this.element?.insertAdjacentElement("afterend", scale.datalist)

        this.listenConnectedElement = this.listenConnectedElement.bind(this)
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
            this.element?.style.setProperty("--value", this.valuePercent(+value) + "%")

            this.listeners && this.listeners.forEach(cb => cb(this.mapValueLabel[value]))
        })

        return this.element
    }

    private valuePercent = (value: number): number => {
        return (((value - this.options.min) / (this.options.max - this.options.min)) * 100) | 0
    }

    private mount() {
        this.element && this.root.append(this.element)
    }

    subscribe(cb: (value: string) => void) {
        if (this.listeners && this.listeners.length) {
        } else {
            this.listeners = [cb]
        }
    }

    unsubscribe(cb: (value: string) => void) {
        this.listeners = this.listeners && this.listeners?.filter(e => e !== cb)
    }

    connectOutput(el: HTMLElement) {
        this.connectedElement = el
        let handler: (v: string) => void

        if (el.nodeName.toLowerCase() === "input") {
            handler = (v: string) => ((el as HTMLInputElement).value = v)
            this.connectedElement.addEventListener("input", this.listenConnectedElement)
        } else {
            handler = (v: string) => (el.innerText = v)
        }
        this.subscribe(handler)
    }

    private listenConnectedElement(event: Event) {
        const targetEl = event.target as HTMLInputElement
        const { value } = targetEl
        console.log(this.options)
        if (+value < +this.options.min) {
            targetEl.value = this.options.min + ""
            return
        }
        if (+value > this.options.max) {
            targetEl.value = this.options.max + ""
            return
        }
        this.value = +value
        this.element && (this.element.value = this.value + "")
        this.element &&
            this.element.style.setProperty("--value", this.valuePercent(this.value) + "%")

        if (this.options.scale && this.optionElements) {
            this.setCurrentOption(this.optionElements, value)
        }
    }

    private setCurrentOption(optionElements: HTMLOptionElement[], val: string) {
        optionElements.forEach(option => {
            if (option.value === val) {
                option.setAttribute("current", "true")
            } else {
                option.removeAttribute("current")
            }
        })
    }

    private createOptionElements(valueArray: number[] | string[]): HTMLOptionElement[] {
        const arr: HTMLOptionElement[] = []
        for (let i = 0; i < valueArray.length; i++) {
            const option = document.createElement("option")
            option.value = valueArray[i].toString()

            // const unit = (this.options.scale && this.options.scale.unit) || ""
            option.label = valueArray[i].toString()
            arr.push(option)
            this.mapValueLabel = { ...this.mapValueLabel, [i + ""]: valueArray[i].toString() }
        }

        return arr
    }

    private createScaleByStep(optionElements: HTMLOptionElement[]) {
        if (!this.element) return

        const id = "markers" + Date.now()
        const datalist = document.createElement("datalist")
        datalist.id = id

        optionElements.forEach(el => datalist.append(el))

        this.optionElements = optionElements

        this.element.addEventListener("input", (event: Event) => {
            const val = (event.target as HTMLInputElement).value
            this.setCurrentOption(optionElements, this.mapValueLabel[val])
        })

        this.setCurrentOption(optionElements, this.mapValueLabel[this.value + ""])
        return { datalist, id }
    }
}
