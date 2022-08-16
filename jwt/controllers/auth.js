const bcrypt = require('bcrypt');
const userModel = require("../models/user");


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



module.exports = {

    login,
    register,

};