let showPassword = document.querySelectorAll('.password-eye');
showPassword.forEach(item => item.addEventListener('click', toggleType));

function toggleType() {
    let input = this.closest('.password-wrap').querySelector('.input-password');
    let showMassage = this;

    if (input.type === 'password') {
        showMassage.querySelector('.password_hidden').classList.remove('active');
        showMassage.querySelector('.password_visible').classList.add('active');
        input.type = 'text';
    } else {
        showMassage.querySelector('.password_hidden').classList.add('active');
        showMassage.querySelector('.password_visible').classList.remove('active');
        input.type = 'password';
    }
}

// Form validation class
function ValidateForm(formSelector, cb) {
    this.$form = document.querySelector(formSelector);
    if (this.$form === null) return false;
    this.$btn = this.$form.querySelector("button");

    const _self = this;

    // Input validation on change or input events
    const handleValidation = (event) => {
        const target = event.target;
        const targetName = target.dataset.name;
        const targetTo = target.dataset.to;

        if (targetName) {
            _self.validateField(target, targetName);
        }
        if (targetTo) {
            _self.validateFieldTo(target, targetTo);
        }

        if (_self.checkForm("[data-valid]")) {
            _self.statusYesValid();
        } else {
            _self.statusNotValid();
        }
    };

    this.$form.addEventListener("input", handleValidation);
    this.$form.addEventListener("change", handleValidation);
    document.addEventListener("click", _self.handleClick);
}

// Validate a single field based on its data-name
ValidateForm.prototype.handleClick = function (e) {
    const _this = e.target;
    console.log(_this)
    if(_this.closest('.form__openselect') || _this.closest('.form__select')){
        _this.closest('.form__input').querySelector('.form__select').classList.add('focus')
    }else{
        document.querySelectorAll('.form__select').forEach(el=>{
            el.classList.remove('focus')
        })
    }
    // form__openselect
}
ValidateForm.prototype.validateField = function (target, targetName) {
    switch (targetName) {
        case "phrase":
            this.toggleValidation(target, this.checkPhrase(target));
            break;
        case "email":
            this.toggleValidation(target, this.checkValue(target) && this.checkEmail(target.value));
            break;
        case "txt":
        case "name":
        case "company":
        case "textall":
        case "dol":
        case "about":
        case "link":
        case "login":
        case "telegram":
            this.toggleValidation(target, this.checkValue(target) && this[`check${capitalize(targetName)}`](target.value));
            break;
        case "tel":
            target.value = target.value.replace(/[^0-9]/g, "").substr(0, 15);
            this.toggleValidation(target, this.checkValue(target) && this.checkTel(target.value));
            break;
        case "number":
            target.value = target.value.replace(/[^0-9]/g, "").substr(0, 12);
            this.toggleValidation(target, this.checkValue(target) && this.checkNum(target.value));
            break;
        case "code":
            target.value = target.value.replace(/[^0-9]/g, "").substr(0, 9);
            this.toggleValidation(target, this.checkValue(target));
            break;
        case "instalogin":
            // target.value = target.value.replace(/[^a-zA-Z0-9._\s-]/g, "").substr(0, 30);
            // console.log(target.value)
            this.toggleValidation(target, this.checkSelect(target));
            break;
        case "date":
        case "join":
        case "radio":
        case "select":
            this.toggleValidation(target, true);
            break;            
        case "rule":
            this.toggleValidation(target, target.checked);
            break;
        default:
            console.warn(`No validation method for: ${targetName}`);
    }
};
ValidateForm.prototype.validateFieldTo = function (target, targetTo) {
    const txtSelectedValuesObj = this.$form.querySelector(`input[name="${targetTo}"]`);
    
    const inputs = this.$form.querySelectorAll(`input[data-to="${target.dataset.to}"]`);
    
    const selectedArray = new Array();
    let count = 0;

    for (let i=0; i<inputs.length; i++) { 
        const input = inputs[i];
        if (input.checked) {
            selectedArray[count] = input.value;
            count++; 
        } 
    } 
    txtSelectedValuesObj.value = selectedArray.join('; ');

    // return count > 0;
    this.toggleValidation(txtSelectedValuesObj,count > 0);
};

