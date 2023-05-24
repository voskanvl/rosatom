import { OptionSlide, SlideClass } from "./classSlides"
export default function splidesPages() {
    const photogallary: OptionSlide = {
        elementName: "#photogallary",
        elementElement: document.querySelector("#photogallary") as HTMLElement,
        options: {
            type: "loop",
            arrows: true,
            perPage: 1,
            perMove: 1,
            pagination: false,
        },
    }

    return new SlideClass({
        photogallary,
    })
}
