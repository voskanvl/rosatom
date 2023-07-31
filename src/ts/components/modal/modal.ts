type ModalOptionType = {
    blockScroll: boolean
}

export default function modal(
    el: HTMLElement,
    { blockScroll }: ModalOptionType = { blockScroll: true },
) {
    if (blockScroll) {
        // document.body.style.height = "100vh"
        // document.body.style.overflowY = "hidden"
    }
    const modalEl = document.createElement("div")
    const closeEl = document.createElement("div")

    modalEl.classList.add("modal")
    closeEl.classList.add("modal__close")

    el.append(closeEl)
    modalEl.append(el)
    document.body.append(modalEl)

    closeEl.addEventListener("click", () => {
        // document.body.style.height = ""
        // document.body.style.overflowY = ""
        modalEl.remove()
    })

    return modalEl
}
