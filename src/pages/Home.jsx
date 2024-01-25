import React, { useEffect, useState } from 'react';
import {Link, useLocation} from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../App';

const Home = () => {
  
  
  const getText = (html)=>{
    const doc = new DOMParser().parseFromString(html, "text/html")
    return doc.body.textContent
  }


  const [posts,setPosts] = useState([])

  const cat = useLocation().search
  
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res= await axios.get(`${API_URL}/api/posts${cat}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  },[cat])
  //sort post items by date
  const sortedPosts = posts.sort(function compare(a,b){
    var dateA = new Date(a.date);
    var dateB = new Date (b.date);
    return dateB - dateA
  } )

   
  return (
    <div className='home'>
      <div className="posts">
        {sortedPosts.map((post)=>(
          <div className="post" key={post.id}>
            <div className="img">
              <img src={`../../uploads/${post.img}`} alt=''/>
            </div>
            <div className="content">
              <Link className='link' to={`/post/${post.id}`}>
              <h1>{post.title}</h1>
              <p>{getText(post.blurb)}</p>
              <button>ReadMore</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Home