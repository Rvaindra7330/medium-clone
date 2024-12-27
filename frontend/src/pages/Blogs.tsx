import { Appbar } from "../components/Appbar"
import { BlogCard } from "../components/BlogCard"
export const Blogs=()=>{
    return <div>
        <Appbar></Appbar>
        <div className="flex justify-center">
        
        <div className="flex justify-center flex-col mx-w-xl divide-y">
       <BlogCard authorName="Ravindra" title="How an Ugly Single Page Websites Makes $5000 a Month"
        content="How an Ugly Single Page Websites Makes $5000 a Month"
       publishedDate="05 Oct 2024"></BlogCard>
        <BlogCard authorName="Ravindra" title="How an Ugly Single Page Websites Makes $5000 a Month"
        content="How an Ugly Single Page Websites Makes $5000 a Month"
       publishedDate="05 Oct 2024"></BlogCard>
    </div>
    </div>
    </div>
}