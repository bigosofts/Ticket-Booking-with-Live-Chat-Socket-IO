"use client";
import "./Price.css";
import SinglePrice from './SinglePrice';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialData } from "@/app/redux/features/instructorFilter/instructorFilterSlice";
import { isAdmin } from "@/apiservices/checklogin";


function Price(props) {
    const [admin, setAdmin] = useState();
    const dispatch = useDispatch();
    const filteredPackageData = useSelector((state) => state.instructorFilter.value);

    function clickHandler(value) {
        if(value == "Upto $1000"){
            let modified = filteredPackageData.filter((item) => item.price < 1000);

            dispatch(setInitialData(modified));
        }else if(value == "$1000-$5000"){
            let modified = filteredPackageData.filter((item) => item.price > 999 && item.price < 5001 );

            dispatch(setInitialData(modified));
        }else if(value == "Above $5000"){
            let modified = filteredPackageData.filter((item) => item.price > 5000);

            dispatch(setInitialData(modified));
        }

      }


      useEffect(() => {
        
    
        async function fetchData() {
          try {
            const payload = await isAdmin();
            setAdmin(payload);
          } catch (error) {
            console.error("Error in fetchData:", error);
          }
        }
    
        fetchData();
      }, []);
    return (
        <div>
            <h2 className='sidebar-title price-title'>Price</h2>

           <SinglePrice click={clickHandler} text={"Upto $1000"} group={"price"}/>
           <SinglePrice click={clickHandler} text={"$1000-$5000"} group={"price"}/>
           <SinglePrice click={clickHandler} text={"Above $5000"} group={"price"}/>

        </div>
    );
}

export default Price;