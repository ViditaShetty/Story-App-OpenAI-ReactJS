const router = require("express").Router();
const Stories = require("../models/Stories");
const mongoose=require('mongoose');

router.post("/", async (req, res) => {
    try {
      console.log("req body recieved=",req.body);

      const newStories= new Stories({
        thumbnail: req.body.pics,
        authorEmail:req.body.user,
        prompt:req.body.prompt,
        story:req.body.story
         });
      console.log("recivedf", newStories);
      var saved = await newStories.save();
      console.log(saved);
      res.status(200).json(saved);
    }  
    catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  });


router.get("/",async(req,res)=>{
    try {
        const stories = await Stories.find({});
        console.log("stories got=",stories.length);
        res.status(200).json(stories);
      } catch (err) {
        res.status(500).json(err);
      }
})


router.get("/topten",async(req,res)=>{
  try {
    var stories = await Stories.find({}).sort({upvotes:-1}).limit(10);
    var stories1 = await Stories.aggregate().unwind("$upvotes").
                           group({_id:'$_id', 
                                  ct:{$sum:1}}).
                           sort({ ct: -1}) ;
                           
     /* > db.demo33.aggregate({$unwind:"$ListOfStudent"}, { $group : {_id:'$_id', ct:{$sum:1}}}, { $sort :{ ct: -1}} );
     *  { "_id" : ObjectId("5e17556ccfb11e5c34d898ca"), "ListOfStudent" : [ "Chris", "Bob" ] }
        { "_id" : ObjectId("5e17557acfb11e5c34d898cb"), "ListOfStudent" : [ "David", "Adam", "Mike" ] }
        { "_id" : ObjectId("5e1755a3cfb11e5c34d898cc"), "ListOfStudent" : [ "Carol", "Sam", "John", "Robert" ] }
     */
    console.log("Leaderboard top10 stories got",stories1,stories[0]);
    res.status(200).json(stories);
    } catch (err) {
      res.status(500).json(err);
    }
})


router.post("/upvote",async(req,res)=>{
  try {
    const storyId=req.body.storyid;
    const userId=req.body.userid;
    console.log(storyId.userId)


    const stories = await Stories.findByIdAndUpdate(
                                  storyId,
                                  { $push: { upvotes: userId } }
                                  );
    const savedNew=await stories.save();
    console.log("Upvoted story=",savedNew.prompt);
      res.status(200).json(savedNew);
    } catch (err) {
      res.status(500).json(err);
    }
})

router.post("/downvote",async(req,res)=>{
  try {
    const storyId=req.body.storyid;
    const userId=req.body.userid;
    console.log(storyId,userId)

    const stories = await Stories.findByIdAndUpdate(
                                  storyId,
                                  { $pull: { upvotes: userId } }
                                  );
    const savedNew=await stories.save();
    console.log("Downvoted story=",savedNew.prompt);
      res.status(200).json(savedNew);
    } catch (err) {
      res.status(500).json(err);
    }
})



router.get("/:id",async(req,res)=>{
  try {
      console.log("complete info for story id=",req.params.id);
      const stories = await Stories.findById(req.params.id);
      console.log("Upvoted top 6's 1 storys complete info");
      res.status(200).json(stories);
    } catch (err) {
      res.status(500).json(err);
    }
})


router.get("/authorsStory/:id",async(req,res)=>{
  try {
      console.log("stories which author published=",req.params.id);
      const stories = await Stories.find({authorEmail:req.params.id});
      res.status(200).json(stories);
    } catch (err) {
      res.status(500).json(err);
    }
})



router.post("/tag",async(req,res)=>{
  try {
    const storyId=req.body.storyid;
    const userId=req.body.userid;
    const tag=req.body.tag;
   //to avoid duplicate tags
   const storiess=await Stories.find({_id:storyId,tags:tag});
   console.log(storiess);
   if(storiess.length!=0){
      res.status(200).json(storiess);
    }
   else{
    const stories = await Stories.findByIdAndUpdate(
                                  storyId,
                                  { $push: { tags: tag } }
                                  );
    const savedNew=await stories.save();
    console.log("Tagged story=",savedNew.prompt);
      res.status(200).json(savedNew);
   }
    } catch (err) {
      res.status(500).json(err);
    }
})


module.exports = router;