import { OptionSlide, SlideClass } from "./ts/components/sliders/classSlides";
const docsSert: OptionSlide = {
    elementName: "#docs-sert",
    elementElement: document.querySelector("#docs-sert") as HTMLElement,
    options: {
        type: "loop",
        arrows: false,
        perPage: 1,
        pagination: false,
        focus: "center",
    },
    controls: {
        left: document.querySelector<HTMLElement>(
            "#s1 .docs-convex__slider-control.docs-convex__slider-control--left",
        )!,
        right: document.querySelector<HTMLElement>(
            "#s1 .docs-convex__slider-control.docs-convex__slider-control--right",
        )!,
    },
};

new SlideClass({
    docsSert,
});
