import { z, ZodError } from "zod"

//--- CHECK ABOUT PAGE
const isExcursionPage = !!document.querySelector("section.excursion")
if (isExcursionPage) {
    const mainHeader = document.querySelector(".main-header")
    mainHeader && mainHeader.classList.add("main-header--white")
}

//--- FORM ---
const TIMEOUT = 3000
let didSend = false
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

let formObject =
    form && Object.keys(schema.shape).reduce((acc, e) => ({ ...acc, [e]: form[e].value }), {})

formObject = { ...formObject, agree: document.querySelector<HTMLInputElement>("#agree")?.checked }
console.log("🚀 ~ formObject:", formObject)

form &&
    form.addEventListener("submit", async (event: Event) => {
        event.preventDefault()
        didSend = true
        const url = form.action

        try {
            schema.parse(formObject)
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
                console.log("🚀 ~ message, path :", message, path)
                const label = (
                    form[path] as HTMLInputElement
                ).parentElement?.querySelector<HTMLElement>(`label[for="${path}"]`)
                label && (label.innerHTML = message)
            })
        }
    })

//---
