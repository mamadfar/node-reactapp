const {check} = require('express-validator');

class registerValidator {
    handle(){
        return [
            check("name").not().isEmpty().withMessage("فیلد نام نباید خالی باشد").isLength({min: 6}).withMessage("فیلد نام نمیتواند کمتر از 6 کاراکتر باشد"),
            check("email").isEmail().withMessage("فرمت ایمیل معتبر نمی باشد"),
            check("password").isLength({min: 8}).withMessage("پسوورد نمی تواند کمتر از 8 کاراکتر باشد")
        ]
    }
}

module.exports = new registerValidator();