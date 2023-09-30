import React,{useState} from 'react';
import OpenAI from 'openai';
import './story.css'
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CloudinaryUploadWidget from '../CloudinaryUploadWidget';

const Story = () => {

  const navigate=useNavigate();
  const [thumb,setThumb]=useState(false);

  async function PublishStory(){
    setThumb(true);
    console.log(localStorage.getItem("publishedThumbnail"))

    if(localStorage.getItem("publishedThumbnail")!=null){
      const newStory={"pics":localStorage.getItem("publishedThumbnail").toString(),
      "prompt":prompt,
      "story":story,
      "user":localStorage.getItem('email').toString()
    }
    console.log("FROMDATA===+++",newStory);
    await axios.post("https://story-app-api.vercel.app/api/stories",newStory)
    .then((res)=>{
      console.log("new story=",res.data);
      localStorage.removeItem("publishedThumbnail");
      setTimeout(()=>{navigate('/explore')},3000);
      toast.success('Published');
     });
  }
    else{
       (alert("SET THUMBNAIL BEFORE PUBLISHING"));
       console.log("FORMData newstory===")
    }
   
  }


  const GoToHome=()=>{navigate('/home')};const GoToForm=()=>{navigate('/story')}
  const GoToExplore=()=>{navigate('/explore')};const GoToLeader=()=>{navigate('/leaderboard')};const GoToLogin=()=>{navigate('/')};const GoToYou=()=>{navigate('/you')}

  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);
  const openai = new OpenAI({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY, // defaults to process.env["OPENAI_API_KEY"]
    dangerouslyAllowBrowser: true 
  });

  const generateStory = async (prompt) => {
    setLoading(true);
    const chatCompletion = await openai.chat.completions.create({
      messages: [{ role: 'user', content: `Create a 1000 word story starting with ${prompt} and title it` }],
      model: 'gpt-3.5-turbo',
    });
    console.log(chatCompletion);
    var target=chatCompletion.choices[0].message.content
    console.log(target);
    setStory(target);
    localStorage.setItem(`story+${Date.now()}`,target)
    setLoading(false);
  };


  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    generateStory(prompt);
  };

  return (
     loading==true?
     <>

      <div className="Navbar">
          <div className="Nav"><img src={"https://cdn.dribbble.com/users/7265710/screenshots/16491924/media/ec1722eab30133eadf8fb47b7391335f.jpg?resize=400x300&vertical=center"}/></div>
          <div className="Nav">Home</div>
          <div className="Nav" onClick={GoToExplore}>Explore</div>
          <div className="Nav" onClick={GoToLeader}>LeaderBoard</div>
          <div className="Nav" onClick={GoToYou}>You</div>
          <div className="Nav" onClick={GoToForm}>Publish</div>
          <div className="Nav" onClick={GoToLogin}>Logout</div>
          <div className="Nav"><SearchIcon/></div>
      </div>

      <div className='preloader'>
      Generating story...
      <img src={'https://cdn.dribbble.com/users/42048/screenshots/8350927/robotintro_dribble.gif'}></img>
      </div>
    </>
      :
    <>       
    <ToastContainer/>
    <div className="Navbar">
     <div className="Nav"><img src={"https://cdn.dribbble.com/users/7265710/screenshots/16491924/media/ec1722eab30133eadf8fb47b7391335f.jpg?resize=400x300&vertical=center"}/></div>
     <div className="Nav" onClick={GoToHome}>Home</div>
     <div className="Nav">Explore</div>
     <div className="Nav">LeaderBoard</div>
     <div className="Nav">You</div>
     <div className="Nav" >Publish</div>
     <div className="Nav">Logout</div>
     <div className="Nav"><SearchIcon/></div>
    </div>
    <div className="GeneratedStory">
      <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Enter your story prompt here..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        GENERATE AI STORY
      </button>
    </form>
      <pre style={{fontSize:"18px",display:"block",fontFamily:"Varela Round",whiteSpaceCollapse:"break-spaces",textWrap:"balance",margin:"20px 0px",width:"76vw",textAlign:"justify",lineHeight:"20px"}}>
      <span style={{marginLeft: "28vw"}}></span>
      {story}
      </pre>
      {story!=''?
      <>    {thumb?
      <div className='Thumbnail'>
         <div>Set Thumbnail</div>
         <div><div>Step <span className='num'>1</span>
                 Click
                 <a target="_blank" rel="noreferrer" href="https://www.freepik.com/ai/image-generator"> here</a> or
                 <a target="_blank" rel="noreferrer" href="https://gencraft.com/generate"> here</a> and enter title of story</div></div>
         <div><div>Step <span className='num'>2</span> Download a thumbnail of your choice</div></div>
         <div><div>Step <span className='num'>3</span> Drop Thumbnail in box below</div></div> 
         <div className="file">
            Drop or Upload Thumbnail here
            <CloudinaryUploadWidget/>
         </div>
         <div><div>Step <span className='num'>4</span> Publish the story</div></div>         
      </div>
      :null
      }
      <div className='publish' onClick={PublishStory}>PUBLISH STORY</div>

  

      </>

      : null
      }
    </div>
    </>
  
  );
};

export default Story;