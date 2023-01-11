import moveMaskText from "./moveMaskText";
import "./sass/style.sass";
import { scrollScreens } from "./scrollScreens";
import toggleLogoImage from "./toggleLogoImage";
import { controlSearchPopup } from "./changeSearchPopup";
import changeMainHeaderByScroll from "./changeMainHeaderByScroll";
import screenSwitcher from "./screenSwitcher";
import advantagesHovers from "./advantagesHovers";

import "@splidejs/splide/css";
import { MSplides } from "./initSlides";
import newsFeedHandler from "./news-feed-handeler";

toggleLogoImage();
scrollScreens();

const moveMaskTextCreator = (element: HTMLElement) => {
    if (!element) throw Error("нет " + element);
    moveMaskText(element);
};

const textMaskedElements = document.querySelectorAll<HTMLElement>(".text-masked-element");
if (textMaskedElements && textMaskedElements.length > 0) {
    textMaskedElements.forEach(e => moveMaskTextCreator(e));
}

controlSearchPopup({
    close: ".search-popup__close",
    open: ".options__search",
});

changeMainHeaderByScroll();
screenSwitcher();
advantagesHovers();

const splidesInstance = new MSplides();
const innopolis = document.querySelector("#innopolis");

innopolis &&
    splidesInstance.add("#innopolis", {
        type: "loop",
        arrows: false,
        pagination: false,
        perMove: 1,
        perPage: 3,
        padding: "10px",
        focus: "center",
    });

newsFeedHandler();
