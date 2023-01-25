import IMask from "imask";
export default function applyIMaskToField() {
    const partnersForm = document.querySelector<HTMLFormElement>(".partners-form");
    if (!partnersForm) throw Error("отсутствует .partners-form");
    const partnersFormPhone = partnersForm.querySelector<HTMLInputElement>("input[name='phone']");
    if (!partnersFormPhone) throw Error("отсутствует .partners-form  input[name='phone']");
    IMask(partnersFormPhone, {
        mask: "+{7}(000)000-00-00",
        lazy: false,
    });
}
