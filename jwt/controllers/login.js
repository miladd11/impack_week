const questionModel = require("../models/question")


const login = (req, res) => {
    res.render("login.ejs", {
        req:req,
    });
};
const register = (req, res) => {
    res.render("register.ejs", {
        req: req,
    });
};
const addquestion = (req, res) => {
    if (req.session.loggedin != true) {
        return res.redirect('/');
    } else {
    res.render("addquestion.ejs", {
        req: req,
    });
    }

};
const viewquestion =async (req, res) => {
    if (req.session.loggedin != true) {
        return res.redirect('/');
    } else {
        var currentquestion = await questionModel.findById(req.params.id)
        //.populate("comments")
        if (currentquestion) {
            res.render("view.ejs", {
                req: req,
                question: currentquestion
            });
        }
       
    }

};
const deletecomment = async (req, res) => {
    if (req.session.loggedin != true) {
        return res.redirect('/');
    } else {
        
       questionModel.findByIdAndUpdate(req.params.postid, {
           $pull: { 'comments': { _id: req.params.id } }
       }).then(
          res.redirect('/view/' + req.params.postid)
       )
    }

};
const deletequestion = async (req, res) => {
    if (req.session.loggedin != true) {
        return res.redirect('/');
    } else {

        questionModel.findByIdAndDelete(_id = req.params.id)
            .then(() => {
                res.redirect('/')
            })
            .catch(err => {
                console.log(err)
            })
    }


};
const editquestion = async (req, res) => {
    if (req.session.loggedin != true) {
        return res.redirect('/');
    } else {

        
        questionModel.findById(_id = req.params.id)
            .then(question => {
                if (question) {
                    res.render('edit', {
                        req: req,
                        question: question
                    })
                } else {
                    res.redirect('/')
                }
            })
            .catch(err => {
                console.log(err)
            })
    }


};



const logout = (req, res) => {
    req.session.loggedin = false;
    req.session.username = '';
    res.redirect('/')
}
module.exports = {

    login,
    logout,
    register,
    addquestion,
    viewquestion,
    deletecomment,
    deletequestion,
    editquestion,
};