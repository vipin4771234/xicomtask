export const firstNameValidation = (name:string) => {
    return true
}
export const lastNameValidation = (name:string) => {
    return true
}
export const emailValidation = (email:string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}
export const phoneValidation = (phone:string) => {
    const phoneRegex = /^[0-9]{10}$/; // Validates a 10-digit number
    return phoneRegex.test(phone);
}