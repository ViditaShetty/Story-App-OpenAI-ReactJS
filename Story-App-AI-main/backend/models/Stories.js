const mongoose = require("mongoose");

const StoriesSchema = new mongoose.Schema(
    {
        authorEmail:{ type:String,required:true},
        story:{ type:String,required:true},
        prompt:{ type:String,required:true},        
        upvotes:{ type:Array,default:["id1","id2","id3"]},
        comments:{ type:Array,default:["id1","id2","id3"]},
        views:{ type:Array,default:["id1","id2","id3"]},    
        tags:{ type:Array,default:["comedy","mystery"]}, 
        thumbnail:{type:String}    

  },
  { timestamps: true }
);

module.exports = mongoose.model("Stories", StoriesSchema);