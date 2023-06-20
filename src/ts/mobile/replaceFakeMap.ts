import allocateRegionIcons from "../components/regions/allocateRegionIcons"
import store from "../store"

export default function replaceFakeMap() {
    const fakeMap = document.querySelector<HTMLElement>("#fake-map")
    const regions = document.querySelector<HTMLElement>("#regions")
    const iconLayer = document.querySelector<HTMLElement>(".geonet__icon-layer")

    regions &&
        fakeMap &&
        fakeMap.addEventListener("click", () => {
            fakeMap.style.display = "none"
            regions.style.display = "block"
            iconLayer && (iconLayer.style.display = "block")
            allocateRegionIcons()
        })

    store.store.subscribe(() => {
        const a = matchMedia("(max-width: 768px)").matches
        if (!a) return
        fakeMap && (fakeMap.style.display = "block")
        regions && (regions.style.display = "none")
        iconLayer && (iconLayer.style.display = "none")
    })
}
