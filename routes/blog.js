const {Router} = require("express")
const Blog = require("../models/blog.js")
const multer  = require("multer")
const path = require("path")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,path.resolve(`./public/uploads/`))
    },
    filename: function (req, file, cb) {
      const filename = `${Date.now()}-${file.originalname}`
      cb(null,filename)
    }
  })
  
const upload = multer({ storage: storage })
const router = Router();
router.get("/add-blog",(req,res)=>{

    res.render("./partials/addblog",{
        user:req.user
    })

})
router.post("/",upload.single("filename"),async (req,res)=>{
    console.log(req.body)
    const {title,blogbody} = req.body;
    console.log`${req.file}`

    await Blog.create(
        {
            title,
            blogbody,
            CoverImageURL:`uploads/${req.file.filename}`,
            author:req.user._id,
        }
    )
    res.redirect("/");

})
module.exports = router;
