import { MSplides } from "./initSlides";

export default function splides() {
    const splidesInstance = new MSplides();
    const innopolis = document.querySelector("#innopolis");

    innopolis &&
        splidesInstance.add("#innopolis", {
            type: "loop",
            arrows: false,
            pagination: false,
            perMove: 1,
            perPage: 3,
            padding: "10px",
            focus: "center",
        });
    const innopolisSplideInstance = splidesInstance.instances["#innopolis"];
    const innopolisSplideControlLeft = document.querySelector<HTMLButtonElement>(
        ".innopolis__control-button--left",
    );
    const innopolisSplideControlRight = document.querySelector<HTMLButtonElement>(
        ".innopolis__control-button--right",
    );
    !!innopolisSplideControlLeft &&
        (innopolisSplideControlLeft.onclick = () => innopolisSplideInstance.go("<"));
    !!innopolisSplideControlRight &&
        (innopolisSplideControlRight.onclick = () => innopolisSplideInstance.go(">"));
}
