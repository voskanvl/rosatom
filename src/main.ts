import moveMaskText from "./moveMaskText";
import "./sass/style.sass";
import { scrollScreens } from "./scrollScreens";
import toggleLogoImage from "./toggleLogoImage";
import { controlSearchPopup } from "./changeSearchPopup";
import changeMainHeaderByScroll from "./changeMainHeaderByScroll";
import screenSwitcher from "./screenSwitcher";
import advantagesHovers from "./advantagesHovers";
import allocateRegionIcons from "./allocateRegionIcons";

import "@splidejs/splide/css";
import newsFeedHandler from "./news-feed-handeler";
import splides from "./splides";
import handlerRegionMove from "./handlerRegionMove";
import openBurger from "./openBurger";
import hideScreenSwitcherByMenu from "./hideScreenSwitcherByMenu";
// import touchedScroll from "./touchedScroll";
import IMask from "imask";

openBurger();
toggleLogoImage();
scrollScreens();
hideScreenSwitcherByMenu();
// touchedScroll();

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

splides();

newsFeedHandler();
allocateRegionIcons();
handlerRegionMove();

const partnersForm = document.querySelector<HTMLFormElement>(".partners-form");
if (!partnersForm) throw Error("отсутствует .partners-form");
const partnersFormPhone = partnersForm.querySelector<HTMLInputElement>("input[name='phone']");
if (!partnersFormPhone) throw Error("отсутствует .partners-form  input[name='phone']");
console.log("🚀 ~ partnersFormPhone", partnersFormPhone);
const partnersFormPhoneMask = IMask(partnersFormPhone, {
    mask: "+{7}(000)000-00-00",
    lazy: false,
});
console.log("🚀 ~ partnersFormPhoneMask", partnersFormPhoneMask);
