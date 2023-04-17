import "./sass/style.sass";
import "@splidejs/splide/css";
import cursor from "./ts/components/cursor/cursor";
import clickToLogo from "./ts/components/main-header/clickToLogo";
import hideBurgerThenMenu from "./ts/components/burger/hideBurgerThenMenu";
import burger from "./ts/components/burger";
import closeMenu from "./ts/components/main-header/closeMenu";
import toggleMainMenu from "./ts/components/main-header/toggleMainMenu";
import toggleMobileMenu from "./ts/mobile/toggleMobileMenu";
import applyMaskText from "./ts/applyMaskText";
import { controlSearchPopup } from "./ts/components/popup/changeSearchPopup";
import splidesPages from "./ts/components/sliders/splides -pages";
import SingleRange from "./ts/components/range/singleRange/SingleRange";
import tabs from "./ts/components/tabs/tabs";

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
