import feedback from "./ts/components/modal/feedback"
import modal from "./ts/components/modal/modal"

const button2 = document.querySelector<HTMLButtonElement>(".rent-config__button")
button2 && button2.addEventListener("click", () => modal(feedback()))

const buttons = document.querySelectorAll<HTMLButtonElement>(".equipment__item-button")
buttons &&
    buttons.length &&
    buttons.forEach(button => button.addEventListener("click", () => modal(feedback())))

//--- svg animation ---
const svgEl = document.querySelector<HTMLOrSVGImageElement>(
    ".additional-services .banner--right > svg",
)

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
