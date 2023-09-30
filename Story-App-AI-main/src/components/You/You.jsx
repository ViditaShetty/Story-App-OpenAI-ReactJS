import React from 'react'
import './You.css'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react'

const You = () => {
    const [stories,setStories]=useState([]);
    const [yourStories,setYourStories]=useState([]);
    const [upvotedStories,setUpvotedStories]=useState([]);
    const [bookmarkedStories,setBookmarkedStories]=useState([]);
    const [upOrBookOrShared,setUpOrBookOrShared]=useState('you');
    const [eee,setEee]=useState(false);

    useEffect(()=>{
        getYour();
        getUpvoted();
        getBookmarked();
        setStories(yourStories);
    }
    ,[eee]);
   

    const getYour=async()=>{
        await axios.get("https://story-app-api.vercel.app/api/stories/authorsStory/"+localStorage.getItem('email'))
        .then(async(res)=>{
            console.log("Your stories===",res.data)
            setYourStories(res.data);
        })
        .then(()=>{
            setEee(true);
        })
    }

    const getCompleteInfo=async(e)=>{
        await axios.get("https://story-app-api.vercel.app/api/stories/"+e)
        .then((res)=>{        
            /*****if the story is aldreay there in upvotes stories list,,dont include again on hot update*** */
            const found = upvotedStories.some(j => j._id === res.data._id);                
            if(!found) {
                upvotedStories.push(res.data);}
            
            console.log("Got upvoted stories",res.data)
         })
    }
    const getUpvoted=async()=>{
        await axios.get("https://story-app-api.vercel.app/api/bookmarks/upvotedtopsix/"+localStorage.getItem('email'))
        .then(async(res)=>{
            console.log("get complete info for upvoted",res.data[0])
            if(res.data[0]!=undefined){
            for(const key in res.data[0].upvoted){
                if(res.data[0].upvoted[key]==('id1')){console.log("id1 skipped");}
                else if(res.data[0].upvoted[key]==('id2')){console.log("id2 skipped");}
                else if(res.data[0].upvoted[key]==('id3')){console.log("id3 skipped");}
                else{
                /**for each uppvoted story's id, we eneed complete info */
                    console.log("get complete info for upvoted",res.data[0].upvoted[key]);
                    await getCompleteInfo(res.data[0].upvoted[key]);
                }}   
            }
        })
    }

    const getCompleteInfoBookmarked=async(e)=>{
        await axios.get("https://story-app-api.vercel.app/api/stories/"+e)
        .then((res)=>{ 
                /*****if the story is aldreay there in bookmarked stories list,,dont include again on hot update*** */
                const bfound = bookmarkedStories.some(j => j._id === res.data._id);                
            if(!bfound) {
                bookmarkedStories.push(res.data);}
            console.log("Got bookmaked stories",res.data)
         })
    }
    const getBookmarked=async()=>{
        await axios.post("https://story-app-api.vercel.app/api/bookmarks/getBookmarks/",{userid:localStorage.getItem('email')})
        .then(async(res)=>{
            console.log("get complete info for Bookmarked",res.data)
            if(res.data!=undefined){
                for(const key in res.data.bookmarks){
                    if(res.data.bookmarks[key]==('id1')){console.log("id1 skipped");}
                    else if(res.data.bookmarks[key]==('id2')){console.log("id2 skipped");}
                    else if(res.data.bookmarks[key]==('id3')){console.log("id3 skipped");}
                    else{
                    /**for each uppvoted story's id, we eneed complete info */
                        console.log("get complete info for upvoted",res.data.bookmarks[key])
                        await getCompleteInfoBookmarked(res.data.bookmarks[key]);
                    }}   
                }
            console.log("BOOKMARKED STORIES GOT===",bookmarkedStories);
        })
    }

    const GoToOneStory=(item)=>{
        navigate('/onestory');
        localStorage.setItem('selectedStoryId',item._id);
        localStorage.setItem('selectedStory',item.story);
        localStorage.setItem('selectedStoryUp',item.upvotes);
        localStorage.setItem('selectedStoryView',item.views);
        localStorage.setItem('selectedStoryImg',item.thumbnail);
        localStorage.setItem("selectedStoryHash",item.tags);
    }

    const navigate=useNavigate();
    const GoToHome=()=>{navigate('/home')}
    const GoToForm=()=>{navigate('/story')}
    const GoToExplore=()=>{navigate('/explore')}
    const GoToLeader=()=>{navigate('/leaderboard')}
    const GoToLogin=()=>{navigate('/')}
    const GoToYou=()=>{navigate('/you')}

  return (
    <div className='Hero'>
        <div className="Navbar">
            <div className="Nav"><img src={"https://cdn.dribbble.com/users/7265710/screenshots/16491924/media/ec1722eab30133eadf8fb47b7391335f.jpg?resize=400x300&vertical=center"}/></div>
            <div className="Nav" onClick={GoToHome}>Home</div>
            <div className="Nav" onClick={GoToExplore}>Explore</div>
            <div className="Nav" onClick={GoToLeader}>LeaderBoard</div>
            <div className="Nav" onClick={GoToYou}>You</div>
            <div className="Nav" onClick={GoToForm}>Publish</div>
            <div className="Nav" onClick={GoToLogin}>Logout</div>
            <div className="Nav"><SearchIcon/></div>
        </div>


        <div className="YYUnderlinee">
                    <div onClick={()=>{setUpOrBookOrShared('you');setStories(yourStories);}} className={(upOrBookOrShared=='you')?'selected':'notselected'}>
                    Your Stories
                    </div>
                    <div onClick={()=>{setUpOrBookOrShared('book');setStories(bookmarkedStories);}} className={(upOrBookOrShared=='book')?'selected':'notselected'}>Bookmarked</div>
                    <div onClick={()=>{setUpOrBookOrShared('up');setStories(upvotedStories);}} className={(upOrBookOrShared=='up')?'selected':'notselected'}>
                    Upvoted
                    </div>
                    <div onClick={()=>{setUpOrBookOrShared('share');setStories([]);}} className={(upOrBookOrShared=='share')?'selected':'notselected'}>Shared</div>
                    <div style={{display:'flex'}}><span>Sort by</span><span className="YYfilter">Tags</span></div>
        </div>  
        <div className="YYBookmark">
                {stories.map((i)=>{
                    return(
                    <div class="YYbook-item" onClick={()=>GoToOneStory(i)}>
                        <img src={i["thumbnail"]}  alt="cover"/>
                        <div className="YYTitle">
                                {i["story"].split(/\r?\n/)[0].replace("Title:","").substr(0,18)}
                                <span style={{fontSize:"14px",color:"grey"}}>
                                    {i["story"].split(/\r?\n/)[0].replace("Title:","").length>18?(<>...</>):(<></>)}
                                </span>
                        </div>
                        <div className="YYStats">
                            <div><RemoveRedEyeIcon sx={{fontSize:"14px"}}/>{i["views"].length}</div> 
                            <div><FavoriteBorderIcon sx={{fontSize:"14px"}}/>{i["upvotes"].length}</div></div>
                        <div className="YYhash">{i.tags.map((j)=>{return(<div className='YYhash1'>#{j}</div>)})}</div>
                    </div>
                )})
                }  
                {stories.length==0 ? (<div>No stories</div>):null}                 
        </div>

    </div>
  )
}

export default You