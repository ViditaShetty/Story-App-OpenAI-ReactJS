import React from 'react'
import './home.css'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react'

const Home = () => {
    const [exploreStories,setExploreStories]=useState([]);
    const [leadStories,setLeadStories]=useState([]);
    const [stories,setStories]=useState([]);
    const [upvotedStories,setUpvotedStories]=useState([]);
    const [bookmarkedStories,setBookmarkedStories]=useState([]);
    const [upOrBookOrShared,setUpOrBookOrShared]=useState('up');

    const [eee,setEee]=useState(false);
    useEffect(()=>{
        getStories();
        getBookmarked();
        setStories(upvotedStories);
    }
    ,[]);
   
    const getStories=async()=>{
        await axios.get("https://story-app-api.vercel.app/api/stories/topten")
        .then((res)=>{
            for(const key in res.data){
                if(key<"3"){
                 if(leadStories.length<3){leadStories.push(res.data[key])}
                 if(exploreStories.length<3)exploreStories.push(res.data["6"-key])
                }}   
           console.log("LeadStories=",leadStories);
        })
        .then(async()=>{
            await getUpvoted()/*****get  upvoted stroies after getting bookmakrs and leaderboard stories */
            .then(()=>{
                 setEee(true);/**************** */
             })
        })       
    }


    const getCompleteInfo=async(e)=>{
        await axios.get("https://story-app-api.vercel.app/api/stories/"+e)
        .then((res)=>{        
            if(upvotedStories.length<6){
                /*****if the story is aldreay there in upvotes stories list,,dont include again on hot update*** */
                const found = upvotedStories.some(j => j._id === res.data._id);                
                if(!found) {
                    upvotedStories.push(res.data);}
            }
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
                    console.log("get complete info for upvoted",res.data[0].upvoted[key])
                    await getCompleteInfo(res.data[0].upvoted[key]);
                }}   
            }
        })
    }

    const getCompleteInfoBookmarked=async(e)=>{
        await axios.get("https://story-app-api.vercel.app/api/stories/"+e)
        .then((res)=>{ 
            if(bookmarkedStories.length<6){
                /*****if the story is aldreay there in bookmarked stories list,,dont include again on hot update*** */
                const bfound = bookmarkedStories.some(j => j._id === res.data._id);                
                if(!bfound) {
                    bookmarkedStories.push(res.data);}
            }
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
            <div className="Nav">Home</div>
            <div className="Nav" onClick={GoToExplore}>Explore</div>
            <div className="Nav" onClick={GoToLeader}>LeaderBoard</div>
            <div className="Nav" onClick={GoToYou}>You</div>
            <div className="Nav" onClick={GoToForm}>Publish</div>
            <div className="Nav" onClick={GoToLogin}>Logout</div>
            <div className="Nav" ><SearchIcon/></div>
                    
        </div>

        <div className="Banner">
            <div className="BannerLeft">
                <div>Welcome to VoyceMe, <br/> Home of Creativity!</div>
                <div style={{padding: "0px 28px",width:"35vw"}}>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
                </div>
                <div  onClick={GoToExplore} style={{cursor:"pointer"}}>
                    Browse Stories
                </div>
            </div>
            <div className="BannerRight">
                <div><ExpandCircleDownIcon sx={{fontSize:"40px",color:"#aac9e399"}}/></div>
                <img src={'https://www.saplingcorp.com/_next/image?url=%2Fimg%2Fmidjourney-book-covers%2Fai-art-composite-image-book-cover.png&w=1920&q=100'} alt="cover"/>
                <div><ExpandCircleDownIcon sx={{fontSize:"40px",color:"#aac9e399"}}/></div>
            </div>
        </div>

        <div className="EL">
            <div>
            <div className="Underline">Explore</div>  
            <div className="Explore">
            {exploreStories.length==0 ? (<div>Loading stories...</div>):null}              
                {exploreStories.map((i)=>{
                    return(
                    <div class="grid-item" onClick={()=>GoToOneStory(i)}>
                        <img src={i["thumbnail"]}  alt="cover"/>
                        <div className="Title">  
                           {i["story"].split(/\r?\n/)[0].replace("Title:","").substr(0,23)}
                            <span style={{fontSize:"14px",color:"grey"}}>
                                {i["story"].split(/\r?\n/)[0].replace("Title:","").length>23?(<>...</>):(<></>)}
                            </span></div>
                        <div className="Stats">
                            <div><RemoveRedEyeIcon sx={{fontSize:"14px"}}/>{i["views"].length}</div> 
                            <div><FavoriteBorderIcon sx={{fontSize:"14px"}}/>{i["upvotes"].length}</div></div>
                        <div className="hash">{i.tags.map((j)=>{return(<div className='hash1'>#{j}</div>)})}</div>
                    </div>
                )})
                }                   
            </div>
            </div>
            <div className="Leader">
                 <div className="Underline2">LeaderBoard</div>  
                 {leadStories.map((i,index)=>{
                    return(
                        <div className="leaderStories" onClick={()=>GoToOneStory(i)}>
                            <div>{index+1}</div>
                            <img src={i["thumbnail"]}  alt="cover"/>
                            <div>
                                <div className="Title">
                                {i["story"].split(/\r?\n/)[0].replace("Title:","").substr(0,32)}
                                <span style={{fontSize:"14px",color:"grey"}}>
                                    {i["story"].split(/\r?\n/)[0].replace("Title:","").length>32?(<>...</>):(<></>)}
                                </span>
                            </div> 
                                <div className="Stats">
                                    <div><RemoveRedEyeIcon sx={{fontSize:"14px"}}/>{i["views"].length}</div>
                                    <div><FavoriteBorderIcon sx={{fontSize:"14px"}}/>{i["upvotes"].length}</div></div>
                                <div className="hash">{i.tags.map((j)=>{return(<div className='hash1'>#{j}</div>)})}</div>
                            </div>
                        </div>
                    )
                 })}
            </div>
        </div>

        <div className="Underlinee">
                    <div onClick={()=>{setUpOrBookOrShared('up');setStories(upvotedStories);}} className={(upOrBookOrShared=='up')?'selected':'notselected'}>
                    Upvoted
                    </div>
                    <div onClick={()=>{setUpOrBookOrShared('save');setStories(bookmarkedStories);}} className={(upOrBookOrShared=='save')?'selected':'notselected'}>Saved</div>
                    <div onClick={()=>{setUpOrBookOrShared('share');setStories([]);}} className={(upOrBookOrShared=='share')?'selected':'notselected'}>Shared</div>
                    <div onClick={()=>{setUpOrBookOrShared('book');setStories(bookmarkedStories);}} className={(upOrBookOrShared=='book')?'selected':'notselected'}>Bookmarked</div>
                    <div style={{display:'flex'}}><span>Sort by</span><span className="filter">Tags</span></div>
        </div>  
        <div className="Bookmark">
                {stories.map((i)=>{
                    return(
                    <div class="book-item" onClick={()=>GoToOneStory(i)}>
                        <img src={i["thumbnail"]}  alt="cover"/>
                        <div className="Title">
                                {i["story"].split(/\r?\n/)[0].replace("Title:","").substr(0,18)}
                                <span style={{fontSize:"14px",color:"grey"}}>
                                    {i["story"].split(/\r?\n/)[0].replace("Title:","").length>18?(<>...</>):(<></>)}
                                </span>
                        </div>
                        <div className="Stats">
                            <div><RemoveRedEyeIcon sx={{fontSize:"14px"}}/>{i["views"].length}</div> 
                            <div><FavoriteBorderIcon sx={{fontSize:"14px"}}/>{i["upvotes"].length}</div></div>
                        <div className="hash">{i.tags.map((j)=>{return(<div className='hash1'>#{j}</div>)})}</div>
                    </div>
                )})
                }  
                {stories.length==0 ? (<div>No stories</div>):null}                 
        </div>


        <div className="PnC">
            <div className="Publish">
                <div className="PublishLeft">
                   <div> Publish your stories<br/>and reach millions.</div>
                   <div onClick={GoToForm}>Publish a story</div>
                </div>
                <div className="PublishRight">
                    <img src={'https://miro.medium.com/v2/resize:fit:1400/1*9xjTtoyLB-c0f9HmrUfScg.gif'}/>
                </div>
            </div>
            <div className="Continue">
                <div className="ContinueLeft">
                   <div>Continue a chain and <br/> make it better.</div>
                   <div>Continue a story</div>
                </div>
                <div className="ContinueRight">
                    <img src={'https://miro.medium.com/v2/resize:fit:1400/1*9xjTtoyLB-c0f9HmrUfScg.gif'}/>
                </div>
            </div>
        </div>

    </div>
  )
}

export default Home