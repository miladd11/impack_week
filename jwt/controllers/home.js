
const { render } = require("ejs");
const { Model } = require("mongoose");
const questionModel = require("../models/question");

const homePage = async (req, res) => {
  
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
    //res.render('home')
}
module.exports = {
   
    homePage,
   
};