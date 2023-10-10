exports.validName = (req, res, next) => {
    if (!req.body.name || req.body.name.length < 3) {
        return res.status(404).send(`Wrong username! middleware`);
    }
    next();
};
exports.validAge = (req, res, next) => {

    if (!req.body.age || req.body.age < 0 || req.body.age > 120) {
        return res.status(404).send(`Wrong age! - middleware`);
    }
    next();
};