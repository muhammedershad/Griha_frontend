import errorObject from "../interfaces/error";

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(email);
};

const validateFirstNameAndSecondName = (
    firstName: string,
    secondName: string
): boolean => {
    const trimmedFirstName = firstName.trim();
    const trimmedSecondName = secondName.trim();

    return !trimmedFirstName || !trimmedSecondName;
};

const validateUsername = (username: string): errorObject => {
    const trimmedUsername = username.trim();
    if (!trimmedUsername)
        return { error: true, message: "Enter a valid username" };
    const isValid = /^[A-Za-z]+$/.test(trimmedUsername);
    return {
        error: !isValid,
        message: "Username must consist of letters only",
    };
};

const validatePhoneNumber = (PhoneNumber: string): boolean => {
    const trimmedPhoneNumber = PhoneNumber.trim();
    const phoneRegex = /^\d{10}$/;
    return (
        phoneRegex.test(trimmedPhoneNumber) && trimmedPhoneNumber.length === 10
    );
};

const validatePassword = (
    password: string,
    confirmPass: string
): errorObject => {
    if (password.trim() !== confirmPass.trim())
        return { error: true, message: "Both passwords must be same" };
    return password.trim().length < 6
        ? { error: true, message: "Password must be at least 6 characters" }
        : { error: false, message: "" };
};

const isValidImageType = (fileName: string): boolean => {
    const allowedExtensions = ["jpg", "jpeg", "png", "gif", "bmp"];
    const extension = fileName.split(".").pop()?.toLowerCase();
    return !!extension && allowedExtensions.includes(extension);
};

export const validations = {
    validateEmail,
    validateFirstNameAndSecondName,
    validateUsername,
    validatePhoneNumber,
    validatePassword,
    isValidImageType,
};
