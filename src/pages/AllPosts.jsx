import React,{useState, useEffect} from 'react'
import appwriteService from '@/appwrite/config'
import { Container, PostCard } from '@/components/index.js'

function AllPosts() {
    const [posts, setPosts]=useState([]);
    useEffect(()=>{},[]);

    appwriteService.getPosts([]).then((posts)=>{
        if(posts){
            setPosts(posts.documents)
        }
    })
    
  return (
    <>
        <div className='flex flex-wrap '>
            {
                posts.map((post)=>(
                    <div key={post.$id}>
                    <PostCard  post={post}/>
                    </div>
                ))
            }
        </div>
    </>
  )
}

export default AllPosts