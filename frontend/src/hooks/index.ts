import { useEffect, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";
interface Blog{
    
        "content": string,
        "title": string,
        "id": number,
        "author": {
            "name": string
        }
    
}

export const  useBlogs=()=>{
    const [loading,setLoading]=useState(true);
    const [blogs,setBlogs]=useState<Blog[]>([]);

    useEffect(()=>{
        const rawToken = localStorage.getItem("token");
        //@ts-ignore
        const parsedToken = JSON.parse(rawToken); 
        const jwtToken = parsedToken.jwt;
            axios.get(`${BACKEND_URL}/api/v1/blog/bulk`,{
                headers:{
                    Authorization:jwtToken
                }
            })
            .then(response=>{
                setBlogs(response.data.blogs)
                console.log("data",response.data)
                setLoading(false);
            })
        
        
        
    },[])

    return {
        loading,
        blogs
    }
}