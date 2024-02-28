const {Schema , model} = require("mongoose")
const CommentsSchema = new Schema({
    content:{
        type:String,
        required:true
    },
    blogId: {
        type: Schema.Types.ObjectId,
        ref: "blog",
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: "user",
    },

},
    {timestamps:true}
)
const comments = model("comments",CommentsSchema)
module.exports = comments