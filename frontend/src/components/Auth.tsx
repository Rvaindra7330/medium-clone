import { SignupInput } from "@rdevs/medium-common";
import { ChangeEvent, useState } from "react";
import { Link,useNavigate } from "react-router-dom"
import axios from "axios";
import { BACKEND_URL } from "../config";
export const Auth=({type}:{type:"signup"|"signin"})=>{
    const navigate=useNavigate();
    const [postInputs,setPostInputs]=useState<SignupInput>({
        name:"",
        email:"",
        password:""
    })
    async function sendRequest(){
        try{
            const response= await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs,
                {
                    headers:{
                        'Content-Type':'application/json'
                    }
                }
            );
            console.log('response:',response.data)
            const jwt=response.data;
            localStorage.setItem("token",jwt);
            alert("received token")
            navigate("/blogs")
        }catch(e){
            alert("error while signing up")
        }
       
       
    }
    
    return <div className="flex justify-center flex-col h-screen">
        <div className="flex justify-center">

        
        <div>
        <div className="text-center text-2xl font-extrabold ">
            Create an account
            
        </div>
        <div className="text-slate-400 font-light text-center">
        {type==="signin"?"Don't have an account":"Already have an account"}
            <Link to={type==="signin"?"/signup":"/signin"} className="underline pl-2">
            {type==="signin"?"Signup":"Signin"}
            </Link>
        </div>
        <div>
        {type==="signup"?<LabelledInput label="Name" placeholder="Ravindra.." OnChange={(e)=>{
            setPostInputs(c=>({
                ...c,
                name:e.target.value
            }))
        }}/>:null}
         <LabelledInput label="Email" placeholder="abc@gmail.com" OnChange={(e)=>{
            setPostInputs(c=>({
                ...c,
                email:e.target.value
            }))
        }}/>
         <LabelledInput label="Password" type={"password"} placeholder="Password" OnChange={(e)=>{
            setPostInputs(c=>({
                ...c,
                password:e.target.value
            }))
        }}/>
        <button type="button" onClick={sendRequest} className="text-white bg-gray-800 hover:bg-gray-900 w-full mt-8
        focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm 
        px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signup"?"Signup":"Signin"}</button>
        </div>
       
        </div>
        </div>
       
        
    </div>
}
interface LabelledInputType{
    label:string;
    placeholder:string;
    OnChange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string;
}
function LabelledInput({label,placeholder,OnChange,type}:LabelledInputType){
    return <div>
    <label  className="block mb-2 text-sm f text-gray-900 font-semibold">{label}</label>
    <input onChange={OnChange} type={type|| "text"}  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-80 p-2.5" placeholder={placeholder} required />
</div>

}