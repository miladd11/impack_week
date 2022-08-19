const bcrypt = require('bcrypt');
const userModel = require("../models/user");
const questionModel = require("../models/question")


const login = async (req, res) => {
    // Our login logic starts here
    ////////////////////////////////////////try eslahshavad

    // Get user input
    const { email, password } = req.body;




    // Validate user input
    if (!(email && password)) {
        res.status(200).send(arr = { "errors": { "all": "All input is required" } });
    } else {


        // Validate if user exist in our database

        const user = await userModel.findOne({ email });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            req.session.loggedin = true;
            req.session.username = user.email;
            // Redirect to home page
            res.status(200).json(user);



            // save user token
            // user.token = token;

            // user

        } else {
            res.status(200).send(arr = { "errors": { "all": "user or pass not currect" } });
        }
    }
}

const register = async (req, res) => {
    // Our login logic starts here
    ////////////////////////////////////////try eslahshavad

    // Get user input
    const { email, password, username, confirmpassword } = req.body;




    // Validate user input
    if (!(email && password && confirmpassword && username)) {
        res.status(200).send(arr = { "errors": { "all": "All input is required" } });
        res.end;
    }
    if (password != confirmpassword) {
        res.status(200).send(arr = { "errors": { "all": "password and confirm not match" } });
        res.end;
    }


    // Validate if user exist in our database

    const oldUser = await userModel.findOne({ email });
    if (oldUser) {
        res.status(200).send(arr = { "errors": { "email": "User Already Exist. Please Login" } });
        res.end;
    }
    const user = await userModel.create({
        username,

        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: password,
    });

    res.status(200).json(user);
    res.end

}

const addquestion = async (req, res) => {
    if (req.session.loggedin) {
        const { question, discription } = req.body;

        // Validate user input
        if (!(question && discription)) {
            res.status(200).send(arr = { "errors": { "all": "All input is required" } });
        } else {


            // Validate if user exist in our database

            const existquestion = await questionModel.findOne({ question });

            if (!existquestion) {
                const createquestion = await questionModel.create({
                    question,
                    discription,
                    username: req.session.username,

                });

                res.status(200).json(createquestion);
                res.end






            } else {
                res.status(200).send(arr = { "errors": { "all": "question is erleady" } });
            }
        }
    } else {
        res.status(200).send(arr = { "errors": { "login": "you should login" } });
    }

}




const addcomment = async (req, res) => {
    if (req.session.loggedin) {
        const { comment } = req.body;

        // Validate user input
        if (!(comment)) {
            res.status(200).send(arr = { "errors": { "all": "All input is required" } });
        } else {
            questionModel.findByIdAndUpdate(req.params.id, {
                $push: { 'comments': { content: comment, username: req.session.username, } }
            }).then(
                res.status(200).json("ok")
            )
        }
    } else {
        res.status(200).send(arr = { "errors": { "login": "you should login" } });
    }

}
const updatequestion = async (req, res) => {
    if (req.session.loggedin) {
        const { question, discription } = req.body;

        // Validate user input
        if (!(question && discription)) {
            res.status(200).send(arr = { "errors": { "all": "All input is required" } });
        } else {


            // Validate if user exist in our database

            questionModel.findByIdAndUpdate(req.params.id, { question: req.body.question, discription: req.body.discription }, { runValidators: true })
                .then(
                    res.status(200).json("ok")

                )
                .catch(err => {
                    res.render('edit', {
                        question: false,
                        err: err.errors
                    })
                })
        }
   
}else {
    res.status(200).send(arr = { "errors": { "login": "you should login" } });
} 

}

module.exports = {

    login,
    register,
    addquestion,
    addcomment,
    updatequestion,
};