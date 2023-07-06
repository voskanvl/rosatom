import { SlideComponent } from "@splidejs/splide"
import splidesPages from "./ts/components/sliders/splides-ic"
//--- CHECK ABOUT PAGE
const isAboutPage = !!document.querySelector("section.about")
if (isAboutPage) {
    const mainHeader = document.querySelector(".main-header")
    mainHeader && mainHeader.classList.add("main-header--white")
}

const splides = splidesPages()

//--- VIDEO ---

let isPlayVideo = false

const videoCards = document.querySelectorAll<HTMLElement>(".ic-video__card")
const video = document.querySelector<HTMLVideoElement>("video")
const videoContainer = document.querySelector<HTMLElement>(".ic-video__media")
const modal = document.querySelector<HTMLVideoElement>(".ic-modal")

video &&
    video.addEventListener("play", () => {
        isPlayVideo = true
    })

const closeVideo = () => {
    if (!video || !videoContainer) return
    video.pause()
    video.removeAttribute("started")
    videoContainer.removeAttribute("started")
}

modal &&
    modal.addEventListener("click", ({ target }: Event) => {
        if (!video || !videoContainer) return
        const targetEl = target as HTMLElement
        // const started = videoContainer.getAttribute("started")
        const closest = targetEl.closest(".ic-video__media")
        if (!closest && isPlayVideo) {
            closeVideo()
            isPlayVideo = false
        }
    })

videoCards &&
    videoCards.forEach(card =>
        card.addEventListener("click", () => {
            if (!videoContainer || !video) return
            videoContainer.setAttribute("started", "started")
            const videoData = card.dataset.video
            videoData && (video.src = videoData)
            video.play()
        }),
    )

video &&
    video.addEventListener("loadstart", () => {
        isPlayVideo = true
    })
video &&
    video.addEventListener("canplay", () => {
        // isPlayVideo = true
        video.setAttribute("started", "started")
    })

//---
//--- NEWS ---
const codNews = document.querySelector<HTMLElement>(".cod-news__right")
const codNewsList = document.querySelector<HTMLElement>(".cod-news__right > ul")
const splide = splides.splidesInstance?.instances["#cod-news"]

codNews &&
    codNews.addEventListener("click", ({ target }: Event) => {
        const targetEl = target as HTMLElement
        const short = targetEl.closest<HTMLElement>(".short-news")

        if (!short) return

        const prevShot = codNews.querySelector<HTMLElement>(".short-news[current]")
        prevShot && prevShot.removeAttribute("current")
        short.setAttribute("current", "current")
        const id = short.dataset.id
        codNews.dispatchEvent(new CustomEvent("current", { detail: id }))
    })

codNews &&
    codNews.addEventListener("current", (event: Event) => {
        const { detail } = event as CustomEvent

        const root = splide?.root
        if (!root) return

        const icVideoCards = [...root.querySelectorAll<HTMLElement>(".cod-news__card")]
        const currentVideoCards = icVideoCards.find(e => e.dataset.id === detail)

        const currentLi = currentVideoCards?.parentElement
        const ariaLabel = currentLi && currentLi.getAttribute("aria-label")
        const orderNumberLi = ariaLabel && parseInt(ariaLabel)

        orderNumberLi && splide.go(+orderNumberLi - 1)
    })

splide &&
    splide.on("active", (event: SlideComponent) => {
        const id = (event.slide.children[0] as HTMLElement).dataset.id
        const item = codNews && codNews.querySelector<HTMLElement>(`.short-news[data-id="${id}"]`)

        const prevShot = codNews && codNews.querySelector<HTMLElement>(".short-news[current]")
        prevShot && prevShot.removeAttribute("current")
        item && item.setAttribute("current", "current")

        document.body.style.overflow = "hidden"
        item && item.scrollIntoView({ block: "nearest", behavior: "smooth" })
        item &&
            codNewsList &&
            codNewsList.scrollTo({
                top: item.offsetTop - codNewsList.offsetTop - codNewsList.clientHeight / 2,

                behavior: "smooth",
            })
        document.body.style.overflow = ""
    })
//---
