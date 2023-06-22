export default function allocateRegionIcons() {
    const container = document.querySelector<HTMLElement>("#regions > svg")
    if (!container) {
        console.warn("there isn't #regions > svg")
        return
    }
    const containerRect = container.getBoundingClientRect()

    const iconGroups = [...document.querySelectorAll<HTMLElement>(".geonet__region")]

    const mapEl = document.querySelector<HTMLElement>("#regions")
    if (!mapEl) throw Error("отсутвтует #map")
    const { x: mapLeft } = mapEl.getBoundingClientRect()

    const pathElements = [...document.querySelectorAll<SVGElement>("#regions > svg path")].filter(
        e => e.getAttribute("regionid"),
    )

    iconGroups.forEach(group => {
        const groupRegionId = group.dataset.regionid
        const path = pathElements.find(path => path.getAttribute("regionid") === groupRegionId)
        if (!path) throw Error("отсутствует path, соотвествующий regionid=" + groupRegionId)
        let { x, y, width } = path.getBoundingClientRect()

        y -= containerRect.y

        group.style.top = y + "px"
        group.style.left = x + width / 2 - mapLeft + "px"
    })
}
