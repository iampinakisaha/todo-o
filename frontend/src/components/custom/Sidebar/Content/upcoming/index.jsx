import OpenSidebar from "@/components/custom/Dashboard/openSidebar";
import AddTodo from "@/components/shared/addTodo";
import { Checkbox } from "@/components/ui/checkbox";
import moment from "moment";
import { useEffect, useRef, useState } from "react";

const Upcoming = () => {
  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Initial load of dates
    loadMoreDates();
  }, []);

  const loadMoreDates = () => {
    if (loading) return;
    setLoading(true);

    const currentEndDate = dates.length ? moment(dates[dates.length - 1]).add(1, 'day') : moment();
    const newDates = [];
    const endDate = moment().add(2, 'years');

    for (let i = 0; i < 30; i++) {
      const newDate = currentEndDate.clone().add(i, 'days').format('YYYY-MM-DD');
      if (moment(newDate).isAfter(endDate)) break;
      newDates.push(newDate);
    }

    setDates((prevDates) => [...prevDates, ...newDates]);
    setLoading(false);
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = containerRef.current;

    // Trigger loading when near the bottom of the container
    if (scrollHeight - scrollTop <= clientHeight * 1.5) {
      loadMoreDates();
    }
  };

  return (
    <div className="bg-white h-full w-full relative overflow-hidden">
      <div className="flex flex-col h-full">
        {/* top nav bar - start */}
        <section className="h-14 px-3 mr-2 gap-1 grid grid-cols-12 bg-white">
          <div className="col-span-4 grid">
            <OpenSidebar />
          </div>
          <div className="col-span-4 bg-slate-200"></div>
          <div className="col-span-4 bg-slate-200"></div>
        </section>
        {/* top nav bar - end */}

        {/* head section start */}
        <section className="mt-[6px] mr-[55px] mb-[9px] flex flex-col bg-slate-200">
          
        <div className=" flex justify-center h-4 bg-white">
          {/* <div className="h-[45px] mt-1 mr-1 mb-1 ml-[5px] p-1 flex justify-center">

          </div> */}
        </div>
        </section>
        {/* head section end */}

        
        {/* main dashboard - start */}
        <section
          onScroll={handleScroll}
          ref={containerRef}
          className="flex-grow bg-white px-8 pb-2 overflow-y-scroll scroolbar-none"
          style={{ height: 'calc(100vh - 120px)' }} // Adjust height based on your layout
        >
          {dates.map((date, index) => (
            <div key={index} className="w-full pt-7 flex flex-col">
              <div className="w-full h-[31px] pt-[6px] pr-[30px] pb-[5px]">
                <h1 className="h-full w-full flex justify-start items-center">
                  {moment(date).format('YYYY-MM-DD')}
                </h1>
              </div>
              <hr className="my-0.5" />
              <div className="w-full flex my-2">
                <div className="w-6 flex justify-center items-start">
                  <div className="w-full mt-[8px] mr-[6px] mb-0 ml-[3px]">
                    <Checkbox className="h-[18px] w-[18px] rounded-full flex justify-center items-start" />
                  </div>
                </div>
                <div className="w-full mr-[30px] py-2 flex flex-col">
                  <div className="w-full text-sm pt-[1px] flex flex-wrap">
                    {"new task"}
                  </div>
                  <div className="w-full text-sm pt-[1px] flex flex-wrap">
                    {"time schedule date"}
                  </div>
                </div>
              </div>
              <div className="w-full pr-[20px] pl-[1px]">
                <div className="w-full pb-2">
                  <AddTodo />
                </div>
              </div>
            </div>
          ))}
          {loading && <div className="loading">Loading...</div>}
        </section>
        {/* main dashboard - end */}
      </div>
    </div>
  );
};

export default Upcoming;
