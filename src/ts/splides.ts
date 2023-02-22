import Splide, { SlideComponent } from "@splidejs/splide";
import { MSplides } from "./initSlides";
import innopolisData from "./innopolisData.json";

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

    innopolisSplideInstance.on("active", (slide: SlideComponent) => {
        if (slide.isClone) return;
        const img = slide.slide.querySelector<HTMLImageElement>("img");
        if (!img) throw Error("there isn't img in innopolis slider");
        const dataInnopolis = innopolisData.innopolisSlider.find(
            ({ id }) => id === +img.dataset.id!,
        );
        if (!dataInnopolis) return;
        const textElement = document.querySelector<HTMLElement>(".innopolis__text");
        textElement!.textContent = dataInnopolis?.name;
    });

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

    const setPerPage = (instance: Splide) => () => {
        const mm = matchMedia("(max-width: 1500px)").matches;
        const mm1 = matchMedia("(max-width: 1120px)").matches;
        const mm2 = matchMedia("(max-width: 370px)").matches;
        instance.options.perPage = mm ? (mm1 ? (mm2 ? 1 : 2) : 3) : 4; //:)))
        instance.refresh();
    };

    setPerPage(teamSplideInstance)(); //initial
    setPerPage(innopolisSplideInstance)(); //initial

    window.addEventListener("resize", () => {
        setPerPage(teamSplideInstance)();
        setPerPage(innopolisSplideInstance)();
        console.log("🚀 ~ innopolisSplideInstance.root", innopolisSplideInstance.root);
        innopolisSplideInstance.root.style.setProperty("--x", `50%`);
    });
}
