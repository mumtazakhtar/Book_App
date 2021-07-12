const { verifySignUp } = require("../middleware");
const userController = require("../controllers/auth.controller");
const bookController = require("../controllers/book.controller");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/auth/signup",
        [
            verifySignUp.checkDuplicateUsernameOrEmail,
            verifySignUp.checkRolesExisted
        ],
        userController.signup
    );

    app.post("/api/auth/signin", userController.signin);
    app.post("/api/auth/update", userController.updateUser);
    app.post("api/auth/addBook", bookController.addBook);
    app.post("/api/auth/searchBook", bookController.searchBook);
};
