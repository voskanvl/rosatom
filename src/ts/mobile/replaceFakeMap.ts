import allocateRegionIcons from "../components/regions/allocateRegionIcons"
import store from "../store"

export default function replaceFakeMap() {
    const regions = document.querySelector<HTMLElement>("#regions")
    const img = document.querySelector<HTMLImageElement>("#regions > img")
    const svg = document.querySelector<HTMLImageElement>("#regions > svg")
    const iconLayer = document.querySelector<HTMLElement>(".geonet__icon-layer")

    regions &&
        regions &&
        regions.addEventListener("click", () => {
            img && (img.style.display = "none")
            svg && (svg.style.display = "block")
            iconLayer && (iconLayer.style.display = "block")
            allocateRegionIcons()
        })

    store.store.subscribe(() => {
        const a = matchMedia("(max-width: 768px)").matches
        if (!a) return
        img && (img.style.display = "block")
        svg && (svg.style.display = "none")
        iconLayer && (iconLayer.style.display = "none")
    })
}
