import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
export const Appbar=()=>{
    return <div className="border-b flex justify-between px-10 py-2">
        <div className="flex flex-col justify-center cursor-pointer">
            <Link to={"/blogs"}>
            <div className="text-2xl font-bold">
                Medium
            </div>
            </Link>
            
        </div>
        <div>
            <Link to={"/publish"}>
            <button type="button" className="text-white mr-4 bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4
         focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2
          mb-2">New</button>
            </Link>
        

            <Avatar size={"big"} name="Ravindra"></Avatar>
        </div>

    </div>
}