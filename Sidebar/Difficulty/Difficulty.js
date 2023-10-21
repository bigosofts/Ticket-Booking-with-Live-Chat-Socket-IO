"use client";
import SingleDifficulty from './SingleDifficulty';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialData } from "@/app/redux/features/instructorFilter/instructorFilterSlice";
import { isAdmin } from "@/apiservices/checklogin";


function Difficulty({filler}) {
    const [admin, setAdmin] = useState();
    const dispatch = useDispatch();
    const filteredPackageData = useSelector((state) => state.instructorFilter.value);

    function clickHandler(value) {
      let modified = filteredPackageData.filter((item) => item.difficulty == value);

      dispatch(setInitialData(modified));
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
    function uniqueArray(old){
        const modifiedArray = old.map(item=> item.difficulty)
        const uniqueNamesSet = new Set(modifiedArray);
        const uniqueNamesArray = Array.from(uniqueNamesSet);
        return uniqueNamesArray;
    }
    return (
        <div>
            <h2 className='sidebar-title price-title'>Difficulty</h2>

            {uniqueArray(filler).slice(0, 4).map((item) => (
            <SingleDifficulty click={clickHandler} text={item} group={"difficulty"} />
            ))}
        </div>
    );
}

export default Difficulty;