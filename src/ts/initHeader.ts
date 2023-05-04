import applyMaskText from "./applyMaskText";
import burger from "./components/burger";
import hideBurgerThenMenu from "./components/burger/hideBurgerThenMenu";
import cursor from "./components/cursor/cursor";
import blockScroll from "./components/main-header/blockScroll";
import clickToLogo from "./components/main-header/clickToLogo";
import closeMenu from "./components/main-header/closeMenu";
import switchSearhOnMenu from "./components/main-header/switchSearhOnMenu";
import toggleLogoImage from "./components/main-header/toggleLogoImage";
import toggleMainMenu from "./components/main-header/toggleMainMenu";
import { controlSearchPopup } from "./components/popup/changeSearchPopup";
import toggleMobileMenu from "./mobile/toggleMobileMenu";

export default function initHeader() {
    cursor();
    clickToLogo();
    burger.open();
    burger.change();
    burger.close();
    hideBurgerThenMenu();
    blockScroll();
    closeMenu("ul.list");
    closeMenu(".burger__list");

    toggleMainMenu();
    toggleMobileMenu();
    toggleLogoImage();
    applyMaskText();

    controlSearchPopup({
        close: ".search-popup__close",
        open: ".options__search",
    });

    switchSearhOnMenu();
}
