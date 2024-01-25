import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';



const Menu = ({cat}) => {

  const [posts,setPosts] = useState([])
  
  useEffect(()=>{
    const fetchData = async()=>{
      try{
        const res= await axios.get(`http://localhost:8800/api/posts/?cat=${cat}`)
        setPosts(res.data)
      }catch(err){
        console.log(err)
      }
    };
    fetchData();
  },[cat])

   /* const  posts=[
        {
          id: 1,
          title: "Lactus urna duis convallis convallis tellus id",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque in hac habitasse platea dictumst. Praesent ac quam sem. Phasellus et justo laoreet, semper nibh vitae, tincidunt eros. Sed a nulla nec metus ultrices rutrum. Curabitur a mi at leo lacinia rutrum.",
          img: "https://images.pexels.com/photos/2325446/pexels-photo-2325446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: 2,
          title: "Erat nam at lectus urna duis convallis convallis tellus id",
          desc: "Nunc rhoncus diam a risus ultricies, non tristique dui tristique. Nam eu eros vel ipsum scelerisque porta. Donec nec mi ut odio ultricies suscipit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
          img: "https://images.pexels.com/photos/461940/pexels-photo-461940.jpeg?auto=compress&cs=tinysrgb&w=600"
        },
        {
          id: 3,
          title: "Faucibus et molestie ac feugiat sed lectus vestibulum ",
          desc: "Aenean ultricies ligula ac nunc elementum, ac tempus lectus tincidunt. Nulla gravida risus velit, non egestas turpis laoreet nec. Sed a tortor libero. Mauris in velit sed magna vestibulum elementum.",
          img: "https://images.pexels.com/photos/919606/pexels-photo-919606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: 4,
          title: "Condimentum id venenatis a condimentum vitae sapien pellentesque habitant morbi",
          desc: "Mauris eget tellus ut mi placerat tristique. Nullam ac risus eget felis lobortis scelerisque. In in justo vel mi tincidunt ullamcorper. Morbi id erat vitae augue aliquam aliquam.",
          img: "https://images.pexels.com/photos/18285170/pexels-photo-18285170/free-photo-of-dalas.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        },
        {
          id: 5,
          title: "Sed lectus vestibulum mattis ullamcorper velit ",
          desc: "Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce sit amet risus nibh. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.",
          img: "https://images.pexels.com/photos/18129473/pexels-photo-18129473/free-photo-of-a-group-of-women-posing-on-a-grass-field.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
      ]*/
  return (
    <div className='menu'>
        <h1>Other posts in {cat} you may like</h1>
        {posts.map(post=>(
            <div className='post' key={post.id}>
                <img src={`../../uploads/${post.img}`} alt=""/>
                <h2>{post.title}</h2>
                <Link className='link' to={`/post/${post.id}`}> <button>Read More</button></Link>
            </div>
        ))}
    </div>
  )
} 

export default Menu