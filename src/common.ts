import "./sass/style.sass"
import "@splidejs/splide/css"

import initHeader from "./ts/initHeader"
import IMask from "imask"
import { setBlackCursor } from "./ts/components/cursor/cursor"
// import { ZodError, z } from "zod"

initHeader()
setBlackCursor()

const phones = document.querySelectorAll<HTMLInputElement>("input[name='phone']")
phones &&
    phones.length &&
    phones.forEach(phone => {
        IMask(phone, {
            mask: "+{7}(000)000-00-00",
            lazy: false,
        })
    })

const mainHeader = document.querySelector<HTMLElement>(".main-header")
mainHeader && (mainHeader.style.position = "absolute")
mainHeader && mainHeader.classList.remove("main-header--white")

//--- phone widget ---
const phoneWidget = document.createElement("div")
phoneWidget.classList.add("phone-widget")
phoneWidget.style.cssText = `
    width: max(60px,6vw);
    height: max(60px,6vw);
    border-radius: 50%;
    position: fixed;
    z-index: 105;
    padding: max(15px,1.5vw);
    bottom: 20px;
    right: 20px;
    background: #30A84290;
    backdrop-filter: blur(6px);
    box-shadow: 0 0 20px #30A842; 
`
phoneWidget.innerHTML = `<svg width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve" fill="white" style="transform: rotateY(180deg)">
<metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata>
<g><path d="M660.2,732.2C609.5,784.4,481.5,739.5,371,629C260.5,518.4,224.6,383.9,267.8,339.8l54.2-54.2L101.2,64.8C4.8,161.2-15,304.8,41,421l-2.6,0.9c60.5,137.3,97.5,217.1,210,329.6c112.5,112.5,192.3,149.5,329.6,210l0.9-2.6c116.2,56,259.9,36.2,356.3-60.3L714.5,678L660.2,732.2z"/><path d="M346.5,113.8l-73.6-73.6c-45.6-45.7-97.8-35.1-145.5,1.7l217.4,217.4C381.6,211.6,392.2,159.5,346.5,113.8z"/><path d="M959.8,727.1l-73.6-73.6c-45.7-45.7-97.8-35.1-145.5,1.7l217.4,217.4C994.8,824.8,1005.4,772.7,959.8,727.1z"/></g>
</svg>`
document.body.append(phoneWidget)
//--- partners form handle ---
// const DISAPPEAR_RESPONSE_MESSAGE = 3000
// const forms = document.querySelectorAll<HTMLFormElement>("form.partners-form")

// const perletterOutput = (element: HTMLElement, message: string, timeout: number = 40) => {
//     let i = 0
//     const interval = setInterval(() => {
//         if (i > message.length - 1) return clearInterval(interval)
//         element.innerHTML += message[i]
//         i++
//     }, timeout)
// }

// forms &&
//     forms.forEach(form => {
//         if (form) {
//             const nameEl = form.querySelector<HTMLInputElement>("input[name='name']")
//             const emailEl = form.querySelector<HTMLInputElement>("input[name='email']")
//             const phoneEl = form.querySelector<HTMLInputElement>("input[name='form_text_3']")
//             const buttonEl = form.querySelector<HTMLInputElement>("button[type='submit']")

//             const pre = document.createElement("pre")
//             pre.classList.add("error")
//             buttonEl?.after(pre)

//             const phoneMasked =
//                 phoneEl &&
//                 IMask(phoneEl, {
//                     mask: "+{7}(000)000-00-00",
//                     lazy: false,
//                 })

// const formSchema = z.object({
//     name: z.string().min(2, { message: "Вы забыли ввести имя" }),
//     email: z
//         .string({
//             errorMap: () => ({ message: "Вы не ввели адрес электронной почты" }),
//         })
//         .email("Пожайлуйста, введите корректный email"),
//     phone: z
//         .string()
//         .min(11, { message: "Телефонный номер должен содержать не менее 10 цифр" }),
// })

//             form.addEventListener("submit", async event => {
//                 event.preventDefault()
//                 pre.innerHTML = ""
//                 try {
//                     // formSchema.parse({
//                     //     name: nameEl?.value,
//                     //     email: emailEl?.value,
//                     //     phone: phoneMasked?.unmaskedValue,
//                     // })
//                     const res = await fetch(form.action, {
//                         method: "POST",
//                         body: new FormData(form),
//                     })
//                     if (res.ok) {
//                         pre.style.color = "blue"
//                         perletterOutput(pre, "Отзыв отправлен успешно")
//                         setTimeout(() => {
//                             pre.style.color = ""
//                             pre.innerHTML = ""
//                             form.reset()
//                         }, DISAPPEAR_RESPONSE_MESSAGE)
//                     } else {
//                         perletterOutput(pre, "Ошибка при отправке отзыва")
//                         setTimeout(() => {
//                             pre.style.color = ""
//                             pre.innerHTML = ""
//                         }, DISAPPEAR_RESPONSE_MESSAGE)
//                     }
//                 } catch (error: unknown) {
//                     // const errorTyped = error as ZodError
//                     // const errors = errorTyped.errors.map(({ message, path: [pathString] }) => ({
//                     //     message,
//                     //     pathString,
//                     // }))
//                     // perletterOutput(pre, errors.map(({ message }) => " - " + message).join("\n"))
//                 }
//             })
//         }
// })
// //---
