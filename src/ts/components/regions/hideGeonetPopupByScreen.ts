import store from "../../store"

export default function hideGeonetPopupByScreen() {
    const popup = document.querySelector<HTMLElement>(".geonet__popup")
    store.store.subscribe(({ activeScreenNumber }) => {
        activeScreenNumber !== 4
            ? popup && (popup.style.opacity = "0")
            : popup && (popup.style.opacity = "1")
    })
}
