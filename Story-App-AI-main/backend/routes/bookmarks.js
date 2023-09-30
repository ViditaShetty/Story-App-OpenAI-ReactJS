const router = require("express").Router();
const Bookmarks = require("../models/Bookmarks");



router.get("/upvotedtopsix/:userId",async(req,res)=>{
  try {
      const stories = await Bookmarks.find({userEmail:req.params.userId});
      console.log("Bookmarks top6 stories got=",stories);
      res.status(200).json(stories);
    } catch (err) {
      res.status(500).json(err);
    }
})

router.post("/getBookmarks",async(req,res)=>{
  try{
   const userId=req.body.userid;
    console.log(userId,"&&+++++&");
    var book= null;
    book=await Bookmarks.findOne({userEmail:userId});
    res.status(200).json(book);
  }
  catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})


router.post("/book",async(req,res)=>{
  try{
    
    const storyId=req.body.storyid;
    const userId=req.body.userid;
    console.log(storyId,userId,"&&&");

    var book= null;
    book=await Bookmarks.findOne({userEmail:userId,});
    if(book==null){  /**making a bookmark field if user is having 1st boookmark */
      const bk=new Bookmarks({
        userEmail:userId,
      });
      await bk.save();

      const bookmarks = await Bookmarks.findOneAndUpdate(
        {userEmail:userId},
        { $push: { bookmarks: storyId } }
        );
      const savedNew=await bookmarks.save();
      console.log("Bookmarked story in bookmarks=",savedNew);
      res.status(200).json(savedNew);
    }

  else{
    const bookmarks = await Bookmarks.findOneAndUpdate(
      {userEmail:userId},
      { $push: { bookmarks: storyId } }
      );
  const savedNew=await bookmarks.save();
  console.log("Boookmarkedd story in bokkmarksss=",savedNew);
    res.status(200).json(savedNew);
  }
  }
  catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})


router.post("/unbook",async(req,res)=>{
  try{
    const storyId=req.body.storyid;
    const userId=req.body.userid;
    console.log(storyId,userId,"&&&");

    var book= null;
    book=await Bookmarks.findOne({userEmail:userId,});
    if(book==null){  /**making a bookmark field if user is having 1st boookmark */
      res.status(200).json("");
    }

  else{
    const bookmarks = await Bookmarks.findOneAndUpdate(
      {userEmail:userId},
      { $pull: { bookmarks: storyId } }
      );
  const savedNew=await bookmarks.save();
  console.log("un-Boookmarkedd story in bokkmarksss=",savedNew);
    res.status(200).json(savedNew);
  }
  }
  catch(err){
    console.log(err);
    res.status(500).json(err);
  }
})


router.post("/bbupvote",async(req,res)=>{
  try {
    const storyId=req.body.storyid;
    const userId=req.body.userid;
    console.log(storyId,userId,"&&&");

    var book= null;
    book=await Bookmarks.findOne({userEmail:userId,});
    if(book==null){  /**making a bookmark field if user is having 1st boookmark */
      const bk=new Bookmarks({
        userEmail:userId,
      });
      await bk.save();

      const bookmarks = await Bookmarks.findOneAndUpdate(
        {userEmail:userId},
        { $push: { upvoted: storyId } }
        );
      const savedNew=await bookmarks.save();
      console.log("Upvoted story in bookmarks=",savedNew);
      res.status(200).json(savedNew);
    }

    else{
      const bookmarks = await Bookmarks.findOneAndUpdate(
        {userEmail:userId},
        { $push: { upvoted: storyId } }
        );
    const savedNew=await bookmarks.save();
    console.log("Upvoted story in bokkmarksss=",savedNew);
      res.status(200).json(savedNew);
    }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
})

router.post("/downvote",async(req,res)=>{
  try {
    const storyId=req.body.storyid;
    const userId=req.body.userid;
    console.log(storyId,userId,"&&&");

    var book= null;
    book=await Bookmarks.findOne({userEmail:userId,});
    if(book==null){  /**making a bookmark field if user is having 1st boookmark */
      const bk=new Bookmarks({
        userEmail:userId,
      });
      await bk.save();

      const bookmarks = await Bookmarks.findOneAndUpdate(
        {userEmail:userId},
        { $pull: { upvoted: storyId } }
        );
      const savedNew=await bookmarks.save();
      console.log("Downvoted story in bookmarks=",savedNew);
      res.status(200).json(savedNew);
    }

    else{
      const bookmarks = await Bookmarks.findOneAndUpdate(
        {userEmail:userId},
        { $pull: { upvoted: storyId } }
        );
    const savedNew=await bookmarks.save();
    console.log("Downvoted story on bokkmarks=",savedNew);
      res.status(200).json(savedNew);
    }
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
})


module.exports = router;