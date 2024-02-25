const { Router } = require("express")
const User = require("../models/user.js")
const router = Router();


router.get("/signin", (req, res) => {
  res.render('signin')



})
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);

    const token = await User.matchPassword(email, password)
    console.log(token)
    res.cookie("token", token).redirect("/")

  } catch (error) {
    res.render("signin",{error:"Incorrect Email or Password"})

  }

})
router.get("/signup", (req, res) => {
  return res.render('signup')
})
router.post("/signup", async (req, res) => {
  const { fullname, email, password } = req.body;
  console.log(fullname, email, password)
  await User.create({
    fullname,
    email,
    password,
  });
  res.redirect('/')
  // return res.redirect("/");
});
module.exports = router;


