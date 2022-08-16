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
const logout = (req, res) => {
    req.session.loggedin = false;
    req.session.username = '';
    res.redirect('/')
}
module.exports = {

    login,
    logout,
    register,

};