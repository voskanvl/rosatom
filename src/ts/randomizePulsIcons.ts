export default function randomizePulsIcons() {
    const icons = document.querySelectorAll<HTMLElement>(".geonet__icon");
    if (!icons || !icons.length) throw Error("there isn't .geonet__icon");

    const randomize = (start: number, end: number) => (start + Math.random() * (end - start)) | 0;

    icons.forEach(e => {
        e.style.setProperty("--phase", randomize(0.5, 2) + "s");
        e.style.setProperty("--period", randomize(2, 5) + "s");
    });
}

//TODO: скрывать screenSwitcher при открывании меню
