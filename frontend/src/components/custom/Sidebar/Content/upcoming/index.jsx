import OpenSidebar from "@/components/custom/Dashboard/openSidebar";
import AddTodo from "@/components/shared/addTodo";
import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import CustomDatePicker from "@/lib/datePicker";
import useAppStore from "@/store";
import Datepicker from "@/test/datepicker";

import moment from "moment";
import { useEffect, useRef, useState } from "react";

const Upcoming = () => {
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const currentDay = new Date().getDate();

  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const {isActiveTodoSidebar } = useAppStore();

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

  const handleSetDate = (selectedDate) => {
    setDates(selectedDate);
  };

  return (
    <div className={`bg-white h-screen w-screen  relative  ${
      isActiveTodoSidebar && "md:w-[calc(100vw-288px)]"
    }`}>
      <div className="flex flex-col h-full">
        {/* top nav bar - start */}
        <section className="h-14 px-3 mr-2 gap-1 grid grid-cols-12 bg-white">
          <div className="col-span-4 grid">
            <OpenSidebar />
          </div>
          <div className="col-span-4 "></div>
          <div className="col-span-4 "></div>
        </section>
        {/* top nav bar - end */}

        {/* head section start */}
        <section className="flex flex-col flex-grow  ">
          
        <div className=" flex justify-center items-center mx-auto h-full w-[90%] md:w-[70%]  bg-white">
          <div className="m-[6px_55px_9px_55px] w-full flex flex-col gap-2">
            <div className="m-[4px_4px_4px_5px] p-1 text-2xl font-bold w-full">Upcoming</div>
            <div className="m-[4px_4px_4px_5px] p-1 text-2xl font-bold w-full flex justify-between items-center">
              <div className="flex flex-col">
              <CustomDatePicker name={`${moment().format('LL')}` } dateReturn={handleSetDate}/>
              </div>

              <div className="text-sm font-light">
                  Today
              </div>
            </div>
          </div>
          
        </div>
        </section>
        {/* head section end */}

       
        
        {/* main dashboard - start */}
        <section
          onScroll={handleScroll}
          ref={containerRef}
          className="flex-grow bg-white px-8 pb-2 "
          // style={{ height: 'calc(100vh-120px)' }} // Adjust height based on your layout
        >
          <div className="w-[90%] md:w-[70%] mx-auto h-[calc(100vh-220px)]">
          <Datepicker/>
          </div>
          {loading && <div className="loading">Loading...</div>}
        </section>
        {/* main dashboard - end */}
      </div>
    </div>
  );
};

export default Upcoming;
