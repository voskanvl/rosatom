import { scrollScreens } from "./scrollScreens";
import toggleLogoImage from "./toggleLogoImage";
import { controlSearchPopup } from "./changeSearchPopup";
// import changeMainHeaderByScroll from "./changeMainHeaderByScroll";
import screenSwitcher from "./screenSwitcher";
import advantagesHovers from "./advantagesHovers";
import allocateRegionIcons from "./allocateRegionIcons";

import newsFeedHandler from "./news-feed-handeler";
import splides from "./splides";
import handlerRegionMove from "./handlerRegionMove";
// import hideScreenSwitcherByMenu from "./hideScreenSwitcherByMenu";
import touchedScroll from "./touchedScroll";

import applyMaskText from "./applyMaskText";
import applyIMaskToField from "./applyIMaskToField";
import toggleMobileMenu from "./toggleMobileMenu";
import toggleMainMenu from "./toggleMainMenu";
import changeScreenSwitcherByScroll from "./changeScreenSwitcherByScroll";
import changePointerByScreen from "./changePointerByScreen";
import clickToLogo from "./clickToLogo";
import closeMenu from "./closeMenu";
import changeMainHeader from "./changeMainHeader";
import burger from "./burger";
import changeCursorByMenu from "./changeCursorByMenu";
import hideBurgerThenMenu from "./burger/hideBurgerThenMenu";

export default function init() {
    document.body.style.cursor = "url('../../assets/cursor/black.png') 19 19, pointer";

    changePointerByScreen();
    changeCursorByMenu();
    clickToLogo();

    burger.open();
    burger.change();
    burger.close();
    hideBurgerThenMenu();

    toggleLogoImage();
    scrollScreens();
    // hideScreenSwitcherByMenu();

    closeMenu("ul.list");
    closeMenu(".burger__list");

    toggleMainMenu();
    toggleMobileMenu();

    touchedScroll();

    applyMaskText();

    controlSearchPopup({
        close: ".search-popup__close",
        open: ".options__search",
    });

    // changeMainHeaderByScroll();
    changeMainHeader();

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
