const router = require("express").Router();
const Controller = require("../../controllers");
const isLoggedIn = require("../../middleware/auth");

router.post("/login", Controller.userController.login);

router.post("/signup", Controller.userController.signup);

router.get("/", Controller.userController.getAllUsers); // returns all users

router.get("/getUsersByFilter", Controller.userController.getUsersByFilter); // return the list of users

router.delete("/deleteUsersByFilter", Controller.userController.deleteUsersByFilter); // DOES NOT return the list of the users (it returns the delete aperation)

router.put("/updateUsersByFilter", Controller.userController.updateUsersByFilter); // DOES NOT return the list of the users (it returns the update aperation) send object containing filter object and payload object

router.get("/:_id", Controller.userController.getUserById); // returns the user

router.put("/:_id", Controller.userController.updateUserById); // return the updated user

router.delete("/:_id", Controller.userController.deleteUserById); // return the deletes user

module.exports = router;
