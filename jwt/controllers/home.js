
const { render } = require("ejs");
const { Model } = require("mongoose");
const questionModel = require("../models/question");

const homePage = async (req, res) => {
    
    if (req.session.loggedin) {
    try {
        questionModel
            .find()
            .then((data) => {
                res.render("home", {
                    questionData: data,
                    req: req,

                });
            })
    } catch (e) {
        console.log(e);
    }
} else {
    res.status(200).send(arr = { "errors": { "login": "you should login" } });
    }
    //res.render('home')
}
module.exports = {
   
    homePage,
   
};