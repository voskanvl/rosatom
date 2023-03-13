export default function allocateRegionIcons() {
    const container = document.querySelector<HTMLElement>("#regions > svg")!;
    const containerRect = container.getBoundingClientRect();

    const iconGroups = [...document.querySelectorAll<HTMLElement>(".geonet__region")];
    const mapEl = document.querySelector<HTMLElement>("#regions");

    const pathElements = [...document.querySelectorAll<SVGElement>("#regions > svg path")].filter(
        e => e.getAttribute("regionid"),
    );

    if (!mapEl) throw Error("отсутвтует #map");
    const { x: mapLeft } = mapEl.getBoundingClientRect();

    iconGroups.forEach(group => {
        const groupRegionId = group.dataset.regionid;
        const path = pathElements.find(path => path.getAttribute("regionid") === groupRegionId);
        if (!path) throw Error("отсутствует path, соотвествующий regionid=" + groupRegionId);
        let { x, y } = path.getBoundingClientRect();

        // group.style.top = y + height / 2 + "px";
        // group.style.left = x + width / 2 + "px";
        // x = x + containerRect.x;
        y -= containerRect.y;
        // x -= containerRect.x;

        group.style.top = y + "px";
        group.style.left = x - mapLeft + "px";
    });
}
