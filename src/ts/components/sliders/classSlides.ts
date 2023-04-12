import Splide, { Options } from "@splidejs/splide";
import { MSplides } from "./initSlides";

export interface OptionSlide {
    elementName: `#${string}`;
    elementElement: HTMLElement | null;
    options: Options;
    controls?: {
        left: HTMLElement | null;
        right: HTMLElement | null;
    };
}

export class SlideClass {
    splidesInstance: MSplides | null = null; //TODO: maybe static
    splides: Record<string, Splide> = {};

    constructor(public data: Record<string, OptionSlide>) {
        if (!this.splidesInstance) this.splidesInstance = new MSplides();
        this.splides = Object.entries(data)
            .filter(([_, val]) => !!val.elementElement)
            .reduce((acc, [key, val]) => {
                const splide = this.splidesInstance!.add(val.elementName, val.options);
                if (!val.controls) return { ...acc, [key]: splide };
                !!val.controls.left &&
                    val.controls.left.addEventListener("click", () => {
                        splide.go("-1");
                    });
                !!val.controls.right &&
                    val.controls.right.addEventListener("click", () => {
                        splide.go("+1");
                    });
                return { ...acc, [key]: splide };
            }, {});
    }
}
