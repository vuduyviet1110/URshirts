import Reviews from "./Review";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa6";
function CustomeInfo() {
    return ( 
        <section className="py-10 border-t">
        <div className="main-container">
          <div className="flex flex-col justify-between items-center">
            <h1 className="text-xl uppercase border-b border-gray-900 text-gray-900">
              Let&apos;s create your own shirt!!!
            </h1>
            <Reviews />
          </div>
          <div className='flex justify-center items-center mt-4'>
                    <Button className='my-4 transition ease-in-out delay-50 px-1 text-slate-200 hover:translate-x-4 hover:scale-110 py-1  hover:text-zinc-400 duration-200 '>
                        <Link href="/custome" className="flex items-center"> 
                        <span className="mr-2">Create Now </span>
                            <FaArrowRight />
                        </Link>
                    </Button>
            </div>
        </div>
      </section>
     );
}

export default CustomeInfo;