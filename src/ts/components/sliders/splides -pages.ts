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
        },
        // controls: {
        //     left: document.querySelector<HTMLElement>(
        //         ".catalog__slider .slider-controls__button.slider-controls__button--left",
        //     )!,
        //     right: document.querySelector<HTMLElement>(
        //         ".catalog__slider .slider-controls__button.slider-controls__button--right",
        //     )!,
        // },
    };

    return new SlideClass({
        talking,
    });
}
