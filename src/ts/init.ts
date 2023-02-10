import { scrollScreens } from "./scrollScreens";
import toggleLogoImage from "./toggleLogoImage";
import { controlSearchPopup } from "./changeSearchPopup";
import changeMainHeaderByScroll from "./changeMainHeaderByScroll";
import screenSwitcher from "./screenSwitcher";
import advantagesHovers from "./advantagesHovers";
import allocateRegionIcons from "./allocateRegionIcons";

import newsFeedHandler from "./news-feed-handeler";
import splides from "./splides";
import handlerRegionMove from "./handlerRegionMove";
import openBurger from "./openBurger";
import hideScreenSwitcherByMenu from "./hideScreenSwitcherByMenu";
import touchedScroll from "./touchedScroll";

import applyMaskText from "./applyMaskText";
import applyIMaskToField from "./applyIMaskToField";
import toggleMobileMenu from "./toggleMobileMenu";
import toggleMainMenu from "./toggleMainMenu";
import changeScreenSwitcherByScroll from "./changeScreenSwitcherByScroll";

export default function init() {
    openBurger();
    toggleLogoImage();
    scrollScreens();
    hideScreenSwitcherByMenu();

    toggleMainMenu();
    toggleMobileMenu();

    touchedScroll();

    applyMaskText();

    controlSearchPopup({
        close: ".search-popup__close",
        open: ".options__search",
    });

    changeMainHeaderByScroll();
    changeScreenSwitcherByScroll();
    screenSwitcher();
    advantagesHovers();

    splides();

    newsFeedHandler();
    handlerRegionMove();

    applyIMaskToField();

    allocateRegionIcons();
    window.addEventListener("resize", () => allocateRegionIcons());
}
