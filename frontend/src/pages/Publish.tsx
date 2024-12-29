import { ChangeEvent, ChangeEventHandler, useState } from "react"
import { Appbar } from "../components/Appbar"
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("")
    const navigate = useNavigate();

    const rawToken = localStorage.getItem("token");
        //@ts-ignore
        const parsedToken = JSON.parse(rawToken); 
        const jwtToken = parsedToken.jwt;

    return <div>
        <Appbar></Appbar>
        <div className="flex justify-center w-full">
            <div className="max-w-screen-md w-full pt-5">
                <input onChange={(e)=>{
                    setTitle(e.target.value)
                }} type="text" className="w-full bg-gray-50 
     border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none  focus:ring-blue-500
      focus:border-blue-500 block w-full p-2.5 dark:text-white" placeholder="Title" required />
      <TextEditor onChange={(e)=>{
        setContent(e.target.value)
      }}/>
      <button onClick={async ()=>{
        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
            title,
            content
        },
        {
            headers:{
                Authorization:jwtToken
            }
        }
    )
    navigate(`/blog/${response.data.id}`)
      }} type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200  hover:bg-blue-800">
       Publish post
   </button>

            </div>


        </div>

    </div>
}
function TextEditor({onChange}:{onChange:(e:ChangeEvent<HTMLTextAreaElement>)=>void}) {
    return <div>
        <div className="px-4 py-2 bg-white rounded-b-lg dark:bg-gray-800">
          
           <textarea  rows={8} className="block w-full focus:outline-none px-0 text-sm text-gray-800 bg-white border-0  focus:ring-0 " placeholder="Write an article..." required ></textarea>
       </div>
   
   


    </div>

}