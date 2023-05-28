import splidesPages from "./ts/components/sliders/splides-pages"
// import SingleRange from "./ts/components/range/singleRange/SingleRange";
import modal from "./ts/components/modal/modal"
import video from "./ts/components/modal/video"

//--- CHECK ABOUT PAGE
const isAboutPage = !!document.querySelector("section.about")
if (isAboutPage) {
    const mainHeader = document.querySelector(".main-header")
    mainHeader && mainHeader.classList.add("main-header--white")
}

splidesPages()

// const ranges = document.querySelectorAll<HTMLElement>(".range__input");
// ranges &&
//     ranges.forEach(range => {
//         const max = range.getAttribute("max"),
//             min = range.getAttribute("min"),
//             val = range.getAttribute("val");

//         const sr = new SingleRange(range, {
//             max: max === null ? 0 : +max,
//             min: min === null ? 0 : +min,
//             val: val === null ? undefined : +val,
//         });

//         const output = range.nextSibling as HTMLInputElement;
//         output && sr.connectOutput(output);
//     });

//--- START VIDEO ---

const videoSwitcher = document.querySelector<HTMLElement>("#startvideo")
videoSwitcher &&
    videoSwitcher.addEventListener("click", () => {
        const modalEl = modal(video())
        modalEl.style.zIndex = "106"
    })
