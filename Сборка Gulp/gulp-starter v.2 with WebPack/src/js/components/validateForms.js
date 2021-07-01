// import JustValidate from "just-validate";
// import JustValidate from "../vendors/just-validate";
// import Inputmask from "inputmask";

export const validateForms = () => {
    const inputTel = document.querySelectorAll("input[type='tel']");

    let im = new Inputmask("+380 000-00-00-000");
    im.mask(inputTel);


    // Скрипт для того, чтобы в инпут нельзя было вводить буквы (использовать только если не используется INPUTMASK)

    // inputTel.forEach(input => {
    //     input.addEventListener("input", (e) => {
    //         e.target.value = e.target.value.replace(/[^0-9]/g, "");
    //     });
    // });

    let validateForms = (selector, rules) => {
        new window.JustValidate(selector, {
            rules: rules,
            messages: {
                name: "Введите имя",
                tel: "Введите телефон",
            },
            submitHandler: function (form) {
                let formData = new FormData(form);

                fetch("mail.php", {
                    method: "POST",
                    body: formData,
                }).then((response) => {
                    const formWrapper = document.querySelector(".form .container");
                    const btn = formWrapper.querySelector("button[type='submit']");

                    if (response.ok) {
                        // Логика при отправке если все прошло успешно
                        formWrapper.insertAdjacentHTML("beforeend", `
                            <p class="form__final">Спасибо за заявку! В скором времени наш менеджер с Вами свяжется!</p>
                        `);
                        form.reset();
                        btn.disabled = true;

                        setTimeout(() => {
                            formWrapper.lastElementChild.remove();
                            btn.disabled = false;
                        }, 5000);
                    } else {
                        // Логика при отправке если все прошло не успешно
                        formWrapper.insertAdjacentHTML("beforeend", `
                            <p class="form__final">Что-то пошло не так! Попробуйте ещё раз.</p>
                        `);
                        btn.disabled = true;

                        setTimeout(() => {
                            formWrapper.lastElementChild.remove();
                            btn.disabled = false;
                        }, 5000);
                    }
                });
            },
        });
    };

    validateForms(".form form", {
        name: {
            required: true,
        },
        tel: {
            required: true
        },
    });
};
