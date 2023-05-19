import feedback from "./ts/components/modal/feedback"
import modal from "./ts/components/modal/modal"

const button2 = document.querySelector<HTMLButtonElement>(".rent-config__button")
button2 && button2.addEventListener("click", () => modal(feedback()))

const TRANSITION = 200

const svg = document.querySelector<SVGElement>(".telecom .banner--right > svg")

const stopsFirst = svg?.querySelectorAll<SVGElement>("linearGradient > stop:first-child ")
const stopsLast = svg?.querySelectorAll<SVGElement>("linearGradient > stop:last-child ")

const changeColor = (e: SVGElement, startColor: string, lastColor: string, time: number) => {
    let isStarted = false
    setInterval(() => {
        isStarted = !isStarted

        isStarted
            ? e.setAttribute("stop-color", startColor)
            : e.setAttribute("stop-color", lastColor)
    }, time)
    // let offset = 0;
    // const STEP = {
    //     up: 0.2,
    //     down: -0.2,
    // };
    // let step = STEP.up;
    // setInterval(() => {
    //     offset += step;
    //     e.setAttribute("offset", offset.toString());
    //     offset >= 1 && (step = STEP.down);
    //     offset <= 0 && (step = STEP.up);
    // }, time);
}

stopsFirst &&
    stopsFirst.forEach(e => {
        e.style.transition = TRANSITION + "ms"

        changeColor(e, "#85f7e9", "#259789", TRANSITION)
    })
stopsLast &&
    stopsLast.forEach(e => {
        e.style.transition = TRANSITION + "ms"

        changeColor(e, "#259789", "#85f7e9", TRANSITION)
    })

const toChange = svg?.querySelectorAll<SVGElement>("[data-tochange]")
setInterval(() => {
    svg?.dispatchEvent(new CustomEvent("fired"))
}, TRANSITION)

svg?.addEventListener("fired", () => {
    toChange &&
        toChange.length &&
        toChange.forEach(e => {
            const dice = Math.random()
            if (e.dataset.tochange === "image") {
                const randomColor = ((Math.random() * 0xfff) | 0).toString(16).padStart(2, "0")
                e.style.fill = "#" + randomColor
                return
            }
            if (e.tagName === "g") {
                // const randomColor = ((Math.random() * 0xfff) | 0).toString(16).padStart(2, "0");
                // e.style.fill = "#" + randomColor;
                dice > 0.5 ? (e.style.opacity = "1") : (e.style.opacity = "0")
                return
            }
            dice > 0.5 ? (e.style.display = "") : (e.style.display = "none")
        })
})
