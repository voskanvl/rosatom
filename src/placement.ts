import SingleRange from "./ts/components/range/singleRange/SingleRange"
import tabs from "./ts/components/tabs/tabs"

tabs()

const ranges = document.querySelectorAll<HTMLElement>(".range__input")
ranges &&
    ranges.forEach(range => {
        const max = range.getAttribute("max"),
            min = range.getAttribute("min"),
            val = range.getAttribute("val"),
            step = range.getAttribute("step"),
            unit = range.getAttribute("unit"),
            array = range.getAttribute("array")

        const sr = new SingleRange(range, {
            max: max === null ? 0 : +max,
            min: min === null ? 0 : +min,
            val: val === null ? undefined : val,
            step: step === null ? undefined : +step,
            scale: { is: true, unit: unit || "" },
            array: array ? array : undefined,
        })

        const output = range.nextSibling as HTMLInputElement
        output && sr.connectOutput(output)
    })

//--- svg animation ---
const svgEl = document.querySelector<HTMLOrSVGImageElement>(".placement .banner--right > svg")

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

//D4ECFF
