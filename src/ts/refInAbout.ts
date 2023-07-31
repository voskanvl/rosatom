import store from "./store"

function switchByMenu(menuSelector: string, closeSelector: string) {
    const menu = document.querySelector<HTMLElement>(menuSelector)
    const aEls = menu && menu.querySelectorAll<HTMLAnchorElement>("a")
    menu &&
        menu.addEventListener("click", (event: Event) => {
            event.preventDefault()
            event.stopPropagation()
            const close = document.querySelector<HTMLElement>(closeSelector)
            const target = event.target as HTMLElement
            const currentIndex = aEls && [...aEls].findIndex(e => e === target)
            if (currentIndex === undefined || currentIndex === null) return
            store.store.getState().setScreen(+currentIndex)
            close && close?.click()
        })
}

function clearAboutHrefs(selector: string) {
    const aEls = document.querySelectorAll<HTMLAnchorElement>(selector)
    aEls && aEls.length && aEls.forEach(a => a.setAttribute("href", "#"))
}

export default function refInAbout() {
    const url = new URL(location.href)
    const q = url.searchParams.get("q")

    if (q !== null) {
        store.store.getState().setScreen(+q)
    }
    const menuReduced = document.querySelector<HTMLElement>(".menu-reduced")
    const selectorMenuReducedSwitches =
        (menuReduced && menuReduced.dataset.selector) ||
        ".menu-reduced .accordion__container > li:first-child .accordion__item-list .accordion__item-list"
    switchByMenu(
        ".menu > .menu__item:first-child > .list .list--details  .list--details",
        ".menu > .menu__item:first-child > .list .list--details ",
    ) //main-menu
    switchByMenu(selectorMenuReducedSwitches, ".menu-reduced__caption") //burger (menu-reduced)

    clearAboutHrefs(".menu > .menu__item:first-child > .list .list--details  .list--details a") //selector of about menu in main menu
    clearAboutHrefs(".menu-reduced  .accordion > .accordion__container > li:first-child a") //selector of about menu in main menu
}
