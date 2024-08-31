import React, {useState, useEffect} from 'react'
import { Container, PostForm } from '@/components/index.js'
import appwriteService from "@/appwrite/config"
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
    const [post, setPost]= useState(null);
    const {slug}=useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(slug){
            appwriteService.getPost(slug).then((post)=>{
                if(post){
                    setPost(post);
                    // console.log("in editpost");
                    
                    // console.log(post)
                }
            })
        }
        else {
            navigate('/')
        }
    },[slug, navigate])
    // console.log("post val is ");
    // console.log({post});
    
    // console.log("Slug val is "+slug);
    
    return post?(
        
        <PostForm post={post}/>
    ):null;
  
}

export default EditPost