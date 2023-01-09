import moveMaskText from "./moveMaskText";
import "./sass/style.sass";
import { scrollScreens } from "./scrollScreens";
import toggleLogoImage from "./toggleLogoImage";
import { controlSearchPopup } from "./changeSearchPopup";
import changeMainHeaderByScroll from "./changeMainHeaderByScroll";

// import '@splidejs/splide/css';

toggleLogoImage();
scrollScreens();
const mainTitle = document.querySelector<HTMLElement>(".main-block__title");
if (!mainTitle) throw Error("нет .main-block__title");
moveMaskText(mainTitle);

controlSearchPopup({
    close: ".search-popup__close",
    open: ".options__search",
});

changeMainHeaderByScroll();
