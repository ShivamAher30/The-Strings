const {Router} = require("express")
const Blog = require("../models/blog.js")
const Comment = require("../models/comments.js")
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
  console.log(`this is req.user ${req.user}`)

    res.render("./partials/addblog",{
        user:req.user
    })

})
router.get("/:id",async (req,res)=>{
  const blog = await Blog.findById(req.params.id).populate("createdBy");
  const Allcomments = await Comment.find({blogId:req.params.id}).populate("createdBy")
  console.log(blog.CoverImageURL)
  res.render("./partials/blog",{
    blog:blog,
    comment:Allcomments
  })


})
router.post("/comment/:id",async(req,res)=>{
  const pointercomment = await Comment.create(
    {
      content:req.body.comment,
      blogId:req.params.id,
      createdBy:req.user._id
    }
  )
  return res.redirect(`/blog/${req.params.id}`)
})
router.post("/",upload.single("filename"),async (req,res)=>{
    const {title,blogbody} = req.body;
    

    const url = path.resolve(`./uploads/${req.file.filename}`)
    console.log(url);
    

    await Blog.create(
        {
            title,
            blogbody,
            CoverImageURL:`/uploads/${req.file.filename}`,
            author:req.user._id,
        }
    )
    res.redirect("/");

})
module.exports = router;
