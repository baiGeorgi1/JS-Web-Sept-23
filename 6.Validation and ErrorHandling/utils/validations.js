exports.isValidName = (name) => {
    return name && name.length >= 3;
};
exports.isValidAge = (age) => {
    return age && age > 0 && age <= 110;
};
