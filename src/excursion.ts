import { z, ZodError } from "zod"
import { setWhiteCursor } from "./ts/components/cursor/cursor"
import IMask from "imask"

//--- CHECK ABOUT PAGE
const isExcursionPage = !!document.querySelector("section.excursion")
if (isExcursionPage) {
    const mainHeader = document.querySelector(".main-header")
    mainHeader && mainHeader.classList.add("main-header--white")
}

setWhiteCursor()

//--- FORM ---
const TIMEOUT = 3000
// let didSend = false
const schema = z.object({
    name: z.string().min(2, { message: "Имя должно содержать не менее двух букв" }),
    phone: z.string().min(11, { message: "Количество цифр в телефоне должно быть 10" }),
    email: z.string().email({ message: "Проверьте на корректность введеный email" }),
    agree: z.literal(true, {
        errorMap: () => ({
            message:
                "Без Вашего согласия на обработку персональных данных мы не сможем отправить запрос",
        }),
    }),
})
const form = document.querySelector<HTMLFormElement>("form")
const fieldsetUlEl = form && form.querySelector<HTMLFieldSetElement>("fieldset#ulgroup")
const inputUlEl = form && form.querySelector<HTMLInputElement>("input[name='ul'][value='yes']")
const ulFields = form && form.querySelectorAll<HTMLInputElement>("input[data-forul]")
const phoneEl = form && form.querySelector<HTMLInputElement>("input[name='phone']")
const errorEls = form && form.querySelectorAll<HTMLInputElement>(".excursion-form__error")

const phoneMask =
    phoneEl &&
    IMask(phoneEl, {
        mask: "+{7}(000)000-00-00",
        lazy: false,
    })

fieldsetUlEl &&
    fieldsetUlEl.addEventListener("input", (event: Event) => {
        if (event.target === inputUlEl) {
            ulFields?.forEach(e => (e.style.display = ""))
        } else {
            ulFields?.forEach(e => (e.style.display = "none"))
        }
    })

form &&
    form.addEventListener("submit", async (event: Event) => {
        event.preventDefault()
        // didSend = true
        const url = form.action

        let formObject =
            form &&
            Object.keys(schema.shape).reduce((acc, e) => ({ ...acc, [e]: form[e].value }), {})

        formObject = {
            ...formObject,
            agree: document.querySelector<HTMLInputElement>("#agree")?.checked,
            phone: phoneMask?.unmaskedValue,
        }

        try {
            schema.parse(formObject)

            errorEls && errorEls.forEach(e => (e.innerHTML = ""))

            const res = await fetch(url, {
                method: "POST",
                body: new FormData(form),
            })

            let outMessage = ""

            if (res.ok) {
                outMessage = "ЗАЯВКА ОТПРАВЛЕНА УСПЕШНО"
            } else {
                outMessage = "ОТПРАВИТЬ НЕ УДАЛОСЬ. ПОПРОБУЙТЕ ЕЩЕ РАЗ ИЛИ ПЕРЕЗАГРУЗИТЕ СТРАНИЦУ"
            }

            const prevFormHTML = form.innerHTML
            form.innerHTML = outMessage
            setTimeout(() => {
                form.innerHTML = prevFormHTML
                form.reset()
            }, TIMEOUT || 3000)
        } catch (error) {
            const fail = error as ZodError
            console.log(fail)
            const errors = fail.errors.map(({ message, path: [name] }) => ({ path: name, message }))
            errors.forEach(({ message, path }) => {
                const label = (
                    form[path] as HTMLInputElement
                ).parentElement?.querySelector<HTMLElement>(`label[for="${path}"]`)
                label && (label.innerHTML = message)
            })
        }
    })

//---
