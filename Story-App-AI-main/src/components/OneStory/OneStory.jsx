import React, { useEffect, useState } from 'react'
import './onestory.css'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import AddIcon from '@mui/icons-material/Add';
import BookmarkBorderRoundedIcon from '@mui/icons-material/BookmarkBorderRounded';
import LabelOutlinedIcon from '@mui/icons-material/LabelOutlined';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import axios from 'axios';
import BookmarkRoundedIcon from '@mui/icons-material/BookmarkRounded';
import SendRoundedIcon from '@mui/icons-material/SendRounded';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OneStory = () => {
    const[voteIds,setVoteIds]=useState();
    const Vote=async()=>{
        const votes=localStorage.getItem('selectedStoryUp').split(",");
        if(votes.includes(localStorage.getItem('email'))){
            setVoteIds(true);
        }
        else{
            await axios.post("https://story-app-api.vercel.app/api/stories/upvote",
                             {
                                storyid:localStorage.getItem('selectedStoryId'),
                                userid:localStorage.getItem('email')
                             }
            )
            .then((res)=>{
                localStorage.setItem("selectedStoryUp",[...localStorage.getItem('selectedStoryUp').split(","),localStorage.getItem('email')])
                setVoteIds(true);})

            /***********ALSO POST TO YOUR BOOKMARKS */
            await axios.post("https://story-app-api.vercel.app/api/bookmarks/bbupvote",
            {
               storyid:localStorage.getItem('selectedStoryId'),
               userid:localStorage.getItem('email')
            }
            ).then((res)=>{
                console.log("saved in your bookmarks",res.data)
            })

        }
    }
    const DownVote=async()=>{
        const votes=localStorage.getItem('selectedStoryUp').split(",");
        if(votes.includes(localStorage.getItem('email'))){
            await axios.post("https://story-app-api.vercel.app/api/stories/downvote",
                             {
                                storyid:localStorage.getItem('selectedStoryId'),
                                userid:localStorage.getItem('email')
                             }
            )
            .then((res)=>{
                localStorage.setItem('selectedStoryUp',localStorage.getItem('selectedStoryUp').replace(localStorage.getItem('email')+",",""))
                localStorage.setItem('selectedStoryUp',localStorage.getItem('selectedStoryUp').replace(","+localStorage.getItem('email'),""))
                setVoteIds(false);})
                
            /***********ALSO remove from  YOUR BOOKMARKS */
            await axios.post("https://story-app-api.vercel.app/api/bookmarks/downvote",
            {
                storyid:localStorage.getItem('selectedStoryId'),
                userid:localStorage.getItem('email')
            }
            ).then((res)=>{
                console.log("removed from your bookmarks",res.data)
            })
        }
    }

    const[bookIds,setBookIds]=useState();
    const CheckBookmark=async()=>{
        axios.post("https://story-app-api.vercel.app/api/bookmarks/getBookmarks",                             {
            storyid:localStorage.getItem('selectedStoryId'),
            userid:localStorage.getItem('email')
         })
        .then((res)=>{
            console.log("checked for bookmarks for this story and this user",res)
           if(res.data.bookmarks==null){setBookIds(false)}
           if(res.data.bookmarks.includes(localStorage.getItem("selectedStoryId"))){
               setBookIds(true);
           }
           else{
               setBookIds(false);
           }
        })     
    }
    
    const Book=async()=>{
            await axios.post("https://story-app-api.vercel.app/api/bookmarks/book",
                             {
                                storyid:localStorage.getItem('selectedStoryId'),
                                userid:localStorage.getItem('email')
                             }
            )
            .then((res)=>{
                setBookIds(true);
            })
    }

    const UnBook=async()=>{
        await axios.post("https://story-app-api.vercel.app/api/bookmarks/unbook",
                         {
                            storyid:localStorage.getItem('selectedStoryId'),
                            userid:localStorage.getItem('email')
                         }
        )
        .then((res)=>{
            setBookIds(false);
        })
}

    const[tagIds,setTagIds]=useState(false);
    const[selectedTag,setSelectedTag]=useState('comedy');
    
    const Tag=async()=>{
        console.log("Added TAG===",selectedTag.toString())
        await axios.post("https://story-app-api.vercel.app/api/stories/tag",
                         {
                            storyid:localStorage.getItem('selectedStoryId'),
                            userid:localStorage.getItem('email'),
                            tag:selectedTag,
                         }
        )
        .then((res)=>{
            if(localStorage.getItem("selectedStoryHash").split(",").includes(selectedTag)){}
            else{
            localStorage.setItem("selectedStoryHash",[localStorage.getItem("selectedStoryHash").split(","),selectedTag]);
            }
            toast.success('Added tag');
            setTagIds(false);
        })
    }

    useEffect(()=>{
        const votes=localStorage.getItem('selectedStoryUp').split(",");
        if(votes.includes(localStorage.getItem('email'))){
            setVoteIds(true);
        }
        CheckBookmark();
    },[]);

    const navigate=useNavigate();
    const GoToHome=()=>{navigate('/home')}
    const GoToForm=()=>{navigate('/story')}
    const GoToExplore=()=>{navigate('/explore')}
    const GoToLeader=()=>{navigate('/leaderboard')}
    const GoToLogin=()=>{navigate('/')}
    const GoToYou=()=>{navigate('/you')}
    const GoToOneStory=()=>{navigate('/onestory')}

    const exploreStories={story:localStorage.getItem('selectedStory')
                          ,up:localStorage.getItem('selectedStoryUp').split(",")
                          ,view:localStorage.getItem('selectedStoryView').split(",")
                          ,hashtags:localStorage.getItem('selectedStoryHash').split(',')
                          ,img:localStorage.getItem('selectedStoryImg')
                        }

  return (
    <div>
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

        <ToastContainer/>

        <div>
            <div className="OSUnderline"></div>  
            <div className='VoteComment'>
                {!voteIds ? (<><span><FavoriteBorderIcon sx={{fontSize:"28px"}}  onClick={Vote}/></span><div className='name' style={{marginTop:"-65px",marginLeft:"-30px"}}>Vote</div></>)
                :
                (<><span><FavoriteIcon sx={{fontSize:"28px",color:"red"}}  onClick={DownVote}/></span><div className='name' style={{marginTop:"-65px",marginLeft:"-30px"}}>Vote</div></>)
                }
                {!tagIds ? (<><span><LabelOutlinedIcon sx={{fontSize:"30px"}}  onClick={()=>setTagIds(true)}/></span><div className='name' style={{marginTop:"-65px",marginLeft:"-52px"}}>Add Tag</div></>)
                :
                (<><span>
                    <select name="genre" id="genre" className='select' onChange={(e)=>{setSelectedTag(e.target.value)}}>
                        <option value="comedy" className='option'>#comedy</option>
                        <option value="mystery" className='option'>#mystery</option>
                        <option value="adventure" className='option'>#adventure</option>
                        <option value="fantasy" className='option'>#fantasy</option>
                        <option value="historical" className='option'>#historical</option>
                        <option value="horror" className='option'>#horror</option>
                        <option value="thriller" className='option'>#thriller</option>
                        <option value="cyberpunk" className='option'>#cyberpunk</option>
                        <option value="romance" className='option'>#romance</option>
                    </select>
                    <SendRoundedIcon sx={{fontSize:"25px",color:"blue",marginLeft:"6px"}}  onClick={Tag}/></span><span className='name' style={{marginTop:"-65px",marginLeft:"-30px"}}></span></>)
                }
                <span><ChatBubbleOutlineOutlinedIcon sx={{fontSize:"28px"}}  /></span><div className='name' style={{marginTop:"-65px",marginLeft:"-62px"}}>Comment</div>
                {!bookIds ? (<><span><BookmarkBorderRoundedIcon sx={{fontSize:"30px"}} onClick={Book} /></span><div className='name' style={{marginTop:"-65px",marginLeft:"-60px"}}>Bookmark</div></>)
                :
                (<><span><BookmarkRoundedIcon sx={{fontSize:"30px",color:"blue"}} onClick={UnBook} /></span><div className='name' style={{marginTop:"-65px",marginLeft:"-60px"}}>Bookmark</div></>)
                }
            </div>

            <div className="OSExplore">
                    <div className="OSgrid-item" onClick={GoToOneStory}>
                     <div>
                        <img src={exploreStories.img}  alt="OScover"/>
                        <div className="OSStats">
                            <div><RemoveRedEyeIcon sx={{fontSize:"20px"}}/>{exploreStories.view.length}</div> 
                            <div><FavoriteBorderIcon sx={{fontSize:"20px"}}/>{exploreStories.up.length}</div>
                            <div><ModeCommentIcon sx={{fontSize:"19px"}}/>{exploreStories.up.length}</div>
                        </div>
                        <div className="OShash">{exploreStories.hashtags.map((j)=>{return(<div className='OShash1'>#{j}</div>)})}</div>

                     </div>

                     <pre style={{fontSize:"18px",fontFamily:"Varela Round",whiteSpaceCollapse:"break-spaces",
                     textWrap:"balance",margin:"20px 0px",width:"76vw",textAlign:"justify",lineHeight:"24px",marginLeft:"26vw",
                     height: "37vw",overflow: "scroll",overflowX:"clip",paddingRight:"47px"}} className='LargeScreenStory'>
                        <span style={{marginLeft: "15vw"}}></span>
                         {exploreStories.story}
                     </pre>
                     <div className='smallScreenStory'>
                     <pre style={{fontSize:"16px",fontFamily:"Varela Round",whiteSpaceCollapse:"break-spaces",
                     margin:"20px 0px",textAlign:"justify",lineHeight:"19px",marginLeft:"2vw"
                     ,background:"lavender",whiteSpace:"break-spaces"}}>
                        <span style={{marginLeft: "15vw"}}></span>
                         {exploreStories.story}
                     </pre>
                     </div>
                    </div>
            </div>
            </div>
    </div>
  )
}

export default OneStory