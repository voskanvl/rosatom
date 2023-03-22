export default function changeSearchPopup(state: "open" | "close") {
    const element = document.querySelector<HTMLElement>(".search-popup");
    if (!element) throw Error("отсутствует search popup");

    function transitionendHandler({ currentTarget }: Event) {
        currentTarget && ((currentTarget as HTMLElement).style.display = "none");
        currentTarget && currentTarget.removeEventListener("transitionend", transitionendHandler);
    }

    switch (state) {
        case "open":
            element.style.display = "flex";
            setTimeout(() => element.setAttribute("open", "open"), 0);
            break;
        case "close":
            element.removeAttribute("open");
            element.addEventListener("transitionend", transitionendHandler);
            break;
        default:
            break;
    }
}

interface controlSearchPopupProps {
    close?: string | HTMLElement | null;
    open?: string | HTMLElement | null;
}

export function controlSearchPopup({ close, open }: controlSearchPopupProps) {
    if (open) {
        const openControl = typeof open === "string" ? document.querySelector(open) : open;
        openControl &&
            openControl.addEventListener("click", () => {
                changeSearchPopup("open");
            });
    }
    if (close) {
        const closeControl = typeof close === "string" ? document.querySelector(close) : close;
        closeControl &&
            closeControl.addEventListener("click", () => {
                changeSearchPopup("close");
            });
    }
}
