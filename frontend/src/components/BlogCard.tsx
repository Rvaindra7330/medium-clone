interface BlogCardprops{
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
}
export  const BlogCard=({authorName,title,content,publishedDate}:BlogCardprops)=>{
    return <div>
        <div className="flex pt-1">
        <div className="flex justify-center flex-col">
           <Avatar name={authorName}></Avatar>
            
        </div>
        <div className="font-extrlight  pl-2 flex justify-center flex-col ">
            {authorName}
        </div>
        <div className="flex justify-center flex-col pl-2">
        <Circle/>
        </div>
        <div className="font-thin text-sm pl-2 flex justify-center flex-col text-slate-500">
        {publishedDate}
        </div>
        </div>
        
        <div className="text-xl font-semibold pt-2">
            {title}
        </div>
        <div className="text-md font-thin pt-1">
            {content.slice(0,100)+"..."}
        </div>
        <div className="text-slate-400 font-thin pt-2">
            {`${Math.ceil(content.length/100) } minute(s) read`}
        </div>
    </div>
}
function Circle(){
    return <div className="h-1 w-1 rounded-full bg-slate-500">

    </div>
}
 export function Avatar({ name,size="small"}:{ name:string,size:"small"| "big"}){
    return <div className={`relative inline-flex items-center justify-center ${size==="small"?"w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={`${size=="small"?"text-xs":"text-md"} font-extrlight text-gray-600 dark:text-gray-300 `}>{name[0].toUpperCase()}</span>
</div>
}