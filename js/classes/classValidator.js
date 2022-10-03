export class Validator {
    form;
    errors;
    message;
    errorElement;

    constructor(form) {
        this.form = form;
        this.errors = [];
    }

    validateFields() {}

    checkIfEmptyField(element) {
        if(element.value === '') {
            this.setMessagesAndErrorsClasses(element,"field is required");
        }
    }

    checkMinLength(element) {
        if(element.value.length < 3) {
            this.setMessagesAndErrorsClasses(element,"should be more than 2 symbols");
        }
    }

    validateCheckbox(element) {
        if(element.required) {
            if(element.checked) {
                element.nextElementSibling.classList.remove("error_msg", "active");
            } else {
                element.nextElementSibling.classList.add("error_msg", "active");

                this.errorElement = "." + element.id + "_error";
                this.errors.push({"element": element.errorElement, "message": "" });
            }
        }
    }

    equalPasswords() {
        if(this.form.password.value !== this.form.confirmPassword.value) {
            this.setMessagesAndErrorsClasses(this.form.password, "Passwords do not match", true);
            this.setMessagesAndErrorsClasses(this.form.confirmPassword, "Passwords do not match", true);
        }
    }

    validateEmail(email) {
        return email.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }

    validateEmailField() {
        if(!this.validateEmail(this.form.email.value)) {
            this.setMessagesAndErrorsClasses(this.form.email, "invalid email data", true);
        }
    }

    setMessagesAndErrorsClasses(element, text, defaultMsg = false) {
        let elementFieldName = element.name.replace("-", " ");
        this.message = "";
        this.message = defaultMsg ? text : elementFieldName + " " + text;
        this.errorElement = "." + element.id + "_error";

        this.errors.push({"element": this.errorElement, "message": this.message });
    }

    displayErrors() {
        for(let i = 0; i < this.errors.length; i++) {
            let errorSpan = document.querySelector(this.errors[i].element);

            if(errorSpan) {
                errorSpan.classList.add("active");
                errorSpan.innerText = this.errors[i].message;
                errorSpan.previousElementSibling.classList.add("error");
            }
        }
    }

    clearPreviousErrors() {
        this.message = "";
        let errorSpans = document.querySelectorAll(".error_msg");

        errorSpans.forEach(el => {
            el.classList.remove("active");
            el.previousElementSibling.classList.remove("error");
        });

    }
}