const PasswordValidator = require('password-validator');

const passwordSchema = new PasswordValidator();

passwordSchema
    .is().min(8)
    .is().max(100)
    .has().uppercase()
    .has().lowercase()
    .has().digits(2)
    .has().not().spaces()
    .is().not().oneOf(['Passw0rd', 'Password123']);



module.exports = (req, res, next) => {
    try {
        if (passwordSchema.validate(req.body.password)) {
            next();

        } else {
            return res.status(400)
                .json({ error: `mot de passe faible!` })
        }

    } catch (error) {
        res.status(401).json({ error });
    }
};