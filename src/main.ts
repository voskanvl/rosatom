import moveMaskText from "./moveMaskText";
import "./sass/style.sass";
import { scrollScreens } from "./scrollScreens";
import toggleLogoImage from "./toggleLogoImage";

// import '@splidejs/splide/css';

toggleLogoImage();
scrollScreens();
const mainTitle = document.querySelector<HTMLElement>(".main-block__title");
if (!mainTitle) throw Error("нет .main-block__title");
moveMaskText(mainTitle);
