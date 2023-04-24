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
        //         "#s1 .docs-convex__slider-control.docs-convex__slider-control--left",
        //     )!,
        //     right: document.querySelector<HTMLElement>(
        //         "#s1 .docs-convex__slider-control.docs-convex__slider-control--right",
        //     )!,
        // },
    };

    return new SlideClass({
        talking,
    });
}
