import { OptionSlide, SlideClass } from "./classSlides";
export default function splidesPages() {
    const talking: OptionSlide = {
        elementName: "#talking",
        elementElement: document.querySelector("#talking") as HTMLElement,
        options: {
            type: "loop",
            arrows: false,
            perPage: 3,
            pagination: false,
            focus: "center",
            breakpoints: {
                768: {
                    perPage: 2,
                    focus: undefined,
                },
                500: {
                    perPage: 1,
                    focus: undefined,
                },
            },
        },
        controls: {
            left: document.querySelector<HTMLElement>(
                ".about__slider-control.about__slider-control--left",
            )!,
            right: document.querySelector<HTMLElement>(
                ".about__slider-control.about__slider-control--right",
            )!,
        },
    };

    return new SlideClass({
        talking,
    });
}
