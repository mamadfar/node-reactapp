const mongoose = require('mongoose');
const User = require('./../../../models/users');
const {validationResult} = require('express-validator');

class registerController {
    showForm(req, res) {
        res.render("home/auth/register", {
            messages: req.flash("errors")
        });
    };
    registerProcess(req, res) {

        const result = validationResult(req);
        if(!result.isEmpty()) {
            const errors = result.array();
            const messages = [];
            errors.forEach(err => {messages.push(err.msg)});
            req.flash("errors", messages);
            res.render("home/auth/register", {
                messages: req.flash("errors")
            });
        }

        const addUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        addUser.save();
    
        res.redirect("/")
    }
}

module.exports = new registerController();