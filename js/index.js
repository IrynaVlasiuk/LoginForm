document.querySelectorAll(".form-name").forEach((el) => {
    el.addEventListener("click", (e) => {
        const formClass = e.target.dataset.formClass;
        document.querySelector("."+formClass).classList.add("active");
        e.target.parentNode.parentNode.classList.remove("active");
    });
});

import {ValidatorLoginForm} from './classes/classValidatorLoginForm.js';
import {ValidatorRegisterForm} from './classes/classValidatorRegisterForm.js';

document.querySelector("#btnLogin").addEventListener("click", () => {
    const form = document.querySelector("#loginForm");
    const validatorForm = new ValidatorLoginForm(form);

    validatorForm.validateFields();

});

document.querySelector("#btnRegister").addEventListener("click", () => {
    const form = document.querySelector("#registerForm");
    const validatorForm = new ValidatorRegisterForm(form);

    validatorForm.validateFields();
});


