import React, {useState, useContext, useEffect } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Edit from '../img/edit.png';
import Delete  from '../img/delete.png';
import Menu from '../components/Menu';
import moment from 'moment';
import { AuthContext } from '../context/authContext';
import axios from 'axios';
import parse from 'html-react-parser';
import { API_URL } from '../App';

const Single = () => {

  const [post,setPost] = useState([])

  const location = useLocation()
  const postId = location.pathname.split("/")[2]
  const {currentUser}= useContext(AuthContext)
   const navigate = useNavigate()
   
   const getText =  (html)=>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    
    return doc.body.textContent
  }

  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res= await axios.get(`${API_URL}/api/posts/${postId}`)
        setPost(res.data)
        console.log(res.data)
        window.scrollTo(0, 0)
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  },[postId])

  const handleDelete = async()=>{
    const alert= confirm('Do you want to delete this article?')
    if(alert){
      
      try{
        await axios.delete(`${API_URL}/api/posts/${postId}`)
        navigate('/')
      
     }catch(err){
       console.log(err)
     }
     
    }
  }

  return (
    <div className='single'>
      <div className="content">
        <img src={post.img? `${post.img}`: null} alt='' />
        
        <div className="user">
          {post.userImg&&<img src={post.userImg} alt=''/>}

      
        <div className="info">
          <span>By {post.username}</span>
          <p>Posted {moment(post.date).fromNow()} in <b>{post.cat}</b></p>
          </div>

        {currentUser? 
          (currentUser.username===post.username?  
            <div className="edit">
            <Link to={`/write?edit=2`} state={post}>
              <img src={Edit} alt="" />
            </Link>
            <img onClick={handleDelete} src={Delete} alt="" />        
          </div>
          :
          <></>)
          :<></>

        }

        </div>

        <h1>{post.title}</h1>
        <div>
        {parse(`${post.body}`)}
        </div>
        
      </div>
      
      <div className="menu">
        <Menu cat={post.cat}/> 
        
      </div>

    </div>
  )
}

export default Single