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
import hideScreenSwitcherByMenu from "./hideScreenSwitcherByMenu";
import touchedScroll from "./touchedScroll";

import applyMaskText from "./applyMaskText";
import applyIMaskToField from "./applyIMaskToField";
import toggleMobileMenu from "./toggleMobileMenu";
import toggleMainMenu from "./toggleMainMenu";
import changeScreenSwitcherByScroll from "./changeScreenSwitcherByScroll";
// import changePointerByScreen from "./changePointerByScreen";
import clickToLogo from "./clickToLogo";
import closeMenu from "./closeMenu";
import changeMainHeader from "./changeMainHeader";
import burger from "./burger";
// import changeCursorByMenu from "./changeCursorByMenu";
import hideBurgerThenMenu from "./burger/hideBurgerThenMenu";
import cursor from "./cursor";
import MobileDetect from "mobile-detect";
import randomizePulsIcons from "./randomizePulsIcons";
import store from "./store";

export default function init() {
    document.body.style.cursor = "url('../../assets/cursor/mini-black.svg'), pointer";
    // document.body.style.cursor = "none";

    cursor();
    // changePointerByScreen();
    // changeCursorByMenu();
    clickToLogo();

    burger.open();
    burger.change();
    burger.close();
    hideBurgerThenMenu();

    toggleLogoImage();
    scrollScreens();
    hideScreenSwitcherByMenu();

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
    store.store.subscribe(({ activeScreenNumber }) => {
        const { matches } = matchMedia("(max-width: 768px)");
        const map = document.querySelector<HTMLElement>(".geonet__map");
        if (activeScreenNumber === 4 && matches) {
            map!.style.scale = "1.7 1.7";
        } else {
            map!.style.scale = "";
        }
    });
    const md = new MobileDetect(window.navigator.userAgent);
    if (md.mobile()) {
        const cursorRound = document.querySelector<HTMLElement>(".cursor__round");
        !!cursorRound && (cursorRound.style.display = "none");
    }

    randomizePulsIcons();
}
