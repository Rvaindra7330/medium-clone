import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"
export const Appbar=()=>{
    return <div className="border-b flex justify-between px-10 py-4">
        <div className="flex flex-col justify-center cursor-pointer">
            <Link to={"/blogs"}>
            Medium
            </Link>
            
        </div>
        <div>
            <Avatar size={"big"} name="Ravindra"></Avatar>
        </div>

    </div>
}