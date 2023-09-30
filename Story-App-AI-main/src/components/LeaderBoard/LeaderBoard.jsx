import React from 'react'
import './leaderboard.css'
import ExpandCircleDownIcon from '@mui/icons-material/ExpandCircleDown';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react'


const LeaderBoard = () => {
    const [leadStories,setLeadStories]=useState([]);
    const [eee,setEee]=useState(false);
    useEffect(()=>{
        /*not async so we have to use Another FN**** which is async */
        getStories();
    },[]);
    
    const getStories=async()=>{
        await axios.get("https://story-app-api.vercel.app/api/stories/topten")/*get reponse type as arrayBuffer to convert  non friendly response to base64 encoded */
        .then((res)=>{
            for(const key in res.data){
               leadStories.push(res.data[key])
            }   
           console.log("LeadStories=",leadStories);
           setEee(true);   //********************* */
        })
    }

    const navigate=useNavigate();
    const GoToHome=()=>{navigate('/home')}
    const GoToForm=()=>{navigate('/story')}
    const GoToExplore=()=>{navigate('/explore')}
    const GoToLeader=()=>{navigate('/leaderboard')}
    const GoToLogin=()=>{navigate('/')}
    const GoToYou=()=>{navigate('/you')}

  return (
    <div>
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


        <div className="LLLeader">
                <div className="LLUnderline2">LeaderBoard</div>  
                <div className="Leaders">
                {leadStories.map((i,index)=>{
                return(
                    <div className="LLleaderStories">
                        <div>{index+1}</div>
                        <img src={i["thumbnail"]}  alt="LLcover"/>
                        <div>
                            <div className="LLTitle">
                                {i.story.split(/\r?\n/)[0].replace("Title:","").substring(0,40)}
                                {i.story.split(/\n/)[0].replace("Title","").length>40? <>...</>:<></>}
                            </div> 
                            <div className="LLSubTitle">({" "}
                                {i.prompt.substring(0,40)}
                                {i.prompt.length>40? <>...</>:<></>}{" "})
                            </div> 
                            <div className="LLStats">
                                <div><FavoriteBorderIcon sx={{fontSize:"14px"}}/>{i.upvotes.length}</div>
                                <div><RemoveRedEyeIcon sx={{fontSize:"14px"}}/>{i.views.length}</div>
                            <div className="LLhash">{i.tags.map((j)=>{return(<div className='LLhash1'>#{j}</div>)})}</div></div>
                        </div>
                    </div>
                )
                })}
                </div>
        </div>

    </div>
    </div>
  )
}

export default LeaderBoard