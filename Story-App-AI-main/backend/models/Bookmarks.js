const mongoose = require("mongoose");

const BookmarksSchema = new mongoose.Schema(
    {
    userEmail:{ type:String,required:true},
    bookmarks:{ type:Array,default:["id1","id2","id3"]},
    upvoted:{ type:Array,default:["id1","id2","id3"]},
    shared:{ type:Array,default:["id1","id2","id3"]},     
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bookmarks", BookmarksSchema);