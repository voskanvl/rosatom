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

openBurger();
toggleLogoImage();
scrollScreens();

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


//TODO: переключатель экранов нужно блокирует нажатие меню на 1-ой странице. Изменить его z-index

/*TODO: сделать автоматический пересчет style="top:  " всех скринов в зависимости от текущего. 
Если текущий, например 6, то 1-5 style="top: 100vh", а 7-9 style="top: -100vh"
*/
/*TODO: уменьшать z-index у остальных скринов, или увеличивать z-index у текущего
(возникает проблема перекрытия скринов при произвольном перключении)
*/