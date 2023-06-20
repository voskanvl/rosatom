const orientRightSideConnector = (
    leftTarget: number,
    rightMonitor: number,
    connector: HTMLElement,
) => {
    const MINUS_GAP = 16

    const rightSideConnector = connector.querySelector<HTMLElement>(".geonet__connector-right")

    if (rightMonitor - leftTarget > 0) {
        rightSideConnector && (rightSideConnector.style.translate = "-100% 0")
        const computedWidth = Math.abs(rightMonitor - leftTarget) - MINUS_GAP
        const computedWidthPx = computedWidth > 0 ? computedWidth + "px" : "1px"
        rightSideConnector && (rightSideConnector.style.width = computedWidthPx)
    }

    if (rightMonitor - leftTarget <= 0) {
        rightSideConnector && (rightSideConnector.style.translate = "0 0")
        rightSideConnector && (rightSideConnector.style.width = "")
    }
}

const connectTargetAndMonitor = (
    target: HTMLElement,
    monitor: HTMLElement,
    connector: HTMLElement,
) => {
    if (!connector) throw Error("отсутствует .geonet__connector")

    const targetRect = target.getBoundingClientRect()
    const targetHalfHeight = targetRect.y + targetRect.height / 2

    const monitorRect = monitor.getBoundingClientRect()
    const monitorRight = monitorRect.right
    const monitorHalfHeight = monitorRect.y + monitorRect.height / 2

    orientRightSideConnector(targetRect.left, monitorRect.right, connector)

    connector.style.top =
        monitorHalfHeight >= targetHalfHeight ? targetHalfHeight + "px" : monitorHalfHeight + "px"

    connector.style.left = monitorRight + "px"
    const computedWidth = targetRect.x - monitorRight
    connector.style.width = computedWidth > 0 ? computedWidth + "px" : "0"
    connector.style.height = Math.abs(monitorHalfHeight - targetHalfHeight) + "px"

    monitorHalfHeight < targetHalfHeight
        ? (connector.style.transform = "rotateX(180deg)")
        : (connector.style.transform = "rotateX(0deg)")
}

const handleMouseEnter = (monitor: HTMLElement, connector: HTMLElement) => (event: MouseEvent) => {
    monitor.style.display = "block"
    // monitor.style.opacity = "1";
    connector.style.transform = "scaleX(1)"
    const regionMonitor = monitor.children[0] as HTMLElement
    const listMonitor = monitor.children[1] as HTMLElement

    regionMonitor.innerText = ""
    listMonitor.innerText = ""

    const target = event.currentTarget as HTMLElement
    const { region } = target.parentElement!.dataset
    const { color } = target.dataset
    !!regionMonitor && !!region && (regionMonitor.innerText = region)
    !!regionMonitor && !!color && (regionMonitor.style.backgroundColor = color)

    const tmp = target.querySelector<HTMLElement>(".geonet__topopup")
    const clone = tmp?.cloneNode(true)
    ;(clone as HTMLElement).style.visibility = "visible"
    clone && listMonitor.append(clone)

    connectTargetAndMonitor(target.parentElement!, monitor, connector)
}

const handleMouseLeave = (monitor: HTMLElement, connector: HTMLElement) => () => {
    connector.style.transform = "scaleX(0)"
    monitor.style.display = "none"
    // monitor.style.opacity = "0";
    const regionMonitor = monitor.children[0] as HTMLElement
    const listMonitor = monitor.children[1] as HTMLElement

    regionMonitor.innerText = ""
    listMonitor.innerText = ""
}

export default function handlerRegionMove() {
    const regionMap = document.querySelector<HTMLElement>(".geonet")!

    const popup = document.querySelector<HTMLElement>(".geo-popup")
    const connector = document.querySelector<HTMLElement>(".geonet__connector")
    if (!popup) {
        console.warn("отсутствует .geo-popup")
        return
    }
    if (!connector) {
        console.warn("отсутствует .geonet__connector")
        return
    }

    const regionsElementList = document.querySelectorAll<HTMLElement>(".geonet__grouped")
    regionsElementList.forEach(e => {
        e.addEventListener("mouseenter", handleMouseEnter(popup, connector))
        e.addEventListener("mouseleave", handleMouseLeave(popup, connector))
        e.addEventListener("click", handleMouseEnter(popup, connector))
    })

    regionMap.addEventListener("click", (event: Event) => {
        event.stopPropagation()
        const target = event.target as HTMLElement
        if (!target.closest(".geonet__grouped")) handleMouseLeave(popup, connector)()
    })
}
