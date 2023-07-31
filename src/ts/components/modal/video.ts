export default function video(): HTMLElement {
    //- video(src="../../../assets/РЭА.mp4" poster="../../../assets/images/about-main.jpg" alt="about-main" autoplay loop muted draggable="false" style="width: 100%; aspect-ratio: 16 / 9; object-fit: fill;")
    const videoEl = document.createElement("video")
    videoEl.src = document.body.dataset.video || ""
    if (!videoEl.src) throw Error("не могу воспроизвести видео. не указан адрес")
    videoEl.poster = "../../../assets/images/about-main.jpg"
    videoEl.autoplay = videoEl.loop = false
    videoEl.style.width = "100%"
    videoEl.style.aspectRatio = "16 / 9"
    videoEl.style.objectFit = "fill"

    const wrapper = document.createElement("div")
    wrapper.style.width = "75%"
    wrapper.style.position = "relative"

    wrapper.append(videoEl)
    videoEl.play()

    videoEl.addEventListener("click", () => {
        if (videoEl.paused) {
            videoEl.play()
        } else {
            videoEl.pause()
        }
    })

    return wrapper
}
