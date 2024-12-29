import { Circle } from "./BlogCard"

export const BlogSkeleton = () => {
    return <div role="status" className=" animate-pulse">
        <div className="p-4 border-b border-slate-200 pb-4 w-screen max-w-screen-md cursor-pointer">
            <div className="flex">
                <div className="h-4 w-4 bg-gray-200 rounded-full  mb-4"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                <div className="flex justify-center flex-col pl-2 ">
                    <Circle />
                </div>
                <div className="font-thin text-sm pl-2 flex justify-center flex-col text-slate-500">
                    <div className="h-2 bg-gray-200 rounded-full  max-w-[330px] mb-2.5"></div>
                </div>
            </div>

            <div className="text-xl font-semibold pt-2">
                <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
            </div>
            <div className="text-md font-thin pt-1">
                <div className="h-2 bg-gray-200 rounded-full  max-w-[300px] mb-2.5"></div>
            </div>
            <div className="text-slate-400 font-thin pt-2">
                <div className="h-2 bg-gray-200 rounded-full  max-w-[360px]"></div>
            </div>
        </div>

        <span className="sr-only">Loading...</span>
    </div>
}