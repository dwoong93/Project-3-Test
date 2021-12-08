const checkIfAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next()
    } 
    else {
        req.flash("error_messages", "You need to be an Administrator to access this page");
        res.redirect('/users/login');
    }
}

const checkIfCustomerAuthenticated = (req, res, next) => {
    if (req.session.customer) {
        next()
    } 
    else {
        req.flash("error_messages", "hi daryl");
        res.redirect('/users/customer/login');
    }
}


module.exports = {
    checkIfAuthenticated,
    checkIfCustomerAuthenticated
}
    