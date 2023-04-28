import "./sass/style.sass";
import "@splidejs/splide/css";

import initHeader from "./ts/initHeader";
import { setBlackCursor } from "./ts/components/cursor/cursor";
import IMask from "imask";

initHeader();
setBlackCursor();

const phones = document.querySelectorAll<HTMLInputElement>("input[name='phone']");
phones &&
    phones.length &&
    phones.forEach(phone => {
        IMask(phone, {
            mask: "+{7}(000)000-00-00",
            lazy: false,
        });
    });

const mainHeader = document.querySelector<HTMLElement>(".main-header");
mainHeader && (mainHeader.style.position = "absolute");
mainHeader && mainHeader.classList.remove("main-header--white");
