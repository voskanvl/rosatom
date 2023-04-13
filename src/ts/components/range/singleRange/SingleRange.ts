interface SingleOptions {
    min?: number;
    max?: number;
    class?: string;
}

const initialOptions = { min: "0", max: "100" };

const style = (className: string) => `
input[type="range"]${className ? "." + className : ""} {
    --value: 50%;
    -webkit-appearance: none;
    margin-right: 15px;
    width: 200px;
    height: 7px;
    border-radius: 5px;
    background-image: linear-gradient(to right, #fff, #72ADDE);
    background-size: var(--value) 100%;
    background-repeat: no-repeat;
  }
  
  /* Input Thumb */
  input[type="range"]${className ? "." + className : ""}::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #72ADDE;
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background .3s ease-in-out;
  }
  
  input[type="range"]${className ? "." + className : ""}::-moz-range-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #72ADDE;
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background .3s ease-in-out;
  }
  
  input[type="range"]${className ? "." + className : ""} ::-ms-thumb {
    -webkit-appearance: none;
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #72ADDE;
    cursor: ew-resize;
    box-shadow: 0 0 2px 0 #555;
    transition: background .3s ease-in-out;
  }
  
  input[type="range"]${className ? "." + className : ""}::-webkit-slider-thumb:hover {
    background: #72ADDE;
  }
  
  input[type="range"]${className ? "." + className : ""}::-moz-range-thumb:hover {
    background: #72ADDE;
  }
  
  input[type="range"]${className ? "." + className : ""} ::-ms-thumb:hover {
    background: #72ADDE;
  }
  
  /* Input Track */
  input[type=range]${className ? "." + className : ""}::-webkit-slider-runnable-track  {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
  
  input[type=range]${className ? "." + className : ""}::-moz-range-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
  
  input[type="range"]${className ? "." + className : ""}::-ms-track {
    -webkit-appearance: none;
    box-shadow: none;
    border: none;
    background: transparent;
  }
`;

export default class SingleRange {
    root: HTMLElement;
    options: Required<SingleOptions>;
    private value: number = 50;
    element: HTMLInputElement | null = null;
    private listeners: ((value: number) => void)[] | null = null;

    constructor(root: HTMLElement, options?: SingleOptions) {
        this.root = root;
        this.options = { ...initialOptions, ...options };
        this.createElement();
        this.mount();
    }

    private createElement() {
        this.element = document.createElement("input");
        this.element.type = "range";
        this.element.value = this.value + "";
        this.element.min = "0";
        this.element.max = "100";
        this.options.class && this.element.classList.add(this.options.class);

        this.element.addEventListener("input", ({ currentTarget }: Event) => {
            const { value } = currentTarget as HTMLInputElement;
            const width = +this.options.max - +this.options.min;
            const computed = (+value / 100) * width + +this.options.min; //приводим к заданному в options min и max диапазону
            this.element?.style.setProperty("--value", value + "%");
            value !== null && this.listeners && this.listeners.forEach(cb => cb(computed));
        });
    }

    private mount() {
        const s = document.createElement("style");
        s.innerHTML = style(this.options.class);
        this.element && this.root.append(s);
        this.element && this.root.append(this.element);
    }

    subscribe(cb: (value: number) => void) {
        if (this.listeners && this.listeners.length) {
        } else {
            this.listeners = [cb];
        }
    }

    unsubscribe(cb: (value: number) => void) {
        this.listeners = this.listeners && this.listeners?.filter(e => e !== cb);
    }
}
