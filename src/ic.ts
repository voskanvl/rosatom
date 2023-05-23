import splidesPages from "./ts/components/sliders/splides-ic"

//--- CHECK ABOUT PAGE
const isAboutPage = !!document.querySelector("section.about")
if (isAboutPage) {
    const mainHeader = document.querySelector(".main-header")
    mainHeader && mainHeader.classList.add("main-header--white")
}

splidesPages()

//--- VIDEO ---

let isPlayVideo = false

function loadVideo(arg) {
    console.log(arg)
}

const videoCards = document.querySelectorAll<HTMLElement>(".ic-video__card")
const video = document.querySelector<HTMLVideoElement>("video")
const videoContainer = document.querySelector<HTMLElement>(".ic-video__media")
const modal = document.querySelector<HTMLVideoElement>(".ic-modal")
const fallback = document.querySelector<HTMLVideoElement>(".ic-video__fallback")

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
