import "./sass/style.sass";
import "@splidejs/splide/css";

import initHeader from "./ts/initHeader";

import splidesPages from "./ts/components/sliders/splides -pages";
import SingleRange from "./ts/components/range/singleRange/SingleRange";
import tabs from "./ts/components/tabs/tabs";
import MultyRange from "./ts/components/multiRange/MultiRange";

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

const costpermonthEls = document.querySelectorAll<HTMLDivElement>(".rent-options__miltirange");
costpermonthEls &&
    costpermonthEls.length &&
    costpermonthEls.forEach(root => {
        const inputMin = root.previousElementSibling?.firstElementChild as HTMLInputElement;
        const inputMax = root.previousElementSibling?.lastElementChild as HTMLInputElement;

        root &&
            new MultyRange(root, { containerClass: "rent-container" }).connectInputs(
                inputMin,
                inputMax,
            );
    });

const vendors = document.querySelector("select[name='vendor']");
const coretypes = [
    ...document.querySelectorAll<HTMLOptionElement>("select[name='coretype'] > option"),
];

vendors &&
    vendors.addEventListener("change", (event: Event) => {
        const { value } = event.currentTarget as HTMLSelectElement;
        coretypes &&
            coretypes.forEach(el => {
                const vendorInOption = el.dataset.vendor;
                if (value !== vendorInOption) el.style.display = "none";
                else el.style.display = "";
            });
    });
