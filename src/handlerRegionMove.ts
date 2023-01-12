const connectTargetAndMonitor = (
    target: HTMLElement,
    monitor: HTMLElement,
    connector: HTMLElement,
) => {
    if (!connector) throw Error("отсутствует .geonet__connector");

    const targetRect = target.getBoundingClientRect();
    const targetHalfHeight = targetRect.y + targetRect.height / 2;

    const monitorRect = monitor.getBoundingClientRect();
    const monitorRight = monitorRect.x + monitorRect.width;
    const monitorHalfHeight = monitorRect.y + monitorRect.height / 2;

    connector.style.top =
        monitorHalfHeight >= targetHalfHeight ? targetHalfHeight + "px" : monitorHalfHeight + "px";

    connector.style.left = monitorRight + "px";
    connector.style.width = targetRect.x - monitorRight + "px";
    connector.style.height = Math.abs(monitorHalfHeight - targetHalfHeight) + "px";
};

const handleMouseEnter = (monitor: HTMLElement, connector: HTMLElement) => (event: MouseEvent) => {
    monitor.style.display = "block";
    connector.style.transform = "scaleX(1)";
    const regionMonitor = monitor.childNodes[0] as HTMLElement;
    const listMonitor = monitor.childNodes[1] as HTMLElement;

    const target = event.target as HTMLElement;
    const { region } = target.parentElement!.dataset;
    const { color } = target.dataset;
    !!regionMonitor && !!region && (regionMonitor.innerText = region);
    !!regionMonitor && !!color && (regionMonitor.style.backgroundColor = color);

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

    connectTargetAndMonitor(target.parentElement!, monitor, connector);
};

const handleMouseLeave = (monitor: HTMLElement, connector: HTMLElement) => () => {
    connector.style.transform = "scaleX(0)";
    monitor.style.display = "none";
    const regionMonitor = monitor.childNodes[0] as HTMLElement;
    const listMonitor = monitor.childNodes[1] as HTMLElement;

    regionMonitor.innerText = "";
    listMonitor.innerText = "";
};

export default function handlerRegionMove() {
    const popup = document.querySelector<HTMLElement>(".geo-popup");
    const connector = document.querySelector<HTMLElement>(".geonet__connector");
    if (!popup) throw Error("отсутствует .geo-popup");
    if (!connector) throw Error("отсутствует .geonet__connector");

    const regionsElementList = document.querySelectorAll<HTMLElement>(".geonet__grouped");
    regionsElementList.forEach(e => {
        e.addEventListener("mouseenter", handleMouseEnter(popup, connector));
        e.addEventListener("mouseleave", handleMouseLeave(popup, connector));
    });
}
