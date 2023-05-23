import { OptionSlide, SlideClass } from "./classSlides"
export default function splidesPages() {
    const ic: OptionSlide = {
        elementName: "#innopolis",
        elementElement: document.querySelector("#innopolis") as HTMLElement,
        options: {
            type: "loop",
            arrows: false,
            perPage: 3,
            perMove: 1,
            pagination: false,
            focus: "center",
        },
        controls: {
            left: document.querySelector<HTMLElement>(".innopolis__control-button--left")!,
            right: document.querySelector<HTMLElement>(".innopolis__control-button--right")!,
        },
    }
    const video: OptionSlide = {
        elementName: "#ic-video",
        elementElement: document.querySelector("#ic-video") as HTMLElement,
        options: {
            type: "loop",
            arrows: false,
            perPage: 3,
            perMove: 1,
            pagination: false,
            focus: "center",
            breakpoints: {
                1440: {
                    perPage: 2,
                    focus: undefined,
                },
                1024: {
                    perPage: 1,
                },
            },
        },
        controls: {
            left: document.querySelector<HTMLElement>(".ic-video__control--left")!,
            right: document.querySelector<HTMLElement>(".ic-video__control--right")!,
        },
    }

    return new SlideClass({
        ic,
        video,
    })
}
