document.querySelectorAll(".form-name").forEach((el) => {
    el.addEventListener("click", (e) => {
        const formClass = e.target.dataset.formClass;
        document.querySelector("."+formClass).classList.add("active");
        e.target.parentNode.parentNode.classList.remove("active");
    });
});

class Validator {
    message;
    errorElement;
    errors;
    form;

    constructor(form) {
        this.form = form;
        this.errors = [];
    }

    validateFields() {
        this.errors = [];

        this.form.forEach((element) => {
            if(element.type == "checkbox") {
               return this.checkedCheckbox(element);
            }

            this.message = "";
            let errorSpans = document.querySelectorAll(".error_msg");

            errorSpans.forEach(el => {
                el.classList.remove("active");
                el.previousElementSibling.classList.remove("error");
            })

            if(element.value === '') {
                this.setMessagesAndErrorsClasses(element,"field is required");
            } else if(element.value.length < 3) {
                this.setMessagesAndErrorsClasses(element,"should be more than 2 symbols");
            } else {
                if(element.name == "confirm-password") {
                    if (!this.equalPasswords()) {
                        this.message = "";
                        this.message = "Passwords do not match";

                        this.errors.push({"element": ".password_error", "message": this.message});
                        this.errors.push({"element": ".confirmPassword_error", "message": this.message});
                    }
                }

                if(element.type == "email") {
                    if(!this.validateEmail(element.value)) {
                        this.setMessagesAndErrorsClasses(element, "invalid email data");
                    }
                }
            }

            this.displayErrors();
        });

        if(this.errors.length === 0) {
            alert("success");
            const user = new User();
        }
    }

    checkedCheckbox(element) {
        if(element.required && element.checked) {
            element.nextElementSibling.classList.remove("error_msg");
            element.nextElementSibling.classList.remove("active");
        } else {
            element.nextElementSibling.classList.add("error_msg");
            element.nextElementSibling.classList.add("active");
        }
        return element.checked;
    }

    equalPasswords() {
        let password;
        let confirmPassword;

        for(let i = 0; i < this.form.length; i++) {
            if(this.form[i].name == "password") {
                password = this.form[i].value;
            }

            if(this.form[i].name == "confirm-password") {
                confirmPassword = this.form[i].value;
            }
        }

        return password === confirmPassword;
    }

    validateEmail(email) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    setMessagesAndErrorsClasses(element, text) {
        let elementFieldName = element.name.replace("-", " ");
        this.message = "";
        this.message = elementFieldName + " " + text;
        this.errorElement = "." + element.id + "_error";

        this.errors.push({"element": this.errorElement, "message": this.message });
    }

    displayErrors() {
        for(let i = 0; i < this.errors.length; i++) {
            let errorSpan = document.querySelector(this.errors[i].element);

            errorSpan.classList.add("active");
            errorSpan.innerText = this.errors[i].message;
            errorSpan.previousElementSibling.classList.add("error");
        }
    }
}

class User {
    firstName;
    lastName;
    email;
    phone;
    password;
    confirmPassword;

    constructor(firstName, lastName, email, phone, password, confirmPassword) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}

document.querySelector("#btnLogin").addEventListener("click", () => {
    handlerClick("#loginForm");
});

document.querySelector("#btnRegister").addEventListener("click", () => {
    handlerClick("#registerForm");
});

function handlerClick(formElement) {
    const form = document.querySelector(formElement);
    let formElements = [];

    for(const element of form.elements) {
        if(element.type !== "button") {
            formElements.push(element);
        }
    }

    const validatorField = new Validator(formElements);
    validatorField.validateFields();
}

