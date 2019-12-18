const router = require("express").Router();

const Users = require("./users-model.js");
const restricted = require("../auth/restricted-middleware.js");

router.get("/", restricted, (req, res) => {
  console.log(req.token);
  Users.findByDpt(req.token.dpt)
    .then(users => {
      console.log("list of users: ", users);
      res.json(users);
    })
    .catch(err => res.send(err));
});

function checkDepartment(dpt) {
  return function(req, res, next) {
    if (req.token && dpt === req.token.dpt) {
      next();
    } else {
      res
        .status(403)
        .json({ message: `You have no power here. You must be in ${dpt}` });
    }
  };
}
module.exports = router;
