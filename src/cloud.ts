import SingleRange from "./ts/components/range/singleRange/SingleRange"
import feedback from "./ts/components/modal/feedback"
import modal from "./ts/components/modal/modal"

const button1 = document.querySelector<HTMLButtonElement>(".cloud__button")
const button2 = document.querySelector<HTMLButtonElement>(".rent-config__button")
button1 && button1.addEventListener("click", () => modal(feedback()))
button2 && button2.addEventListener("click", () => modal(feedback()))

const ranges = document.querySelectorAll<HTMLElement>(".range__input")
ranges &&
    ranges.forEach(range => {
        const max = range.getAttribute("max"),
            min = range.getAttribute("min"),
            val = range.getAttribute("val")

        const sr = new SingleRange(range, {
            max: max === null ? 0 : +max,
            min: min === null ? 0 : +min,
            val: val === null ? undefined : +val,
        })

        const output = range.nextSibling as HTMLInputElement
        output && sr.connectOutput(output)
    })

//--- svg animation ---
const svgEl = document.querySelector<HTMLOrSVGImageElement>(".cloud .banner--right > svg")

if (svgEl) {
    setInterval(() => {
        svgEl.dispatchEvent(new CustomEvent("fired"))
    }, 200)

    const dataLights = svgEl.querySelectorAll<SVGPathElement>("path[data-light]")

    svgEl.addEventListener("fired", () => {
        dataLights &&
            dataLights.length &&
            dataLights.forEach(e => {
                const dice = Math.random()
                if (dice > 0.5) {
                    e.dataset.light === "cloud-canvas"
                        ? (e.style.fill = "#D4ECFF")
                        : (e.style.fill = "#fff")
                } else {
                    e.dataset.light === "cloud-canvas"
                        ? (e.style.fill = "#295C9A")
                        : (e.style.fill = "#000")
                    e.dataset.light === "tube" && (e.style.fill = "#B2D3EA")
                }
            })
    })
}

const gpuSelectTrigger = document.querySelector<HTMLInputElement>(
    ".cloud__gpu input[type='checkbox']",
)
const selectGPUEl = document.querySelector<HTMLInputElement>(".cloud__gpu .cloud__select-gpu")
gpuSelectTrigger &&
    gpuSelectTrigger.addEventListener("change", () => {
        selectGPUEl &&
            (gpuSelectTrigger.checked
                ? selectGPUEl.setAttribute("open", "open")
                : selectGPUEl.removeAttribute("open"))
    })
