
const { render } = require("ejs");
const { Model } = require("mongoose");
const userModel = require("../models/user");

function homePage(req, res) {
    userModel
        .find()
        .then((data) => {
            res.render("home", {
                userData: data,
                req:req,
               
            });
        })
        .catch((err) => {
            console.log(err);
        });
    //res.render('home')
}
module.exports = {
   
    homePage,
   
};