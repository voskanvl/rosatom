import "./sass/style.sass";
import "@splidejs/splide/css";

import initHeader from "./ts/initHeader";

import splidesPages from "./ts/components/sliders/splides -pages";
import SingleRange from "./ts/components/range/singleRange/SingleRange";
import tabs from "./ts/components/tabs/tabs";
import MultyRange from "./ts/components/multiRange/MultiRange";
import Counter from "./components/number-input/number-input";

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

const vendors = document.querySelector<HTMLInputElement>("input[name='vendor']");
const coretypes = [...document.querySelectorAll<HTMLOptionElement>("#coretype li")];

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

/*
    --- SELECT ---
*/
const selects = document.querySelectorAll<HTMLElement>(".select");
selects &&
    selects.forEach(select =>
        select.addEventListener("click", (event: Event) => {
            const target = event.target as HTMLElement;
            if (target.nodeName !== "LI") return;
            const title = select.querySelector<HTMLElement>(".select__title");
            const dataInput = select.querySelector<HTMLInputElement>("input[type='text']");
            title && dataInput && (dataInput.value = title.innerText = target.innerText);
            dataInput && dataInput.dispatchEvent(new Event("change"));
        }),
    );

/*
        --- OPTIONS ---
        */

const optionsElement = document.querySelector<HTMLElement>(".rent-tools__options");
const optionsButton = document.querySelector<HTMLButtonElement>(".rent-tools__filter");
const closeoptionsElement = document.querySelector<HTMLButtonElement>(".rent-options__close");

optionsElement &&
    optionsButton &&
    optionsButton.addEventListener("click", () => {
        if (getComputedStyle(optionsElement).position !== "absolute") return;
        optionsElement.style.zIndex = "2";
    });
optionsElement &&
    closeoptionsElement &&
    closeoptionsElement.addEventListener("click", () => {
        if (getComputedStyle(optionsElement).position !== "absolute") return;
        optionsElement.style.zIndex = "-1";
    });

/*
    --- config ---     
*/
const numInputs = document.querySelectorAll<HTMLElement>(".number-input");
numInputs &&
    numInputs.length &&
    numInputs.forEach(num => {
        const inp = num.querySelector<HTMLInputElement>("input");
        const plus = num.querySelector<HTMLElement>(".number-input__button--plus");
        const minus = num.querySelector<HTMLElement>(".number-input__button--minus");
        inp && plus && minus && new Counter(inp, { plus, minus });
    });