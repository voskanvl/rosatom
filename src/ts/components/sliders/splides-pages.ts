import { OptionSlide, SlideClass } from "./classSlides"
export default function splidesPages() {
    const talking: OptionSlide = {
        elementName: "#talking",
        elementElement: document.querySelector("#talking") as HTMLElement,
        options: {
            type: "loop",
            arrows: false,
            perPage: 1,
            pagination: false,
            focus: "center",
        },
        controls: {
            left: document.querySelector<HTMLElement>(
                ".about__slider-control.about__slider-control--left",
            )!,
            right: document.querySelector<HTMLElement>(
                ".about__slider-control.about__slider-control--right",
            )!,
        },
    }

    return new SlideClass({
        talking,
    })
}
