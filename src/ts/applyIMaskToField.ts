import IMask from "imask"
export default function applyIMaskToField() {
    const partnersForm = document.querySelector<HTMLFormElement>(".partners-form")
    if (!partnersForm) {
        console.warn("отсутствует .partners-form")
        return
    }
    const partnersFormPhone = partnersForm.querySelector<HTMLInputElement>(
        "input[name='form_text_3']",
    )
    if (!partnersFormPhone) throw Error("отсутствует .partners-form  input[name='form_text_3']")
    IMask(partnersFormPhone, {
        mask: "+{7}(000)000-00-00",
        lazy: false,
    })
}
