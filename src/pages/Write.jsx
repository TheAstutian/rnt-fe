import React, {useState,useContext, useEffect} from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import moment from 'moment';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import { API_URL } from '../App';

const Write = () => {
  const state = useLocation().state
  const [value, setValue] = useState(state?.desc ||'');
  const [title, setTitle] = useState(state?.title ||'');
  const [file, setFile] = useState(state?.img||null);
  const [cat, setCat] = useState(state?.cat ||"");
  const [blurb, setBlurb] = useState(state?.blurb ||'');

  const {currentUser}= useContext(AuthContext)
  
  useEffect(()=>{
    
    console.log('useEffect file ', file)

    const updateImage = async()=>{
      if (state){
        if(file.name){
        const png=  await upload()
        await setFile(png)
        }
      }
    }
    updateImage()

  },[file])

  const navigate = useNavigate()

const upload= async ()=>{
  try{
    if(!file) 
    {return null
    } else if(file.name){
      const formData = new FormData();
      formData.append("file",file)
      const res = await axios.post(`${API_URL}/api/upload`, formData)
      console.log("upload response ", res)
      return res.data  
    }
    else return null
  }catch(err){
    console.log(err)
  }
}


const handleClick = async e=>{
  e.preventDefault()

 if(state){

 await axios.put(`${API_URL}/api/posts/${state.id}`, {

      title, 
      desc: value,
      cat,
      blurb,
      img: file,
      id: currentUser.id,
    })
    alert("Post updated.")
    navigate(`/post/${state.id}`)
  
    
  } else {
    
    const imgUrl = await upload()
    await axios.post(`${API_URL}/api/posts/`, {
      title,
      desc:value,
      cat,
      blurb,
      img: file? imgUrl: "",
      id: currentUser.id,
      date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
    })
    alert("New post created")
     navigate('/')
  }
    

}

  
  return (
    <div className='add'>
      <div className="content">
        <input type="text" placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)}/>
        <textarea type="text" style={{height:"60px", padding: "10px",font:"serif",}} placeholder='Blurb' value={blurb} onChange={e=>setBlurb(e.target.value)}/>
        <div className="editorContainer">
        <ReactQuill className='editor' theme="snow" value={value} onChange={setValue} />
        </div> 
      </div>
      <div className="menu">
        <div className="item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b> Draft
          </span>
          <span>
            <b>Visibility:</b> Public
          </span>
          <input style={{display:"none"}} type='file' name='' id="file" onChange={e=>setFile(e.target.files[0])}/>
          <label className='file' htmlFor='file'>{file? "Change image" : "Add Image" }</label>
          <div className="buttons">
            
            <button onClick={handleClick}> Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">
          <input type='radio' name="cat" checked={cat==="art"} value="art" id="art" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='art'>Art</label>
          </div>
          <div className="cat">
          <input type='radio' name="cat" checked={cat==="science"} value="science" id="science" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='science'>Science</label>
          </div>
          <div className="cat">
          <input type='radio' name="cat" checked={cat==="technology"} value="technology" id="technology" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='technology'>Technology</label>
          </div>
          <div className="cat">
          <input type='radio' name="cat" checked={cat==="design"} value="design" id="design" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='design'>Design</label>
          </div>
          <div className="cat">
          <input type='radio' name="cat" checked={cat==="food"} value="food" id="food" onChange={e=>setCat(e.target.value)}/>
          <label htmlFor='food'>Food</label>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Write