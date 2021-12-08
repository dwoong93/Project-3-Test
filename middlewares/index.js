const checkIfAuthenticated = (req, res, next) => {
    if (req.session.user) {
        next()
    } 
    else {
        req.flash("error_messages", "You need to be an Administrator to access this page.");
        res.redirect('/users/login');
    }
}

const checkIfCustomerAuthenticated = (req, res, next) => {
    if (req.session.customer) {
        next()
    } 
    else {
        req.flash("error_messages", "Please login to view this page.");
        res.redirect('/users/customer/login');
    }
}


module.exports = {
    checkIfAuthenticated,
    checkIfCustomerAuthenticated
}
    