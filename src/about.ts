import "./sass/style.sass";
import "@splidejs/splide/css";

import initHeader from "./ts/initHeader";
import splidesPages from "./ts/components/sliders/splides -pages";
import SingleRange from "./ts/components/range/singleRange/SingleRange";
import tabs from "./ts/components/tabs/tabs";

initHeader();
splidesPages();

const ranges = document.querySelectorAll<HTMLElement>(".range__input");
ranges &&
    ranges.forEach(range => {
        const max = range.getAttribute("max"),
            min = range.getAttribute("min"),
            val = range.getAttribute("val");

        const sr = new SingleRange(range, {
            max: max === null ? 0 : +max,
            min: min === null ? 0 : +min,
            val: val === null ? undefined : +val,
        });

        const output = range.nextSibling as HTMLInputElement;
        output && sr.connectOutput(output);
    });

tabs();
