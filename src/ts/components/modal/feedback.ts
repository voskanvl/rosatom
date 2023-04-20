import IMask from "imask";
import { ZodError, z } from "zod";

const initialData = {
    title: "для заказа осталось заполнить форму ниже",
    caption:
        "Спасибо, данные вашего заказа будут переданы в отдел продаж. После чего ожидайте звонка!",
};

function createElement(className: string, text: string, type: string = "div") {
    const element = document.createElement(type);
    element.classList.add(className);
    element.innerText = text;

    return element;
}

function createInput(
    placeholder: string,
    name: string,
    className: string = "feedback__input",
    type: string = "text",
) {
    const element = document.createElement("input");
    element.classList.add(className);
    element.name = name;
    element.type = type;
    element.placeholder = placeholder;

    return element;
}

export default function feedback({
    title,
    caption,
}: typeof initialData = initialData): HTMLElement {
    const element = document.createElement("form");
    element.classList.add("feedback__body");

    const titleEl = createElement("feedback__title", title),
        captionEl = createElement("feedback__caption", caption);

    element.append(titleEl);
    element.append(captionEl);

    const name = createInput("Имя", "name"),
        email = createInput("E-mail", "email"),
        phone = createInput("", "phone");

    IMask(phone, { mask: "+{7}(000)000-00-00", lazy: false });

    const textarea = document.createElement("textarea");
    textarea.placeholder = "Чем мы можем вам помочь?";
    textarea.classList.add("feedback__input");
    textarea.cols = 30;
    textarea.rows = 10;

    const agree = createElement("feedback__agree", ""),
        check = createInput("", "agree", "feedback__agree-check", "checkbox"),
        agreeCaption = createElement(
            "feedback__agree-caption",
            "Даю согласие на обработку моих персональных данный в соответствии с политикой обработки персональных данных",
        );

    agree.append(check, agreeCaption);

    const submitEl = createInput("", "submit", "feedback__submit", "submit");
    submitEl.value = "Записаться";

    element.append(name, email, phone, textarea, agree, submitEl);

    submitEl.addEventListener("click", (event: Event) => {
        event.preventDefault();
        const schema = z.string().email({ message: "Invalid email address" });

        try {
            schema.parse(email.value);
        } catch (error) {
            const fail = error as ZodError;
            console.log(fail);
        }
    });

    return element;
}
