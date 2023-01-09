import moveMaskText from "./moveMaskText";
import "./sass/style.sass";
import { scrollScreens } from "./scrollScreens";
import toggleLogoImage from "./toggleLogoImage";
import { controlSearchPopup } from "./changeSearchPopup";
import changeMainHeaderByScroll from "./changeMainHeaderByScroll";

// import '@splidejs/splide/css';

toggleLogoImage();
scrollScreens();

const moveMaskTextCreator = (element: string) => {
    const el = document.querySelector<HTMLElement>(element);
    if (!el) throw Error("нет " + element);
    moveMaskText(el);
};

moveMaskTextCreator(".main-block__title");
moveMaskTextCreator(".data-center__title");

controlSearchPopup({
    close: ".search-popup__close",
    open: ".options__search",
});

changeMainHeaderByScroll();
