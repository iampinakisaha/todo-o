import OpenSidebar from "@/components/custom/Dashboard/openSidebar";
import { Outlet } from "react-router-dom";

const Search = () => {

  console.log("in search")
  return (
    <div className="bg-white h-full w-full relative overflow-hidden">
    <div className="flex flex-col h-full">
      {/* top nav bar - start */}
      <section className="h-14 px-3 mr-2 gap-1 grid grid-cols-12 bg-white">
        {/* sub section 1- start */}
        <div className="col-span-4 grid">
          <OpenSidebar />
        </div>
        {/* sub section 1- end */}

        {/* sub section 2- start */}
        <div className="col-span-4 bg-slate-200">
         
        </div>
        {/* sub section 2- end */}

        {/* sub section 3- start */}
        <div className="col-span-4 bg-slate-200">
         
        </div>
        {/* sub section 3- end */}
      </section>
      {/* top nav bar - end */}

      {/* head section start */}
      <section className="h-16 my-1 mx-10 pr-1 bg-slate-200">
      
      </section>
      {/* head section end */}

      {/* main dashboard- start */}
      <section className="flex-grow bg-white px-8 pb-2 ">
        search
      </section>
      {/* main dashboard- end */}
    </div>
  </div>
  )
}

export default Search