setTimeout(() => {
    document.body.focus()
    document.scrollingElement && document.scrollingElement.scrollTo({ behavior: "smooth", top: 0 })
}, 600)
