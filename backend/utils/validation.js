const validator = require('validator');

module.exports.validateRegisterInput = (
    username,
    email,
    password,
    confirmPassword,
) => {
    const errors = {};
    if (username.trim() == '') {
        errors.username = 'Username is required';
    } else if(!validator.isAlphanumeric(username)) {
        errors.username = 'Username must be alphanumeric';
    }

    if (email.trim() == '') {
        errors.email = 'Email is required';
    } else if (!validator.isEmail(email)) {
        errors.email = 'Email is not valid';
    }

    if (password.trim() == '') {
        errors.password = 'Password is required';
    } else if (password !== confirmPassword) {
        errors.confirmPassword = 'Passwords does not match';
    } else if (validator.isStrongPassword(password) === false) {
        errors.password = 'Password is too weak';
    }

    return {
        valid: Object.keys(errors).length < 1,
        errors,
    };
}

module.exports.validateLoginInput = (usernameOremail, password) => {
    const errors = {};
    if (usernameOremail.trim() == '') {
        errors.usernameOremail = 'Username or email is required';
    } 

    if (password.trim() == '') {
        errors.password = 'Password is required';
    }

    return {
        valid: Object.keys(errors).length < 1,
        errors,
    };
}
