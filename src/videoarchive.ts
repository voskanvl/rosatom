import splidesPages from "./ts/components/sliders/splides-photogallary"

const splides = splidesPages()

const close = document.querySelector(".photogallary__close")
const videosInSlider = [...document.querySelectorAll<HTMLImageElement>(".splide video[src]")]

close &&
    close.addEventListener("click", () => {
        close.parentElement?.removeAttribute("open")
    })
const tilesContainer = document.querySelector<HTMLElement>(".services__tiles")
tilesContainer &&
    tilesContainer.addEventListener("click", ({ target }: Event) => {
        const targetEl = target as HTMLElement
        const closest = targetEl.closest<HTMLElement>(".photogallary__tile")
        const video = closest?.querySelector("video")

        const videoInSlider = video && videosInSlider.find(({ src }) => src === video.src)
        const index =
            videoInSlider &&
            videoInSlider.parentElement &&
            parseInt(videoInSlider.parentElement.ariaLabel || "")

        close && close.parentElement?.setAttribute("open", "open")
        index && splides.splidesInstance?.instances["#photogallary"].go(+index - 1)
    })
