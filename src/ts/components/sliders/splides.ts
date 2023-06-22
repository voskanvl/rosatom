import Splide, { SlideComponent } from "@splidejs/splide"
import { MSplides } from "./initSlides"
import store from "../../store"
import debounce from "../../helpers/debounce"

export default function splides() {
    const splidesInstance = new MSplides()
    const innopolis = document.querySelector("#innopolis")
    const team = document.querySelector("#team")
    const partners = document.querySelector("#partners")

    innopolis &&
        splidesInstance.add("#innopolis", {
            type: "loop",
            arrows: false,
            pagination: false,
            perMove: 1,
            perPage: 3,
            padding: "10px",
            focus: "center",
        })
    const innopolisSplideInstance = splidesInstance.instances["#innopolis"]
    const innopolisSplideControlLeft = document.querySelector<HTMLButtonElement>(
        ".innopolis__control-button--left",
    )
    const innopolisSplideControlRight = document.querySelector<HTMLButtonElement>(
        ".innopolis__control-button--right",
    )
    !!innopolisSplideControlLeft &&
        (innopolisSplideControlLeft.onclick = debounce(() => innopolisSplideInstance.go("<"), 200))
    !!innopolisSplideControlRight &&
        (innopolisSplideControlRight.onclick = debounce(() => innopolisSplideInstance.go(">"), 200))

    !!innopolisSplideInstance &&
        innopolisSplideInstance.on("active", (slide: SlideComponent) => {
            if (slide.isClone) return
            const img = slide.slide.querySelector<HTMLImageElement>("img")
            if (!img) throw Error("there isn't img in innopolis slider")
            // const dataInnopolis = innopolisData.innopolisSlider.find(
            //     ({ id }) => id === +img.dataset.id!,
            // );
            const dataInnopolis = img.dataset?.description
            if (!dataInnopolis) return
            const textElement = document.querySelector<HTMLElement>(".innopolis__text")
            textElement!.textContent = dataInnopolis
        })

    const breakpoints = {
        550: {
            perPage: 1,
        },
        800: {
            perPage: 2,
        },
        1600: {
            perPage: 3,
        },
    }

    team &&
        splidesInstance.add("#team", {
            type: "loop",
            arrows: false,
            pagination: false,
            perMove: 1,
            perPage: 4,
            padding: "10px",
            breakpoints,
        })
    const teamSplideInstance = splidesInstance.instances["#team"]
    const teamSplideControlLeft = document.querySelector<HTMLButtonElement>(
        ".team__control-button--left",
    )
    const teamSplideControlRight = document.querySelector<HTMLButtonElement>(
        ".team__control-button--right",
    )
    !!teamSplideControlLeft && (teamSplideControlLeft.onclick = () => teamSplideInstance.go("<"))
    !!teamSplideControlRight && (teamSplideControlRight.onclick = () => teamSplideInstance.go(">"))

    //--- bug with intiation slider, perPage is always = 2 on min resolution
    store.store.subscribe(({ activeScreenNumber }) => {
        if (activeScreenNumber === 6) {
            teamSplideInstance.destroy()
            setTimeout(() => teamSplideInstance.mount())
        }
    })

    partners &&
        splidesInstance.add("#partners", {
            type: "loop",
            arrows: false,
            pagination: false,
            perMove: 1,
            perPage: 4,
            padding: "10px",
            // focus: "center",
        })
    const partnersSplideInstance = splidesInstance.instances["#partners"]
    const partnersSplideControlLeft = document.querySelector<HTMLButtonElement>(
        ".partners__control-button--left",
    )
    const partnersSplideControlRight = document.querySelector<HTMLButtonElement>(
        ".partners__control-button--right",
    )
    !!partnersSplideControlLeft &&
        (partnersSplideControlLeft.onclick = () => partnersSplideInstance.go("<"))
    !!partnersSplideControlRight &&
        (partnersSplideControlRight.onclick = () => partnersSplideInstance.go(">"))

    const setPerPage = (instance: Splide) => () => {
        const mm = matchMedia("(max-width: 1500px)").matches
        const mm1 = matchMedia("(max-width: 1120px)").matches
        const mm2 = matchMedia("(max-width: 370px)").matches
        instance.options.perPage = mm ? (mm1 ? (mm2 ? 1 : 2) : 3) : 4 //:)))
        instance.refresh()
    }

    !!teamSplideInstance && setPerPage(teamSplideInstance)() //initial
    !!innopolisSplideInstance && setPerPage(innopolisSplideInstance)() //initial

    window.addEventListener("resize", () => {
        // setPerPage(teamSplideInstance)();
        setPerPage(innopolisSplideInstance)()
        innopolisSplideInstance.root.style.setProperty("--x", `50%`)
    })
}

//TODO: исправить увеличение центрального слайда в мобильной версии (sass)
