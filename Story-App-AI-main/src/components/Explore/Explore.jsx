import React, { useEffect, useState } from 'react'
import './explore.css'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';
import AddCircleOutlineRoundedIcon from '@mui/icons-material/AddCircleOutlineRounded';


const Explore = () => {
    const [exploreStories,setExploreStories]=useState([]);
    const [eee,setEee]=useState(false);
    const[filteredStories,setFilteredStories]=useState(exploreStories);

    useEffect(()=>{
        /*not async so we have to use Another FN**** which is async */
        getStories();
    },[]);   
    
    const getStories=async()=>{
        await axios.get("https://story-app-api.vercel.app/api/stories")
        .then((res)=>{
            for(const key in res.data){
               exploreStories.push(res.data[key])/********convert object to array */
            }   
           console.log("ExploreStories=",exploreStories);
           setEee(true);   //************refresh ui********* */
        })
    }


    const navigate=useNavigate();
    const GoToHome=()=>{navigate('/home')}
    const GoToForm=()=>{navigate('/story')}
    const GoToExplore=()=>{navigate('/explore')}
    const GoToLeader=()=>{navigate('/leaderboard')}
    const GoToLogin=()=>{navigate('/')}
    const GoToYou=()=>{navigate('/you')}

    const GoToOneStory=(item)=>{
        navigate('/onestory');
        localStorage.setItem('selectedStoryId',item._id);
        localStorage.setItem('selectedStory',item.story);
        localStorage.setItem('selectedStoryUp',item.upvotes);
        localStorage.setItem('selectedStoryView',item.views);
        localStorage.setItem('selectedStoryImg',item.thumbnail);
        localStorage.setItem("selectedStoryHash",item.tags);
    }

    var[selectedTags,setSelectedTags]=useState([]);
    var[unselectedTags,setUnselectedTags]=useState(["comedy","mystery","adventure","fantasy","historical","horror","thriller","cyberpunk","romance"]);

    const FilterHelper=async()=>{
        var flag=0;
        for(let onestory of exploreStories){
            flag=0;
            for (let Onetag of selectedTags) {/**checking if selected filters array is a perfect subarray of this story's tags */
                if(!onestory.tags.includes(Onetag)) {
                 flag=1;
                 break;
                }
            }
            if(flag===0){
              setFilteredStories(filteredStories=>[...filteredStories,onestory]);
            }
         }
        console.log("FILTERED STORIES after",filteredStories.length,selectedTags);
    }
    const FilterHelper2=async(j)=>{
        console.log(j);
        selectedTags=([...selectedTags,j]);/*********havee to mnaully upadte State since it is async so doesnt show filtered stories */
        setSelectedTags(selectedTags);
        unselectedTags=(unselectedTags=>unselectedTags.filter((oneTag)=>{return !(oneTag===j)}));
        setUnselectedTags(unselectedTags)
        setFilteredStories([]);
        console.log("FILTERED STORIES before",filteredStories.length,selectedTags,"**");
    }
    const FilterSelect=async(j)=>{
        await  FilterHelper2(j);
        await  FilterHelper();
    }

    function FilterUnselect(j){/*ON SELECTING A FILTER, SET SELECETD ARRAY TO REMOVE THIS ELEMENT AND PUSH ELEMENT INTO UNSELECTED ARRAY
                                      THEN , GET ALL STORIES AND FILTER THE STORIES BASED ON SELECTED FILTER ARRAY.I.E. SelectedTags  */
        unselectedTags=unselectedTags=>[...unselectedTags,j];
        setUnselectedTags(unselectedTags);/** ADDING TO UNSELECTED FILTER LIST */
        selectedTags=(selectedTags.filter((oneTag)=>{return !(oneTag===j)}));
        setSelectedTags(selectedTags)/**REMOVING FROM SELECTED FILTERS LIST */
        setFilteredStories([]);
        console.log("FILTERED STORIES before",filteredStories.length,selectedTags);
        FilterHelper();
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


        <div>       
            <div  className='Themes' style={{display:'flex',alignItems:"center"}}>
                <div style={{marginRight:"20px"}} className="ThemesTitle"> Themes & Tones{"  "}</div>
                <div className="EEhashh">
                    {selectedTags.map((j)=>{return(
                        <div className='EEhash2'
                             onClick={()=>FilterUnselect(j)}>
                            <CancelRoundedIcon sx={{fontSize:"14px",marginRight:"3px"}}/>
                            {j}
                        </div>)})}
                </div>
                <div className="EEhashh">
                    {unselectedTags.map((j)=>{return(
                    <div className='EEhash3'
                    onClick={()=> FilterSelect(j)}>
                        {j}
                        <AddCircleOutlineRoundedIcon sx={{fontSize:"14px",marginLeft:"3px"}}/>
                    </div>)})}
                </div>
            </div>   


            <div className="EEUnderline">
                <div>Explore {"   "} ({filteredStories.length})</div>  
                
                <div style={{display:'flex'}}><span>Sort by</span><span className="EEfilter">Latest</span></div>
            </div>  

            <div className="EEExplore">
            {filteredStories.length > 0 ? ( 
                    filteredStories.map((item,id)=>
                    (
                    <div key={id} className="EEgrid-item" onClick={()=>GoToOneStory(item)}>
                        <img src={item["thumbnail"]} alt="EEcover"/>
                        <div className="EETitle">
                            {item["story"].split(/\r?\n/)[0].replace("Title:","").substr(0,26)}
                            <span style={{fontSize:"14px",color:"grey"}}>
                                {item["story"].split(/\r?\n/)[0].length>26?(<>...</>):(<></>)}
                            </span>
                        </div>
                        <div className="EEStats">
                            <div><RemoveRedEyeIcon sx={{fontSize:"14px"}}/>{item["views"].length}</div> 
                            <div><FavoriteBorderIcon sx={{fontSize:"14px"}}/>{item["upvotes"].length}</div></div>
                        <div className="EEhash">{item["tags"].map((j)=>{return(<div className='EEhash1'>#{j}</div>)})}</div>
                    </div>
                    )))
                    :(
                        <div>Fetching stories</div>
                    )
            }                   
            </div>
            </div>
    </div>
  )
}

export default Explore