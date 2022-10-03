import {Validator} from "./classValidator.js";

export class ValidatorLoginForm extends Validator {
    constructor(form) {
        super(form);
    }

    validateFields() {
        this.errors = [];

        for(const element of this.form.elements) {

            if(element.type !== "button") {
                this.clearPreviousErrors();

                if(element.type == "checkbox") {
                    this.validateCheckbox(element);
                } else {
                    this.checkIfEmptyField(element);
                }
            }
        }

        this.displayErrors();

        if(this.errors.length === 0) {
            alert("success");
        }
    }
}