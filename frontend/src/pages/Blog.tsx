import { Appbar } from "../components/Appbar";
import { FullBlog } from "../components/Fullblog";
import { Spinner } from "../components/Spinner";
import {useBlog} from "../hooks";
import { useParams } from "react-router-dom";
export const Blog=()=>{
    const { id } = useParams();
    const { loading,blog }=useBlog({
        id:id || ""
    });
    if(loading|| !blog){
        return <div>
            <Appbar></Appbar>
            <div className="h-screen flex flex-col justify-center">
            <div className="flex justify-center">
            <Spinner></Spinner>
            </div>
            
        </div>
        </div>
        
    }
    return <div>
       <FullBlog blog={blog}></FullBlog>
    </div>
}