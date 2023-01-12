const handleMouseEnter = (monitor: HTMLElement) => (event: MouseEvent) => {
    monitor.style.display = "block";
    const regionMonitor = monitor.childNodes[0] as HTMLElement;
    const listMonitor = monitor.childNodes[1] as HTMLElement;

    const target = event.target as HTMLElement;
    const { region } = target.dataset;
    !!regionMonitor && !!region && (regionMonitor.innerText = region);

    const dcList = target.querySelectorAll<HTMLImageElement>("img");
    dcList.forEach(img => {
        const dcname = document.createElement("div");
        dcname.classList.add("geo-popup__dcname");
        dcname.innerText = img.dataset.name || "";
        listMonitor.append(dcname);

        const dcparam = document.createElement("div");
        dcparam.classList.add("geo-popup__dcparam");
        dcparam.innerText = img.dataset.param || "";
        listMonitor.append(dcparam);
    });
};
const handleMouseLeave = (monitor: HTMLElement) => (event: MouseEvent) => {
    monitor.style.display = "none";
    const regionMonitor = monitor.childNodes[0] as HTMLElement;
    const listMonitor = monitor.childNodes[1] as HTMLElement;

    regionMonitor.innerText = "";
    listMonitor.innerText = "";
};
export default function handlerRegionMove() {
    const popup = document.querySelector<HTMLElement>(".geo-popup");
    if (!popup) throw Error("отсутствует .geo-popup");

    const regionsElementList = document.querySelectorAll<HTMLElement>(".geonet__region");
    regionsElementList.forEach(e => {
        e.addEventListener("mouseenter", handleMouseEnter(popup));
        e.addEventListener("mouseleave", handleMouseLeave(popup));
    });
}
