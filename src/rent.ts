import splidesPages from "./ts/components/sliders/splides-pages"
import SingleRange from "./ts/components/range/singleRange/SingleRange"
import tabs from "./ts/components/tabs/tabs"
import MultyRange from "./ts/components/multiRange/MultiRange"
import Counter from "./components/number-input/number-input"
import debounce from "./ts/helpers/debounce"
import feedback from "./ts/components/modal/feedback"
import modal from "./ts/components/modal/modal"

const button2 = document.querySelector<HTMLButtonElement>(".rent-config__button")
button2 && button2.addEventListener("click", () => modal(feedback()))

const buttons = document.querySelectorAll<HTMLButtonElement>(".server-item__button")
buttons &&
    buttons.length &&
    buttons.forEach(button => button.addEventListener("click", () => modal(feedback())))

splidesPages()

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

tabs()

const costpermonthEls = document.querySelectorAll<HTMLDivElement>(".rent-options__miltirange")
costpermonthEls &&
    costpermonthEls.length &&
    costpermonthEls.forEach(root => {
        const inputMin = root.previousElementSibling?.firstElementChild as HTMLInputElement
        const inputMax = root.previousElementSibling?.lastElementChild as HTMLInputElement

        root &&
            new MultyRange(root, { containerClass: "rent-container" }).connectInputs(
                inputMin,
                inputMax,
            )
    })

const vendors = document.querySelector<HTMLInputElement>("input[name='vendor']")
const coretypes = [...document.querySelectorAll<HTMLOptionElement>("#coretype li")]

vendors &&
    vendors.addEventListener("change", (event: Event) => {
        const { value } = event.currentTarget as HTMLSelectElement
        coretypes &&
            coretypes.forEach(el => {
                const vendorInOption = el.dataset.vendor
                if (value !== vendorInOption) el.style.display = "none"
                else el.style.display = ""
            })
    })

/*
    --- SELECT ---
*/
const selects = document.querySelectorAll<HTMLElement>(".select")
selects &&
    selects.forEach(select => {
        select.addEventListener("click", (event: Event) => {
            const target = event.target as HTMLElement
            if (target.nodeName !== "LI") return
            const title = select.querySelector<HTMLElement>(".select__title")
            const dataInput = select.querySelector<HTMLInputElement>("input[type='text']")
            if (dataInput && dataInput.value === target.innerText) return
            title && dataInput && (dataInput.value = title.innerText = target.innerText)
            dataInput && dataInput.dispatchEvent(new Event("change", { bubbles: true }))
            dataInput &&
                dataInput.dispatchEvent(
                    new CustomEvent("changeprice", {
                        bubbles: true,
                        detail: { value: target.dataset.price },
                    }),
                )
        })

        select.addEventListener("mouseleave", () => {
            const dataInput = select.querySelector<HTMLInputElement>("input[name='open']")
            dataInput && (dataInput.checked = false)
            select.style.zIndex = "2"
            setTimeout(() => (select.style.zIndex = ""), 600)
        })
    })

/*
        --- OPTIONS BLOCK in RENT PAGE---
        */

const optionsElement = document.querySelector<HTMLElement>(".rent-tools__sticky")
const optionsButton = document.querySelector<HTMLButtonElement>(".rent-tools__filter")
const closeoptionsElement = document.querySelector<HTMLButtonElement>(".rent-options__close")

optionsElement &&
    optionsButton &&
    optionsButton.addEventListener("click", () => {
        if (getComputedStyle(optionsElement).position !== "absolute") return
        optionsElement.style.zIndex = "2"
    })
optionsElement &&
    closeoptionsElement &&
    closeoptionsElement.addEventListener("click", () => {
        if (getComputedStyle(optionsElement).position !== "absolute") return
        optionsElement.style.zIndex = "-1"

        const media = matchMedia("(min-width: 1025px)").matches
        media ? (optionsElement.style.zIndex = "0") : (optionsElement.style.zIndex = "-1")

        window.addEventListener(
            "resize",
            debounce(() => {
                const media = matchMedia("(min-width: 1025px)").matches
                media ? (optionsElement.style.zIndex = "0") : (optionsElement.style.zIndex = "-1")
            }, 200),
        )
    })

/*
    --- config ---     
*/
const numInputs = document.querySelectorAll<HTMLElement>(".number-input")
numInputs &&
    numInputs.length &&
    numInputs.forEach(num => {
        const inp = num.querySelector<HTMLInputElement>("input")
        const plus = num.querySelector<HTMLElement>(".number-input__button--plus")
        const minus = num.querySelector<HTMLElement>(".number-input__button--minus")
        const counter = inp && plus && minus && new Counter(inp, { plus, minus })

        const output = num.parentElement?.nextElementSibling as HTMLElement
        counter &&
            output &&
            counter.subscribe((val: number) => {
                const price = +(output.dataset.price || 0)
                output.innerText = price * val + ""
                num.parentElement && (num.parentElement.dataset.value = val + "")
            })
    })

const confSelects = document.querySelectorAll<HTMLElement>(".rent-config__select")
confSelects &&
    confSelects.forEach(el => {
        el.addEventListener("changeprice", (event: Event) => {
            const { value: price } = (event as CustomEvent).detail
            const counter = el.nextElementSibling as HTMLInputElement
            const output = counter.nextElementSibling as HTMLElement
            output &&
                counter &&
                counter.dataset &&
                counter.dataset.value &&
                (output.innerText = +counter.dataset.value * +price + "")
            output.dataset.price = price
        })
    })

//--- toggle tab by url
const tabControls = document.querySelectorAll<HTMLInputElement>(
    ".tabs__control > input[type='radio']",
)
const switchTabs = () =>
    location.search === "?config"
        ? (tabControls[1] as HTMLElement).click()
        : (tabControls[0] as HTMLElement).click()

switchTabs()

window.addEventListener("popstate", () => {
    switchTabs()
})
//---
//--- svg animation ---
const svgEl = document.querySelector<HTMLOrSVGImageElement>(".rent .banner--right > svg")

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
