import Store from "../../store"

export default function toggleMainMenu() {
    const mainHeader = document.querySelector<HTMLElement>(".main-header")
    const mainMenu = document.querySelector<HTMLElement>(".menu")
    const triggers = [
        ...document.querySelectorAll<HTMLElement>(".menu > .menu__item > *:last-child[data-menu]"),
    ]

    const matching: { trigger: HTMLElement; menu: HTMLElement }[] = triggers.map(e => ({
        trigger: e,
        menu: e.previousElementSibling as HTMLElement,
    }))

    matching.forEach(({ menu, trigger }) => {
        trigger.addEventListener("mouseenter", () => {
            if ("maxTouchPoints" in navigator && navigator.maxTouchPoints > 0) return
            matching.forEach(
                ({ menu: menuOthers }) =>
                    menu !== menuOthers && menuOthers.classList.remove("show"),
            )
            menu.classList.toggle("show")

            triggers.forEach(e => e.classList.remove("active"))
            trigger.classList.add("active")

            if (matching.some(({ menu }) => menu.classList.contains("show"))) {
                Store.menuStore.getState().open()
                mainMenu && mainMenu.classList.add("show")
                mainHeader && mainHeader.classList.add("show")
            } else {
                Store.menuStore.getState().close()
                mainMenu && mainMenu.classList.remove("show")
                mainHeader && mainHeader.classList.remove("show")
                mainHeader && (mainHeader.style.cursor = "inherit")
            }
        })
    })
}
