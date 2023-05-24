import splidesPages from "./ts/components/sliders/splides-photogallary"

const splides = splidesPages()

const close = document.querySelector(".photogallary__close")
const imagesInSlider = [...document.querySelectorAll<HTMLImageElement>(".splide img[src]")]

close &&
    close.addEventListener("click", () => {
        close.parentElement?.removeAttribute("open")
    })
const tilesContainer = document.querySelector<HTMLElement>(".services__tiles")
tilesContainer &&
    tilesContainer.addEventListener("click", ({ target }: Event) => {
        const targetEl = target as HTMLElement
        const closest = targetEl.closest<HTMLElement>(".photogallary__tile")
        const img = closest?.querySelector("img")

        const imageInSlider = img && imagesInSlider.find(({ src }) => src === img.src)
        const index =
            imageInSlider &&
            imageInSlider.parentElement &&
            parseInt(imageInSlider.parentElement.ariaLabel || "")

        close && close.parentElement?.setAttribute("open", "open")
        index && splides.splidesInstance?.instances["#photogallary"].go(+index - 1)
    })
