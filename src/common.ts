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
