import { changeMainHeader } from "./changeMainHeaderByScroll";
import { changingElements } from "./changingElementByScroll";

export default function advantagesHovers() {
    const cards = document.querySelectorAll<HTMLElement>(".service-card__container--advantages");
    const mainHeader = document.querySelector<HTMLElement>(".main-header");
    const title = document.querySelector<HTMLElement>(
        ".screen[data-number='3'] .advantages-center__title",
    );

    const mouseHandler =
        (act: "add" | "remove") =>
        ({ target }: MouseEvent) => {
            let num;
            const serviceCenterCard = (target as HTMLElement).closest<HTMLElement>(
                ".advantages-center__card",
            );

            !!serviceCenterCard && (num = serviceCenterCard.dataset.number);

            const img = document.querySelector<HTMLElement>(
                `.advantages-center > img[data-number="${num}"]`,
            );

            if (!mainHeader) throw Error("отсутствует .main-header");
            if (!img) throw Error(`отсутствует .advantages-center > img[data-number="${num}"]`);
            if (!title) throw Error("отсутствует .advantages-center__title");

            changeMainHeader(mainHeader, changingElements)(act);

            if (act === "add") {
                img.setAttribute("show", "show");
                title.style.setProperty("--background", "#fff");
                cards.forEach(e => {
                    if (e === target) {
                        e.style.boxShadow = "none";
                        e.removeAttribute("glass");
                    } else {
                        e.setAttribute("glass", "glass");
                    }
                });
            } else {
                img.removeAttribute("show");
                // title.style.setProperty("--background", "#303031");
                cards.forEach(e => {
                    e.removeAttribute("glass");
                    e.style.boxShadow = "";
                });
            }
        };
    !!cards &&
        cards.length &&
        cards.forEach(el => {
            el.addEventListener("mouseenter", mouseHandler("add"));
            el.addEventListener("mouseleave", mouseHandler("remove"));
        });
}
