import { MSplides } from "./initSlides";

export default function splides() {
    const splidesInstance = new MSplides();
    const innopolis = document.querySelector("#innopolis");
    const team = document.querySelector("#team");
    const partners = document.querySelector("#partners");

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

    team &&
        splidesInstance.add("#team", {
            type: "loop",
            arrows: false,
            pagination: false,
            perMove: 1,
            perPage: 4,
            padding: "10px",
            // focus: "center",
        });
    const teamSplideInstance = splidesInstance.instances["#team"];
    const teamSplideControlLeft = document.querySelector<HTMLButtonElement>(
        ".team__control-button--left",
    );
    const teamSplideControlRight = document.querySelector<HTMLButtonElement>(
        ".team__control-button--right",
    );
    !!teamSplideControlLeft && (teamSplideControlLeft.onclick = () => teamSplideInstance.go("<"));
    !!teamSplideControlRight && (teamSplideControlRight.onclick = () => teamSplideInstance.go(">"));

    partners &&
        splidesInstance.add("#partners", {
            type: "loop",
            arrows: false,
            pagination: false,
            perMove: 1,
            perPage: 4,
            padding: "10px",
            // focus: "center",
        });
    const partnersSplideInstance = splidesInstance.instances["#partners"];
    const partnersSplideControlLeft = document.querySelector<HTMLButtonElement>(
        ".partners__control-button--left",
    );
    const partnersSplideControlRight = document.querySelector<HTMLButtonElement>(
        ".partners__control-button--right",
    );
    !!partnersSplideControlLeft &&
        (partnersSplideControlLeft.onclick = () => partnersSplideInstance.go("<"));
    !!partnersSplideControlRight &&
        (partnersSplideControlRight.onclick = () => partnersSplideInstance.go(">"));

    const setPerPage = () => {
        const mm = matchMedia("(max-width: 700px)").matches;
        const mm1 = matchMedia("(max-width: 510px)").matches;
        const mm2 = matchMedia("(max-width: 370px)").matches;
        teamSplideInstance.options.perPage = mm ? (mm1 ? (mm2 ? 1 : 2) : 3) : 4; //:)))
        teamSplideInstance.refresh();
    };
    setPerPage(); //initial
    window.addEventListener("resize", setPerPage);
}
