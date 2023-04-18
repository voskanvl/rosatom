import applyMaskText from "./applyMaskText";
import burger from "./components/burger";
import hideBurgerThenMenu from "./components/burger/hideBurgerThenMenu";
import cursor from "./components/cursor/cursor";
import clickToLogo from "./components/main-header/clickToLogo";
import closeMenu from "./components/main-header/closeMenu";
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
    closeMenu("ul.list");
    closeMenu(".burger__list");

    toggleMainMenu();
    toggleMobileMenu();
    applyMaskText();

    controlSearchPopup({
        close: ".search-popup__close",
        open: ".options__search",
    });
}
