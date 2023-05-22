const aside = document.querySelector<HTMLElement>(".kb__aside")

aside &&
    aside.addEventListener("click", (event: Event) => {
        const targetEl = event.target as HTMLElement

        const catalogListName = targetEl.closest<HTMLElement>(".kb__catalog-list-name")

        if (!catalogListName) return

        const catalogList = targetEl.closest<HTMLElement>(".kb__catalog-list")

        const open = catalogList && catalogList.getAttribute("open")
        !!open
            ? catalogList && catalogList.removeAttribute("open")
            : catalogList && catalogList.setAttribute("open", "open")
    })

//--- mobile aside ---
const mobileAsideTrigger = document.querySelector<HTMLElement>(".kb__open-mobile-aside")
mobileAsideTrigger &&
    mobileAsideTrigger.addEventListener("click", () => {
        const aside = mobileAsideTrigger.nextElementSibling as HTMLElement | null
        if (!aside) return
        const open = aside.getAttribute("open")
        if (open) {
            aside.removeAttribute("open")
            mobileAsideTrigger.removeAttribute("open")
        } else {
            aside.setAttribute("open", "open")
            mobileAsideTrigger.setAttribute("open", "open")
        }
    })

document.addEventListener("click", (event: Event) => {
    const targetEl = event.target as HTMLElement

    const aside = document.querySelector<HTMLElement>(".kb__aside")
    if (!aside) return

    const inOfAside = targetEl.closest<HTMLElement>(".kb__aside")
    const inOfMobileAsideTrigger = targetEl.closest<HTMLElement>(".kb__open-mobile-aside")

    const open = aside.getAttribute("open")

    if (open && !inOfAside && !inOfMobileAsideTrigger) {
        aside && aside.removeAttribute("open")
        mobileAsideTrigger && mobileAsideTrigger.removeAttribute("open")
    }
})
