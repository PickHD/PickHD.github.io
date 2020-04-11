const Auth = {
    check_login: (req, res, next)=>
    {
        if (!req.session.logged_in) {
            return res.render('user/login',{
                viewTitle:"Login Form",
                showError:true,
                Error:"Silahkan Login terlebih dahulu"
            })
        
        }

        next();
    }
};

module.exports = Auth;