// Helper methods for validation
ValidateForm.prototype.checkValue = function (selector) {
    return selector.value.trim() !== "";
};

ValidateForm.prototype.checkPhrase = function (input) {
    return input.value.length >= 8;
};
ValidateForm.prototype.checkSelect = function (input) {
    const txtSelectedValuesObj = input.closest('.form__input').querySelector('input');
    const selectedArray = new Array();
    let count = 0;

    for (let i=0; i<input.options.length; i++) { 
        if (input.options[i].selected) {
            selectedArray[count] = input.options[i].value;
            count++; 
        } 
    } 
    txtSelectedValuesObj.value = selectedArray.join('; ');

    return count > 0;
};

ValidateForm.prototype.checkEmail = function (emailValue) {
    const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i;
    return emailRegex.test(emailValue);
};

ValidateForm.prototype.checkName = function (nameValue) {
    const nameRegex = /^(?!\s*$)[-/'"№., A-Za-zА-Яа-яёЁЇїІіЄєҐґ\s]+$/;
    return nameRegex.test(nameValue) && nameValue.trim() !== "-" && nameValue[0] !== "-";
};

ValidateForm.prototype.checkCompany = function (companyValue) {
    const companyRegex = /^[-\s\.а-яА-ЯёЁa-zA-Z0-9]+$/;
    return companyRegex.test(companyValue) && companyValue.trim() !== "-" && companyValue[0] !== " ";
};

ValidateForm.prototype.checkTextall = function (textallValue) {
    return /^\S+$/.test(textallValue);
};

ValidateForm.prototype.checkNum = function (input) {
    return input.length === 10 || input.length === 12;
};

ValidateForm.prototype.checkLink = function (linkValue) {
    const linkRegex = /^((ftp|http|https):\/\/)?(www\.)?[A-Za-zА-Яа-я0-9.-]+\.[A-Za-zА-Яа-я0-9-]{2,8}(\/[\w#!:.?+=&%@!\-\/]*)?$/;
    return linkRegex.test(linkValue);
};

ValidateForm.prototype.checkLogin = function (loginValue) {
    const loginRegex = /^[^\u0400-\u04FF]+$/; // Exclude Cyrillic characters
    return loginRegex.test(loginValue);
};

ValidateForm.prototype.checkTelegram = function (telegramValue) {
    const telegramRegex = /^[a-zA-Z0-9._-]+$/;
    return telegramRegex.test(telegramValue);
};

ValidateForm.prototype.checkTel = function (telValue) {
    const telRegex = /^\+?[0-9\s\-\/]{6,15}$/;
    return telRegex.test(telValue);
};

// Manage field validity
ValidateForm.prototype.toggleValidation = function (selector, isValid) {
    if (isValid) {
        this.removeError(selector);
        this.validDataTrue(selector);
    } else {
        this.addError(selector);
        this.validDataFalse(selector);
    }
};

// Manage form validity
ValidateForm.prototype.checkForm = function (selector) {
    return Array.from(this.$form.querySelectorAll(selector)).every(item => item.dataset.valid === "true");
};

// Visual feedback for validation
ValidateForm.prototype.validDataTrue = function (selector) {
    selector.dataset.valid = "true";
};

ValidateForm.prototype.validDataFalse = function (selector) {
    selector.dataset.valid = "false";
};

ValidateForm.prototype.addError = function (selector) {
    selector.classList.add("item-error");
    selector.parentNode.classList.add("item-error");
};

ValidateForm.prototype.removeError = function (selector) {
    selector.classList.remove("item-error");
    selector.parentNode.classList.remove("item-error");
};

// Manage form submit button status
ValidateForm.prototype.statusYesValid = function () {
    this.$btn.classList.add("active");
    this.$btn.disabled = false;
};

ValidateForm.prototype.statusNotValid = function () {
    this.$btn.classList.remove("active");
    this.$btn.disabled = true;
};

// Utility function to capitalize strings
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize form validation
const formReg = new ValidateForm("#form");



// Example: Prevent form submission if AJAX is not used
// document.querySelector('#form').addEventListener('submit', function (event) {
//     event.preventDefault();
// });

// Example of showing success message after form submission
// function showNext(form) {
//     form.reset();
//     document.querySelector('.section-1__succ_mess').classList.add('active');
// }


