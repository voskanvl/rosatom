import { scrollScreens } from "./scrollScreens";
import toggleLogoImage from "./components/main-header/toggleLogoImage";
import { controlSearchPopup } from "./components/popup/changeSearchPopup";
// import changeMainHeaderByScroll from "./changeMainHeaderByScroll";
import screenSwitcher from "./components/screen-swithcer/screenSwitcher";
import advantagesHovers from "./advantagesHovers";
import allocateRegionIcons from "./components/regions/allocateRegionIcons";

import newsFeedHandler from "./news-feed-handeler";
import splides from "./components/sliders/splides";
import handlerRegionMove from "./components/regions/handlerRegionMove";
import hideScreenSwitcherByMenu from "./components/screen-swithcer/hideScreenSwitcherByMenu";
import touchedScroll from "./mobile/touchedScroll";

import applyMaskText from "./applyMaskText";
import applyIMaskToField from "./applyIMaskToField";
import toggleMobileMenu from "./mobile/toggleMobileMenu";
import toggleMainMenu from "./components/main-header/toggleMainMenu";
import changeScreenSwitcherByScroll from "./components/screen-swithcer/changeScreenSwitcherByScroll";
// import changePointerByScreen from "./changePointerByScreen";
import clickToLogo from "./components/main-header/clickToLogo";
import closeMenu from "./components/main-header/closeMenu";
import changeMainHeader from "./components/main-header/changeMainHeader";
import burger from "./components/burger";
// import changeCursorByMenu from "./changeCursorByMenu";
import hideBurgerThenMenu from "./components/burger/hideBurgerThenMenu";
import cursor from "./components/cursor/cursor";
import MobileDetect from "mobile-detect";
import randomizePulsIcons from "./components/regions/randomizePulsIcons";
import store from "./store";
import changeSearchPopupByScreensAndMenu from "./components/popup/changeSearchPopupByScreensAndMenu";

export default function init() {
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
    changeSearchPopupByScreensAndMenu();

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
            !!map && (map.style.scale = "1.7 1.7");
        } else {
            !!map && (map.style.scale = "");
        }
    });
    const md = new MobileDetect(window.navigator.userAgent);
    if (md.mobile()) {
        const cursorRound = document.querySelector<HTMLElement>(".cursor__round");
        !!cursorRound && (cursorRound.style.display = "none");
    }

    randomizePulsIcons();
}
