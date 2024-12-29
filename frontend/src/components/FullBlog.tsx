import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog=({blog}:{blog:Blog})=>{
    return <div>
        <Appbar></Appbar>
        <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 pt-10 w-full max-w-screen-xl">
        <div className="col-span-8">
            <div className="text-3xl font-extrabold">
                {blog.title}
            </div>
            <div className="text-slate-500 pt-2">
                posted on 29 december
            </div>
            <div className="pt-4">
                {blog.content}
            </div>
        </div>
        <div className="col-span-4 text pt-2 px-2">
            <div className="text-slate-500 text-lg">
                Author
            </div>
            <div className="w-full flex">
            <div className="pr-4 flex flex-col justify-center">
            <Avatar name={blog.author.name || "Anonymous"} size={"big"} ></Avatar>
            </div>
            <div>
            <div className="text-xl font-bold">
            
            {blog.author.name || "Anonymous"}
            
            </div>
            <div className="pt-2 text-slate-500">
                Description about author
            </div>
            </div>
            </div>
            
            
           
           
        </div>

    </div>
    </div>
       
    </div>
}