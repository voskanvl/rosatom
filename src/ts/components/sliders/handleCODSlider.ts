import { MSplides } from "./initSlides"
import xsvg from "../../../../assets/svg/x.svg"
import arrow from "../../../../assets/svg/arrow-right.svg"

const createControls = () => {
    const controls = document.createElement("div")
    controls.classList.add("controls")

    const left = document.createElement("div")
    const imgLeft = document.createElement("img")
    left.classList.add("left")
    imgLeft.src = arrow
    left.append(imgLeft)

    const right = document.createElement("div")
    const imgRight = document.createElement("img")
    right.classList.add("right")
    imgRight.src = arrow
    right.append(imgRight)

    controls.append(left, right)

    return { controls, left, right }
}
const createModal = () => {
    const modal = document.createElement("div")

    modal.style.cssText = `
    position: fixed;
    z-index: 1000;
    display: grid;
    place-items: center;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100dvh;
    background: #000a;
    backdrop-filter: blur(4px);
    `

    modal.id = "outer-modal"

    let closeSignal: ((val: unknown) => void) | null = null

    const doClose = new Promise(resolve => {
        closeSignal = resolve
    })

    const close = document.createElement("div")
    close.addEventListener("click", () => closeSignal && closeSignal("close"))

    const x = document.createElement("img")
    x.src = xsvg
    close.append(x)

    close.style.cssText = `
        position: absolute;
        top: 0.5em;
        right: 0.5em;
        color: red;
        font-size: 50px;
        z-index: 2;
    `

    modal.append(close)

    return { modal, doClose }
}

const createSlider = (root: HTMLElement, id: string): HTMLElement => {
    const slider = document.createElement("div")

    const srcs = [...root.querySelectorAll<HTMLImageElement>("img")]
        .map(el => ({ id: el.dataset.id, src: el.src }))
        .filter(el => el.id !== undefined)
        .reduce((acc, el) => {
            if (!acc[el.id || "unknown"]) acc[el.id || "unknown"] = []
            acc[el.id || "unknown"].push(el.src)
            return acc
        }, {} as Record<string, string[]>)

    const insertingImages = Object.entries(srcs)
        .map(
            ([key, src]) =>
                `<li class="splide__slide"><img class="innopolis__img innopolis__img--fullscreen" data-id="${key}" src="${src[0]}"></li>`,
        )
        .join("")
    slider.innerHTML = `
        <section class="splide" id="${id}">
            <div class="splide__track">
                <ul class="splide__list">
                    ${insertingImages}
                </ul>
            </div>
        </section>
    `

    return slider
}

type ControlsType = {
    left: HTMLElement
    right: HTMLElement
}

const iniSlider = (slider: HTMLElement, id: string, constrols?: ControlsType) => {
    let splidesInstance: MSplides = new MSplides()
    slider &&
        splidesInstance.add("#" + id, {
            type: "loop",
            arrows: false,
            pagination: false,
            perMove: 1,
            perPage: 3,
            padding: "10px",
            focus: "center",
            breakpoints: {
                1440: {
                    perPage: 2,
                },
                1024: {
                    perPage: 1,
                    focus: undefined,
                    padding: 10,
                },
            },
        })
    const sliderSplideInstance = splidesInstance.instances["#" + id]
    constrols && (constrols.left.onclick = () => sliderSplideInstance.go("-1"))
    constrols && (constrols.right.onclick = () => sliderSplideInstance.go("+1"))

    return {
        sliderSplideInstance,
        deleteSlider: () => ((splidesInstance as MSplides | null) = null),
    }
}

export default function handleCODSlider() {
    const innopolisSlider = document.querySelector<HTMLElement>("#innopolis")
    if (!innopolisSlider) return

    const ID = "modal-innopolis"
    innopolisSlider.addEventListener("click", async ({ target }: Event) => {
        const targetElement = (target as HTMLElement).closest(".splide__slide")
        if (!targetElement) return

        const ariaLabel = targetElement.getAttribute("aria-label")
        ariaLabel &&
            console.log(
                "%cMyProject%cline:76%cariaLabel",
                "color:#fff;background:#ee6f57;padding:3px;border-radius:2px",
                "color:#fff;background:#1f3c88;padding:3px;border-radius:2px",
                "color:#fff;background:rgb(23, 44, 60);padding:3px;border-radius:2px",
                parseInt(ariaLabel),
            )

        const { modal, doClose } = createModal()
        const slider = createSlider(innopolisSlider, ID)

        document.body.append(modal)
        const { controls, left, right } = createControls()
        modal.append(slider, controls)

        const { sliderSplideInstance, deleteSlider } = iniSlider(slider, ID, { left, right })

        setTimeout(() => {
            ariaLabel && sliderSplideInstance && sliderSplideInstance.go(parseInt(ariaLabel) - 1)
        }, 100)

        try {
            await doClose
            deleteSlider()
            modal.remove()
        } catch (error) {
            console.log(error)
        }
    })
}
