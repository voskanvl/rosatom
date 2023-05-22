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
